import { UpdateQuery } from "mongoose";
import { NotFoundError } from "../util/error/errors";
import ReportRepoType from "./Report.repo.type";
import ReportModel, { ReportDocument, ReportType } from "../model/Report.model";
import SearchQuery from "../Types/Query";
import IncidentModel from "../model/Incident.model";

class ReportRepo implements ReportRepoType {
  async create(data: ReportType): Promise<ReportDocument> {
    try {
      const newAccident = new ReportModel(data);
      return await newAccident.save();
    } catch (error) {
      throw error;
    }
  }
  async get(id: string): Promise<ReportDocument> {
    try {
      const report = await ReportModel.findById(id).populate({
        path: "incidentMatch",
        model: IncidentModel,
      });
      if (!report) throw new NotFoundError(`${id} was not found report`);
      return report;
    } catch (error) {
      throw error;
    }
  }
  async getMany({
    start,
    limit,
    value,
    field,
    sort,
  }: SearchQuery<ReportType>): Promise<ReportDocument[]> {
    try {
      return await ReportModel.find(field ? { [field]: value } : {})
        .skip(start)
        .limit(limit)
        .populate({
          path: "incidentMatch",
          model: IncidentModel,
        })
        .sort({ [sort ? sort : "createdAt"]: 1 });
    } catch (error) {
      throw error;
    }
  }
  async update(
    id: string,
    query: UpdateQuery<ReportType>,
  ): Promise<ReportDocument> {
    try {
      const report = await ReportModel.findByIdAndUpdate(id, query, {
        new: true,
      });
      if (!report) throw new NotFoundError(`${id} was not found report`);
      return report;
    } catch (error) {
      throw error;
    }
  }
  async delete(id: string): Promise<ReportDocument> {
    try {
      const report = await ReportModel.findByIdAndDelete(id);
      if (!report) throw new NotFoundError(`${id} was not found report`);
      return report;
    } catch (error) {
      throw error;
    }
  }
}

export default new ReportRepo();
