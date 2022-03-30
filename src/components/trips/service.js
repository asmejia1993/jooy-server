import { ValidationError } from "../../shared/error/validationError";
import { Trip, Reading } from "./model";
import NodeGeoCoder from "node-geocoder";
import { httpStatusCode } from "../../shared/error/httpStatusCode";
import QueryParamsTrip from "./request";
import mapboxgl from "mapbox-gl";
import { buildPagination } from "../../shared/functions/builPagination";
import { config } from "dotenv";

config();

const options = {
    provider: "opencage",
    apiKey: process.env.API_KEY_OPENCAGE, // for Mapquest, OpenCage, Google Premier
};

mapboxgl.accessToken = process.env.API_KEY_MAPBOX;

/**
 * Save a new Trip
 *
 * @param {@link Reading} @link Reading
 * @returns Trip
 */
export const saveTrip = async (readings) => {
    //Filter before to save a Trip
    if (readings.length < 5)
        throw new ValidationError(
            "Given attributes are invalid for requested action",
            httpStatusCode.BAD_REQUEST,
            0,
            "Invalid range the readings",
            "Longitud menor a 5"
        );
    readings.filter((r) => {
        if (!r.time || r.time === null) {
            throw new ValidationError(
                "Given attributes are invalid for requested action",
                httpStatusCode.BAD_REQUEST,
                0,
                "Invalid time attribute",
                "Atributo time viene vacio"
            );
        }
    });

    //Prepare data to save a new Trip
    const readingMinTime = readings.sort((a, b) => a.time - b.time)[0];
    const readingMaxTime = readings.sort((a, b) => b.time - a.time)[0];
    const geocoder = NodeGeoCoder(options);
    const addressFromMinReading = await geocoder.reverse({
        lat: readingMinTime.location.lat,
        lon: readingMinTime.location.lon,
    });
    const addressFromMaxReading = await geocoder.reverse({
        lat: readingMaxTime.location.lat,
        lon: readingMaxTime.location.lon,
    });
    const start = {
        time: readingMinTime.time,
        lat: readingMinTime.location.lat,
        lon: readingMinTime.location.lon,
        address: `${addressFromMinReading[0].streetName} ${addressFromMinReading[0].streetNumber}`,
    };
    const end = {
        time: readingMaxTime.time,
        lat: readingMaxTime.location.lat,
        lon: readingMaxTime.location.lon,
        address: `${addressFromMaxReading[0].streetName} ${addressFromMaxReading[0].streetNumber}`,
    };
    const limitMin = new mapboxgl.LngLat(start.lon, start.lat);
    const limitMax = new mapboxgl.LngLat(end.lon, end.lat);
    const bounding = new mapboxgl.LngLatBounds(limitMin, limitMax);
    let boundingBox = [];
    boundingBox.push({
        lat: bounding.getNorthEast().lat,
        lon: bounding.getNorthEast().lng,
    });
    boundingBox.push({
        lat: bounding.getNorthWest().lat,
        lon: bounding.getNorthWest().lng,
    });
    boundingBox.push({
        lat: bounding.getSouthEast().lat,
        lon: bounding.getSouthEast().lng,
    });
    boundingBox.push({
        lat: bounding.getSouthWest().lat,
        lon: bounding.getSouthWest().lng,
    });

    //Save a new Trip
    const trip = new Trip({
        start,
        end,
        distance: (limitMin.distanceTo(limitMax) / 1000).toFixed(2),
        duration: 3600, //After check out How to calcule it
        overspeedsCount: 1,
        boundingBox,
    });
    const tripCreated = await trip.save();

    //Save the readings by trip
    const readingsByTrip = readings.map((item) => {
        return {
            trip_id: tripCreated._id.toString(),
            ...item,
        };
    });

    await Reading.insertMany(readingsByTrip);
    return tripCreated;
};

/**
 *
 * @param {*} params
 */
export const findAllTrips = async (params) => {
    try {
        const filters = new QueryParamsTrip()
            .setStartGte(+params.start_gte)
            .setStartLte(+params.start_lte)
            .setdistanceGte(+params.distance_gte)
            .setLimit(+params.limit)
            .setOffset(+params.offset)
            .build();

        //TO DO: Apply every single filter and getting the data
        const { offset } = await buildPagination(filters.limit, filters.offset);
        const trips = await Trip.find().skip(offset).limit(filters.limit);
        const size = await Trip.find().count() ;
        return {
            totalPages: Math.ceil(size / filters.limit),
            pageNumber: filters.offset !== 0 ? filters.offset : 1,
            pageSize: size,
            trips,
        };
    } catch (error) {
        console.error(error);
    }
};
