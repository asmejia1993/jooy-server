import request from "supertest";
import app from "../src/app";
import { Trip } from "../src/components/trips/model";
// import { post } from "./postResponse";
import { tripRequest } from "./tripRequest";

describe('POST new trips', () => {
    it('Should have key description and trip when created', (done) => {
        request(app).post('/api/trips/v1')
                    .send(tripRequest)
                    .set('Accept', 'application/json')
                    .then(res => {
                        expect(res.statusCode).toEqual(200);
                        expect(res.body).toHaveProperty("description");
                        expect(res.body).toHaveProperty("trip")
                    });
                    done();
    })

})
