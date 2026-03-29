import mongoose from "mongoose";
import SeqModel from "./Seq.model";
import IncidentModel from "./Incident.model";
import UnitService from "../service/Unit.service";
import IncidentService from "../service/Incident.service";

export interface ResponderUnitType<DispatchUnit = mongoose.Types.ObjectId> {
  id: string;
  Priority: "Critical" | "High" | "Standard";
  DispatchUnit: [DispatchUnit];
  Incident: mongoose.Types.ObjectId;
  resolved: boolean;
  recalled: {
    state: boolean;
    reason:
      | "Incident resolved"
      | "False alarm"
      | "Unit reassigned"
      | "Unit damaged"
      | "Operator request";
  };

  createdAt: Date;
  updatedAt: Date;
  DispatchTime: Date;
  EstimatedArrival: Date;
  ActualArrival: Date;
  ResolutionTime: Date;
  TotalResponseTime: Date;
  ResolutionNotes: string;
}

export type ResponderUnitDocument<T = mongoose.Types.ObjectId> =
  mongoose.HydratedDocument<ResponderUnitType<T>>;

const ResponderUnitSchema = new mongoose.Schema<ResponderUnitType>(
  {
    id: { type: String },
    Priority: { type: String, enum: ["Critical", "High", "Standard"] },

    recalled: {
      state: { type: Boolean },
      reason: {
        type: String,
        enum: [
          "Incident resolved",
          "False alarm",
          "Unit reassigned",
          "Unit damaged",
          "Operator request",
        ],
      },
    },
    DispatchUnit: { type: [mongoose.Types.ObjectId] },
    Incident: { type: mongoose.Types.ObjectId, ref: IncidentModel },
    resolved: { type: Boolean },
    DispatchTime: { type: Date, default: new Date() },
    EstimatedArrival: {
      type: Date,
      default: new Date(
        new Date().getTime() +
          Math.floor(Math.random() * (1000000 - 100000 + 1)) +
          100000,
      ),
    },
    ActualArrival: {
      type: Date,
      default: new Date(
        new Date().getTime() +
          Math.floor(Math.random() * (1500000 - 1000000 + 1)) +
          1000000,
      ),
    },
    ResolutionTime: {
      type: Date,
      default: new Date(
        new Date().getTime() +
          Math.floor(Math.random() * (2000000 - 1500000 + 1)) +
          1500000,
      ),
    },
    TotalResponseTime: { type: Date },
    ResolutionNotes: { type: String },
  },
  { timestamps: true, versionKey: false },
);

ResponderUnitSchema.pre("save", async function () {
  try {
    if (this.isNew) {
      const newID = await SeqModel.findByIdAndUpdate(
        { _id: "ResponderUnit" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true },
      );
      this.DispatchUnit.map(
        async (id) =>
          await UnitService.updateUnit(id as any as string, {
            ResponderUnit: this._id,
            status: "En Route",
          }),
      );
      await IncidentService.updateIncident(this.Incident as any as string, {
        ResponderUnit: this._id,
      });
      this.id = `RSU-${newID.seq}`;
    }
  } catch (error) {
    throw error;
  }
});
ResponderUnitSchema.pre("findOneAndUpdate", async function () {
  try {
    const update = this.getUpdate() as any;

    // 1. Get values from update (if provided)
    const dispatchUnitFromUpdate =
      update.DispatchUnit || update.$set?.DispatchUnit;

    const incidentFromUpdate = update.Incident || update.$set?.Incident;

    // 2. Get current document from DB
    const doc = await this.model.findOne(this.getQuery());

    const dispatchUnit = dispatchUnitFromUpdate || doc?.DispatchUnit;

    const incident = incidentFromUpdate || doc?.Incident;

    dispatchUnit.map(
      async (id: string) =>
        await UnitService.updateUnit(id, {
          ResponderUnit: null,
          status: "Available",
        }),
    );
    await IncidentService.updateIncident(incident as any as string, {
      ResponderUnit: null,
    });
  } catch (error) {
    throw error;
  }
});
const ResponderUnitModel = mongoose.connection
  .useDb("ResponderUnit")
  .model("ResponderUnit", ResponderUnitSchema);

export default ResponderUnitModel;
