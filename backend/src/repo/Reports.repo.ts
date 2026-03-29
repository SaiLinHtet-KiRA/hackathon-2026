import { UpdateQuery } from "mongoose";
import { NotFoundError } from "../util/error/errors";
import ReportsRepoType from "./Reports.repo.type";
import ReportsModel, {
  ReportsDocument,
  ReportsType,
} from "../model/Reports.model";
import SearchQuery from "../Types/Query";
import ReportModel, { ReportType } from "../model/Report.model";

class ReportRepo implements ReportsRepoType {
  async create(data: Partial<ReportsType>): Promise<ReportsDocument> {
    try {
      const newreports = new ReportsModel(data);
      return await newreports.save();
    } catch (error) {
      throw error;
    }
  }
  async get(
    id: string,
    { start, limit }: SearchQuery<ReportType>,
  ): Promise<ReportsDocument> {
    try {
      const reports = await ReportsModel.findById(id).populate({
        path: "reports",
        model: ReportModel,
        options: { start, limit },
      });
      if (!reports) throw new NotFoundError(`${id} was not found reports`);
      return reports;
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: string,
    query: UpdateQuery<ReportsType>,
  ): Promise<ReportsDocument> {
    try {
      const reports = await ReportsModel.findByIdAndUpdate(id, query);
      if (!reports) throw new NotFoundError(`${id} was not found reports`);
      return reports;
    } catch (error) {
      throw error;
    }
  }
  async delete(id: string): Promise<ReportsDocument> {
    try {
      const reports = await ReportsModel.findByIdAndDelete(id);
      if (!reports) throw new NotFoundError(`${id} was not found reports`);
      return reports;
    } catch (error) {
      throw error;
    }
  }
}

export default new ReportRepo();
