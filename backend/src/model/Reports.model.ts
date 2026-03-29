import mongoose from "mongoose";

export interface ReportsType<Report = mongoose.Schema.Types.ObjectId> {
  size: number;
  reports: Report[];
}
export type ReportsDocument<Report = mongoose.Schema.Types.ObjectId> =
  mongoose.HydratedDocument<ReportsType<Report>>;

export const ReportsSchema = new mongoose.Schema<ReportsType>(
  {
    size: { type: Number, default: 0 },
    reports: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },
  },
  { timestamps: true, versionKey: false },
);
ReportsSchema.pre("findOneAndUpdate", async function () {
  try {
    const update = this.getUpdate() as any;

    if (update.$push && update.$push.reports) {
      let increment = 1;

      if (update.$push.reports.$each) {
        increment = update.$push.reports.$each.length;
      }
      update.$inc = {
        ...(update.$inc || {}),
        size: increment,
      };
      if (update.$pull && update.$pull.reports) {
        let decrement = -1;
        if (update.$pull.reports.$in) {
          decrement = -update.$pull.reports.$in.length;
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

const ReportsModel = mongoose.connection
  .useDb("Reports")
  .model("ReportList", ReportsSchema);

export default ReportsModel;
