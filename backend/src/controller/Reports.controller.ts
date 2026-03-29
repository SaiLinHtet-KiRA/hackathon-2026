import { Request, Response } from "express";
import SearchQuery from "../Types/Query";
import ReportsControllerType from "./Reports.controller.type";
import ReportsService from "../service/Reports.service";
import { ReportsType } from "../model/Reports.model";
import { ReportType } from "../model/Report.model";

class ReportsController implements ReportsControllerType {
  async getReports(
    req: Request<{ id: string }, null, null, SearchQuery<ReportType>>,
    res: Response,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const query = req.query;
      const Reports = await ReportsService.getReports(id, query);

      res.status(200).json(Reports);
    } catch (error) {
      throw error;
    }
  }

  async updateReports(
    req: Request<{ id: string }, null, ReportsType, null>,
    res: Response,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const body = req.body;

      const cctv = await ReportsService.updateReports(id, body);
      res.status(200).json(cctv);
    } catch (error) {
      throw error;
    }
  }
  async deleteReports(
    req: Request<{ id: string }, null, null, null>,
    res: Response,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const cctv = await ReportsService.deleteReports(id);
      res.status(200).json(cctv);
    } catch (error) {
      throw error;
    }
  }
}

export default new ReportsController();
