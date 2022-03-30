export class ValidationError {
    constructor(description, statusCode, errorCode, srcMessage, translatedMessage) {
        this.description =description;
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.srcMessage = srcMessage;
        this.translatedMessage = translatedMessage;
    }
}