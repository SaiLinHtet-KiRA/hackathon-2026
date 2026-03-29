import { Request, Response } from "express";
import CCTVControllerType from "./CCTV.controller.type";
import CCTVService from "../service/CCTV.service";
import { CCTVDocument, CCTVType } from "../model/CCTV.model";
import SearchQuery from "../Types/Query";

class CCTVController implements CCTVControllerType {
  async createCCTV(
    req: Request<null, null, CCTVType, null>,
    res: Response,
  ): Promise<void> {
    try {
      const cctv = await CCTVService.createCCTV(req.body);
      res.status(200).json(cctv);
    } catch (error) {
      throw error;
    }
  }
  async getCCTVs(
    req: Request<null, null, null, SearchQuery<CCTVType>>,
    res: Response,
  ): Promise<void> {
    try {
      const query = req.query;
      const cctvs = await CCTVService.getCCTVs(query);

      res.status(200).json(cctvs);
    } catch (error) {
      throw error;
    }
  }
  async getCCTV(
    req: Request<{ id: string }, null, null, null>,
    res: Response,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const cctv = await CCTVService.getCCTV(id);
      res.status(200).json(cctv);
    } catch (error) {
      throw error;
    }
  }
  async updateCCTV(
    req: Request<{ id: string }, null, CCTVType, null>,
    res: Response,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const body = req.body;

      const cctv = await CCTVService.updateCCTV(id, body);

      res.status(200).json(cctv);
    } catch (error) {
      throw error;
    }
  }
  async deleteCCTV(
    req: Request<{ id: string }, null, null, null>,
    res: Response,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const cctv = await CCTVService.deleteCCTV(id);
      res.status(200).json(cctv);
    } catch (error) {
      throw error;
    }
  }
}

export default new CCTVController();
