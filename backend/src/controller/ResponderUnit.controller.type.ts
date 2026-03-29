import { Request, Response } from "express";
import SearchQuery from "../Types/Query";
import { ResponderUnitType } from "../model/ResponderUnit.model";

export default interface ResponderUnitControllerType {
  createResponderUnit(
    req: Request<null, null, ResponderUnitType, null>,
    res: Response,
  ): Promise<void>;
  getResponderUnits(
    req: Request<null, null, null, SearchQuery<ResponderUnitType>>,
    res: Response,
  ): Promise<void>;
  getResponderUnit(
    req: Request<{ id: string }, null, null, null>,
    res: Response,
  ): Promise<void>;
  updateResponderUnit(
    req: Request<{ id: string }, null, ResponderUnitType, null>,
    res: Response,
  ): Promise<void>;
  deleteResponderUnit(
    req: Request<{ id: string }, null, null, null>,
    res: Response,
  ): Promise<void>;
}
