import { ReportDocument, ReportType } from "../model/Report.model";
import ReportRepo from "../repo/Report.repo";
import SearchQuery from "../Types/Query";
import ReportServiceType from "./Report.service.type";

class ReportService implements ReportServiceType {
  async createReport(data: ReportType): Promise<ReportDocument> {
    try {
      return await ReportRepo.create(data);
    } catch (error) {
      throw error;
    }
  }
  async getReports(query: SearchQuery<ReportType>): Promise<ReportDocument[]> {
    try {
      return await ReportRepo.getMany(query);
    } catch (error) {
      throw error;
    }
  }
  async getReport(id: string): Promise<ReportDocument> {
    try {
      return await ReportRepo.get(id);
    } catch (error) {
      throw error;
    }
  }
  async updateReport(id: string, data: ReportType): Promise<ReportDocument> {
    try {
      return await ReportRepo.update(id, data);
    } catch (error) {
      throw error;
    }
  }
  async deleteReport(id: string): Promise<ReportDocument> {
    try {
      return await ReportRepo.delete(id);
    } catch (error) {
      throw error;
    }
  }
}

export default new ReportService();
