import mongoose from "mongoose";
import IncidentModel from "./Incident.model";
import SeqModel from "./Seq.model";
import ResponderUnitModel from "./ResponderUnit.model";

export interface DispatchUnitType<ResponderUnit = mongoose.Types.ObjectId> {
  id: string;
  type: "Ambulance" | "Police" | "Fire & Rescue";
  status: "Available" | "En Route" | "On Scene";
  ResponderUnit: ResponderUnit;
  note: string;
  dispatch: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type DispatchUnitDocument<T = mongoose.Types.ObjectId> =
  mongoose.HydratedDocument<DispatchUnitType<T>>;

const DispatchUnitSchema = new mongoose.Schema<DispatchUnitType>(
  {
    id: { type: String },
    type: { type: String, enum: ["Ambulance", "Police", "Fire & Rescue"] },
    status: {
      type: String,
      enum: ["Available", "En Route", "On Scene"],
      default: "Available",
    },
    dispatch: { type: Boolean, default: false },
    note: { type: String },
    ResponderUnit: { type: mongoose.Types.ObjectId, ref: ResponderUnitModel },
  },
  { timestamps: true, versionKey: false },
);

DispatchUnitSchema.pre("save", async function () {
  try {
    if (this.isNew) {
      const newID = await SeqModel.findByIdAndUpdate(
        { _id: this.type },
        { $inc: { seq: 1 } },
        { new: true, upsert: true },
      );
      const type =
        this.type == "Police" ? "PD" : this.type == "Ambulance" ? "EMS" : "FD";
      this.id = `${type}-${newID.seq}`;
    }
  } catch (error) {
    throw error;
  }
});

const DispatchUnitModel = mongoose.connection
  .useDb("ResponderUnit")
  .model("DispatchUnit", DispatchUnitSchema);

export default DispatchUnitModel;
