import { UpdateQuery } from "mongoose";
import { NotFoundError } from "../util/error/errors";
import IncidentModel, {
  IncidentType,
  IncidentDocument,
} from "../model/Incident.model";
import IncidentRepoType from "./Incident.repo.type";
import SearchQuery from "../Types/Query";
import ReportModel from "../model/Report.model";

class IncidentRepo implements IncidentRepoType {
  async create(data: IncidentType): Promise<IncidentDocument> {
    try {
      const newAccident = new IncidentModel(data);
      return await newAccident.save();
    } catch (error) {
      throw error;
    }
  }
  async get(id: string): Promise<IncidentDocument> {
    try {
      const accident = await IncidentModel.findById(id)
        .populate(["cameraId"])
        .populate({
          path: "linkedWitnesses",
          populate: {
            path: "reports",
            model: ReportModel,
          },
        });
      if (!accident) throw new NotFoundError(`${id} was not found accident`);
      return accident;
    } catch (error) {
      throw error;
    }
  }
  async getMany({
    start,
    limit,
    field,
    value,
    sort,
    search,
  }: SearchQuery<IncidentType>): Promise<IncidentDocument[]> {
    try {
      return await IncidentModel.find(
        field && search
          ? {
              [field]: { $regex: value, $options: "i" },
              id: { $regex: search, $options: "i" },
            }
          : field
            ? { [field]: { $regex: value, $options: "i" } }
            : search
              ? { id: { $regex: search, $options: "i" } }
              : {},
      )
        .skip(start)
        .limit(limit)
        .sort({ [sort ? sort : "createdAt"]: 1 })
        .populate({
          path: "linkedWitnesses",
          populate: {
            path: "reports",
            model: ReportModel,
          },
        });
    } catch (error) {
      throw error;
    }
  }
  async update(
    id: string,
    query: UpdateQuery<IncidentType>,
  ): Promise<IncidentDocument> {
    try {
      const accident = await IncidentModel.findByIdAndUpdate(id, query, {
        new: true,
      });
      if (!accident) throw new NotFoundError(`${id} was not found accident`);
      return accident;
    } catch (error) {
      throw error;
    }
  }
  async delete(id: string): Promise<IncidentDocument> {
    try {
      const accident = await IncidentModel.findByIdAndDelete(id);
      if (!accident) throw new NotFoundError(`${id} was not found accident`);
      return accident;
    } catch (error) {
      throw error;
    }
  }
}

export default new IncidentRepo();
