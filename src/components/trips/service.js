import { ValidationError } from "../../shared/error/validationError";
import { Trip, Reading } from "./model";
import NodeGeoCoder from "node-geocoder";
import { calculeDistance } from "../../shared/functions/calculeDistance";
import { httpStatusCode } from "../../shared/error/httpStatusCode";
import QueryParamsTrip from "./request";

const options = {
    provider: "opencage",
    apiKey: "db0720a89fec40669cb5cc4891dc37f7", // for Mapquest, OpenCage, Google Premier
};

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

    //Save a new Trip
    const trip = new Trip({
        start,
        end,
        distance: (
            await calculeDistance(start.lat, start.lon, end.lat, end.lon)
        ).toFixed(2),
        duration: 3600, //After check out How to calcule it
        overspeedsCount: 1,
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
    return trip;
};


/**
 * 
 * @param {*} params 
 */
export const findAllTrips = async(params) => {
    const filters = new QueryParamsTrip()
                        .setStartGte(params.start_gte)
                        .setStartLte(params.start_lte)
                        .setdistanceGte(params.distance_gte)
                        .setLimit(params.limit)
                        .setOffset(params.offset)
                        .build();

    //TO DO: Apply every single filter and getting the data 
    
};


