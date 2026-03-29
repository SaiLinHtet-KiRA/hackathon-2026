import { UpdateQuery } from "mongoose";
import { ReportsDocument, ReportsType } from "../model/Reports.model";
import { ReportType } from "../model/Report.model";
import SearchQuery from "../Types/Query";

export default interface ReportsRepoType {
  create(data: Partial<ReportsType>): Promise<ReportsDocument>;
  get(id: string, query: SearchQuery<ReportType>): Promise<ReportsDocument>;
  update(id: string, query: UpdateQuery<ReportsType>): Promise<ReportsDocument>;
  delete(id: string): Promise<ReportsDocument>;
}
