import mongoose from "mongoose";
import SeqModel from "./Seq.model";
import ReportsModel from "./Reports.model";
import ReportsService from "../service/Reports.service";
import CCTVService from "../service/CCTV.service";
import IncidentsService from "../service/Incidents.service";
import CCTVModel from "./CCTV.model";

export interface IncidentType<Camera = mongoose.Types.ObjectId> {
  id: string;
  video: string;
  timestamp: string;
  cameraId: Camera;
  location: string;
  vehicleType: string;
  aiConfidence: number;
  severity: "High" | "Medium" | "Low" | "Critical";
  status:
    | "Dispatched"
    | "Under Review"
    | "Auto-Detected"
    | "SMS Confirmed"
    | "False Alarm"
    | "Resolved";

  modelPrecision: number;
  reliabilityScore: number;
  aiReasoning: string;
  linkedWitnesses: mongoose.Types.ObjectId;
  ResponderUnit: mongoose.Types.ObjectId;
  condition: string;
  lat: number;
  lng: number;
  coordinates: { x: number; y: number };
  note: string;
}

export type IncidentDocument<T = mongoose.Types.ObjectId> =
  mongoose.HydratedDocument<IncidentType<T>>;

const IncidentSchema = new mongoose.Schema<IncidentType>(
  {
    id: { type: String, unique: true, index: true },
    timestamp: { type: String },
    video: { type: String, default: "" },
    cameraId: { type: mongoose.Types.ObjectId, ref: CCTVModel },
    location: { type: String },
    vehicleType: { type: String },
    aiConfidence: { type: Number },
    severity: { type: String, enum: ["High", "Medium", "Low", "Critical"] },
    status: {
      type: String,
      enum: [
        "Dispatched",
        "Under Review",
        "Auto-Detected",
        "SMS Confirmed",
        "False Alarm",
        "Resolved",
      ],
    },
    modelPrecision: { type: Number },
    reliabilityScore: { type: Number },
    aiReasoning: { type: String },
    linkedWitnesses: { type: mongoose.Types.ObjectId, ref: ReportsModel },
    ResponderUnit: { type: mongoose.Types.ObjectId, ref: ReportsModel },
    condition: { type: String },
    lat: { type: Number },
    lng: { type: Number },
    coordinates: { x: { type: Number }, y: { type: Number } },
    note: { type: String },
  },
  { timestamps: true, versionKey: false },
);

IncidentSchema.pre("save", async function () {
  try {
    if (this.isNew) {
      const newID = await SeqModel.findByIdAndUpdate(
        { _id: "IncidentId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true },
      );

      if (!newID) throw Error("Some things wrong on getting new order id");
      const { incidents } = await CCTVService.getCCTV(
        this.cameraId as any as string,
      );
      await IncidentsService.updateIncidents(incidents as any as string, {
        $push: { incidents: this._id },
      });

      this.id = `INC-${new Date().getFullYear()}-${newID.seq}`;
      this.linkedWitnesses = (await ReportsService.createReports({}))._id;
    } else {
    }
  } catch (error) {
    throw error;
  }
});

const IncidentModel = mongoose.connection
  .useDb("Incidents")
  .model("Incident", IncidentSchema);

export default IncidentModel;
