import { UpdateQuery } from "mongoose";
import { ReportType } from "../model/Report.model";
import { ReportsType, ReportsDocument } from "../model/Reports.model";
import ReportsRepo from "../repo/Reports.repo";
import SearchQuery from "../Types/Query";
import ReportServiceType from "./Reports.service.type";

class ReportService implements ReportServiceType {
  async createReports(data: Partial<ReportsType>): Promise<ReportsDocument> {
    try {
      return await ReportsRepo.create(data);
    } catch (error) {
      throw error;
    }
  }

  async getReports(
    id: string,
    query: SearchQuery<ReportType>,
  ): Promise<ReportsDocument> {
    try {
      return await ReportsRepo.get(id, query);
    } catch (error) {
      throw error;
    }
  }

  async updateReports(
    id: string,
    query: UpdateQuery<ReportsType>,
  ): Promise<ReportsDocument> {
    try {
      return await ReportsRepo.update(id, query);
    } catch (error) {
      throw error;
    }
  }
  async deleteReports(id: string): Promise<ReportsDocument> {
    try {
      return await ReportsRepo.delete(id);
    } catch (error) {
      throw error;
    }
  }
}

export default new ReportService();
