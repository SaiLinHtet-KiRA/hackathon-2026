import { Request, Response } from "express";
import SearchQuery from "../Types/Query";
import { ReportsType } from "../model/Reports.model";
import { ReportType } from "../model/Report.model";

export default interface ReportsControllerType {
  getReports(
    req: Request<{ id: string }, null, null, SearchQuery<ReportType>>,
    res: Response,
  ): Promise<void>;
  updateReports(
    req: Request<{ id: string }, null, ReportsType, null>,
    res: Response,
  ): Promise<void>;
  deleteReports(
    req: Request<{ id: string }, null, null, null>,
    res: Response,
  ): Promise<void>;
}
