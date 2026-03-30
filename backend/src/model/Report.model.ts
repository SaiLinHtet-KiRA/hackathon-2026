import mongoose, { HydratedDocument } from "mongoose";
import IncidentModel from "./Incident.model";
import SeqModel from "./Seq.model";
import IncidentService from "../service/Incident.service";
import ReportsService from "../service/Reports.service";

export interface ReportType<Incident = mongoose.Types.ObjectId> {
  id: string;
  phone: string;
  language: string;
  languageCode: string;
  original: string;
  translation: string;
  severity: string;
  incidentMatch: Incident;
  time: string;
}

export type ReportDocument<Incident = mongoose.Types.ObjectId> =
  HydratedDocument<ReportType<Incident>>;

const ReportSchema = new mongoose.Schema<ReportType>(
  {
    id: { type: String },
    phone: { type: String },
    language: { type: String },
    languageCode: { type: String },
    original: { type: String },
    translation: { type: String },
    severity: { type: String },
    incidentMatch: { type: mongoose.Types.ObjectId },
    time: { type: String },
  },
  { timestamps: true, versionKey: false },
);
ReportSchema.pre("save", async function () {
  try {
    if (this.isNew) {
      const newID = await SeqModel.findByIdAndUpdate(
        { _id: "RreportId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true },
      );

      if (!newID) throw Error("Some things wrong on getting new order id");

      const { linkedWitnesses } = await IncidentService.getIncident(
        this.incidentMatch.toString(),
      );

      await ReportsService.updateReports(linkedWitnesses._id.toString(), {
        $push: { reports: this._id },
      });

      this.id = `WIT-${newID.seq}`;
    } else {
    }
  } catch (error) {
    throw error;
  }
});
const ReportModel = mongoose.connection
  .useDb("Reports")
  .model("Report", ReportSchema);

export default ReportModel;
