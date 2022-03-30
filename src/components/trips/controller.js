import { findAllTrips, saveTrip } from "./service";

export const createTrip = async(req, res) => {
    try {
        const { readings } = req.body;
        const data = await saveTrip(readings);
        res.status(200).send({
            description: 'Success',
            trip: data
        });  
    } catch (error) {
        res.status(400).send({
           error
        });
    }
};

export const retrieveTrips = async(req, res) => {
    try {
        const { pageNumber, pageSize, totalPages, trips} = await findAllTrips(req.query);
        res.status(200).send({
            description: 'Success',
            totalPages,
            pageNumber,
            pageSize,
            trips
        });
    } catch (error) {
        console.error(error);
        res.status(400).send({
           error
        });
    }
};