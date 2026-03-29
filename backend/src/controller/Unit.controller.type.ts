import { Request, Response } from "express";
import SearchQuery from "../Types/Query";
import { DispatchUnitType } from "../model/DispatchUnit.model";

export default interface UnitControllerType {
  createUnit(
    req: Request<null, null, DispatchUnitType, null>,
    res: Response,
  ): Promise<void>;
  getUnits(
    req: Request<null, null, null, SearchQuery<DispatchUnitType>>,
    res: Response,
  ): Promise<void>;
  getUnit(
    req: Request<{ id: string }, null, null, null>,
    res: Response,
  ): Promise<void>;
  updateUnit(
    req: Request<{ id: string }, null, DispatchUnitType, null>,
    res: Response,
  ): Promise<void>;
  deleteUnit(
    req: Request<{ id: string }, null, null, null>,
    res: Response,
  ): Promise<void>;
}
