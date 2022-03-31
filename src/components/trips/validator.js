import { httpStatusCode } from "../../shared/error/httpStatusCode";
import { ValidationError } from "../../shared/error/validationError";

export const validateReadings = (readings) => {
    if (readings.length < 5)
        throw new ValidationError(
            "Given attributes are invalid for requested action",
            httpStatusCode.BAD_REQUEST,
            0,
            "Invalid range the readings",
            "Debe tener al menos 5 readings"
        );
    readings.filter((r) => {
        if (!r.time || r.time === null) {
            throw new ValidationError(
                "Given attributes are invalid for requested action",
                httpStatusCode.BAD_REQUEST,
                0,
                "Invalid time attribute",
                "Atributo time es invalido"
            );
        }
    });
}