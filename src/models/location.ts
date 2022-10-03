import mongoose from "mongoose";
import { ILocation } from "../interfaces/ILocation";

const Location = new mongoose.Schema(
  { symptoms: String,
    coordinate: {
        lat: String,
        lng: String
    },
    temp: Number,
    user: String
  },
  { versionKey: false }
);

Location.index({ "$**": "text" });

export default mongoose.model<ILocation & mongoose.Document>(
  "Location",
  Location
);
