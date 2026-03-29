import { Request, Response } from "express";
import { CCTVType } from "../model/CCTV.model";
import SearchQuery from "../Types/Query";

export default interface CCTVControllerType {
  createCCTV(
    req: Request<null, null, CCTVType, null>,
    res: Response,
  ): Promise<void>;
  getCCTVs(
    req: Request<null, null, null, SearchQuery<CCTVType>>,
    res: Response,
  ): Promise<void>;
  getCCTV(
    req: Request<{ id: string }, null, null, null>,
    res: Response,
  ): Promise<void>;
  updateCCTV(
    req: Request<{ id: string }, null, CCTVType, null>,
    res: Response,
  ): Promise<void>;
  deleteCCTV(
    req: Request<{ id: string }, null, null, null>,
    res: Response,
  ): Promise<void>;
}
