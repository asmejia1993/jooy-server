import { Schema, model } from "mongoose";

const readingSchema = Schema(
  {    
    trip_id: { type: Schema.Types.ObjectId, ref: "Trip" },
    time: Number,
    speed: Number,
    speedLimit: Number,
    location: {
      description: String,
      lat: Number,
      lon: Number,
    },
  },
  {
    versionKey: false,
  }
  );
  
  const boundingSchema = Schema(
    {
      lat: Number,
      lon: Number
    },
    {
      _id: false,
      versionKey: false,
    }
  );

const tripSchema = Schema(
  {
    start: {
      time: Number,
      description: String,
      lat: Number,
      lon: Number,
      address: String,
    },
    end: {
      time: Number,
      description: String,
      lat: Number,
      lon: Number,
      address: String,
    },
    distance: Number,
    duration: Number,
    overspeedsCount: Number,
    boundingBox: [boundingSchema],
  },
  {
    versionKey: false,
  }
);

export const Reading = model('Reading', readingSchema);
export const Trip = model('Trip', tripSchema);


