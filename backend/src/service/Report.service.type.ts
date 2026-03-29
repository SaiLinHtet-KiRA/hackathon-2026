import { UpdateQuery } from "mongoose";
import SearchQuery from "../Types/Query";
import { ReportDocument, ReportType } from "../model/Report.model";

export default interface ReportServiceType {
  createReport(data: ReportType): Promise<ReportDocument>;
  getReport(id: string): Promise<ReportDocument>;
  getReports(query: SearchQuery<ReportType>): Promise<ReportDocument[]>;
  updateReport(
    id: string,
    data: UpdateQuery<ReportDocument>,
  ): Promise<ReportDocument>;
  deleteReport(id: string): Promise<ReportDocument>;
}
