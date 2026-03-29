import { Request, Response } from "express";
import SearchQuery from "../Types/Query";
import { ReportType } from "../model/Report.model";

export default interface ReportControllerType {
  createReport(
    req: Request<null, null, ReportType, null>,
    res: Response,
  ): Promise<void>;
  getReports(
    req: Request<null, null, null, SearchQuery<ReportType>>,
    res: Response,
  ): Promise<void>;
  getReport(
    req: Request<{ id: string }, null, null, null>,
    res: Response,
  ): Promise<void>;
  updateReport(
    req: Request<{ id: string }, null, ReportType, null>,
    res: Response,
  ): Promise<void>;
  deleteReport(
    req: Request<{ id: string }, null, null, null>,
    res: Response,
  ): Promise<void>;
}
