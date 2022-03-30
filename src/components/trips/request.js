export default class QueryParamsTrip {
    constructor() {
        this.start_gte = 0;
        this.start_lte = 0;
        this.distance_gte = 0.05;
        this.limit = 20;
        this.offset = 0;
    }

    setStartGte(value) {
        if (value) {
            this.start_gte = value;
        }   
        return this;
    }
    setStartLte(value) {
        if (value) {
            this.start_lte = value;
        }
        return this;
    }
    setdistanceGte(value) {
        if (value) {
            this.distance_gte = value;
        }
        return this;
    }
    setLimit(value) {
        if (value) {
            this.limit = value;
        }
        return this;
    }
    setOffset(value) {
        if (value) {
            this.offset = value;
        }
        return this;
    }
    build() {
        return {
          startGte: this.start_gte,
          startLte: this.start_lte,
          distanceGte: this.distance_gte,
          limit: this.limit,
          offset: this.offset,
        };
      }
}