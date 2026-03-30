import { Request, Response } from "express";
import SearchQuery from "../Types/Query";
import ReportControllerType from "./Report.controller.type";
import { ReportType } from "../model/Report.model";
import ReportService from "../service/Report.service";

class ReportController implements ReportControllerType {
  async createReport(
    req: Request<null, null, ReportType, null>,
    res: Response,
  ): Promise<void> {
    try {
      const Report = await ReportService.createReport(req.body);
      res.status(200).json(Report);
    } catch (error) {
      throw error;
    }
  }
  async getReport(
    req: Request<{ id: string }, null, null, null>,
    res: Response,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const Report = await ReportService.getReport(id);

      res.status(200).json(Report);
    } catch (error) {
      throw error;
    }
  }
  async getReports(
    req: Request<null, null, null, SearchQuery<ReportType>>,
    res: Response,
  ): Promise<void> {
    try {
      const query = req.query;
      const Reports = await ReportService.getReports(query);

      res.status(200).json(Reports);
    } catch (error) {
      throw error;
    }
  }
  async updateReport(
    req: Request<{ id: string }, null, ReportType, null>,
    res: Response,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const body = req.body;
      const Report = await ReportService.updateReport(id, body);
      res.status(200).json(Report);
    } catch (error) {
      throw error;
    }
  }
  async deleteReport(
    req: Request<{ id: string }, null, null, null>,
    res: Response,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const Report = await ReportService.deleteReport(id);
      res.status(200).json(Report);
    } catch (error) {
      throw error;
    }
  }
}

export default new ReportController();
