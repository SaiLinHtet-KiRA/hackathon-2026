import mongoose from "mongoose";
import IncidentModel from "./Incident.model";

export interface IncidentsType<Incident = mongoose.Schema.Types.ObjectId> {
  size: number;
  incidents: Incident[];
}

export type IncidentsDocument<T = mongoose.Schema.Types.ObjectId> =
  mongoose.HydratedDocument<IncidentsType<T>>;

const IncidentsSchema = new mongoose.Schema<
  IncidentsType<mongoose.Schema.Types.ObjectId>
>(
  {
    size: { type: Number, default: 0 },
    incidents: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },
  },
  { timestamps: true, versionKey: false },
);
IncidentsSchema.pre("findOneAndUpdate", async function () {
  try {
    const update = this.getUpdate() as any;

    if (update.$push && update.$push.incidents) {
      let increment = 1;

      if (update.$push.incidents.$each) {
        increment = update.$push.incidents.$each.length;
      }
      update.$inc = {
        ...(update.$inc || {}),
        size: increment,
      };
      if (update.$pull && update.$pull.incidents) {
        let decrement = -1;
        if (update.$pull.incidents.$in) {
          decrement = -update.$pull.incidents.$in.length;
        }

        update.$inc = {
          ...(update.$inc || {}),
          size: (update.$inc?.size || 0) + decrement,
        };
      }

      this.setUpdate(update);
    }
  } catch (error) {
    throw error;
  }
});
const IncidentsModel = mongoose.connection
  .useDb("Incidents")
  .model("IncidentList", IncidentsSchema);

export default IncidentsModel;
