import { UpdateQuery } from "mongoose";
import SearchQuery from "../Types/Query";
import { ReportType } from "../model/Report.model";
import { ReportsDocument, ReportsType } from "../model/Reports.model";

export default interface ReportServiceType {
  createReports(data: Partial<ReportsType>): Promise<ReportsDocument>;
  getReports(
    id: string,
    query: SearchQuery<ReportType>,
  ): Promise<ReportsDocument>;
  updateReports(
    id: string,
    query: UpdateQuery<ReportsType>,
  ): Promise<ReportsDocument>;
  deleteReports(id: string): Promise<ReportsDocument>;
}
