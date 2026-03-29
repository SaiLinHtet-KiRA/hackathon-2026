import mongoose from "mongoose";
import IncidentsModel from "./Incidents.model";

export interface CCTVType<Incidents = mongoose.Types.ObjectId> {
  id: string;
  name: string;
  location: string;
  FPS: number;
  resolution: string;
  videoCodec: "H.264" | "H.265+" | "HVC133X" | "AV1";
  status: "Online" | "Offline" | "Maintenance";
  aiHealth: number;
  activityToday: number;
  rtsp: string;
  port: number;
  lat: number;
  lng: number;
  coordinates: { x: number; y: number };
  incidents: Incidents;
}

export type CCTVDocument<T = mongoose.Types.ObjectId> =
  mongoose.HydratedDocument<CCTVType<T>>;

const CCTVSchema = new mongoose.Schema<CCTVType>(
  {
    id: { type: String, unique: true, index: true },
    name: { type: String },
    location: { type: String },
    FPS: { type: Number },
    resolution: { type: String },
    videoCodec: { type: String, enun: ["H.264", "H.265+", "HVC133X", "AV1"] },
    status: { type: String, enum: ["Online", "Offline", "Maintenance"] },
    aiHealth: { type: Number },
    activityToday: { type: Number },
    rtsp: { type: String },
    port: { type: Number },
    lat: { type: Number },
    lng: { type: Number },
    coordinates: { x: { type: Number }, y: { type: Number } },
    incidents: { type: mongoose.Types.ObjectId, ref: IncidentsModel },
  },
  { timestamps: true, versionKey: false },
);

CCTVSchema.pre("save", async function () {
  try {
    if (this.isNew) {
      const newIncidents = new IncidentsModel({});
      this.incidents = (await newIncidents.save())._id;
    }
  } catch (error) {
    throw error;
  }
});

const CCTVModel = mongoose.connection.useDb("CCTVs").model("CCTVs", CCTVSchema);

export default CCTVModel;
