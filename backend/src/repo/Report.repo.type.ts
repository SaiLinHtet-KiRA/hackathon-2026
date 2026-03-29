import { UpdateQuery } from "mongoose";
import { ReportDocument, ReportType } from "../model/Report.model";
import SearchQuery from "../Types/Query";

export default interface ReportRepoType {
  create(data: ReportType): Promise<ReportDocument>;
  get(id: string): Promise<ReportDocument>;
  getMany(query: SearchQuery<ReportType>): Promise<ReportDocument[]>;
  update(id: string, query: UpdateQuery<ReportType>): Promise<ReportDocument>;
  delete(id: string): Promise<ReportDocument>;
}
