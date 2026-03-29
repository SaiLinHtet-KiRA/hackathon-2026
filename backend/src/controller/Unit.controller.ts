import { Request, Response } from "express";
import SearchQuery from "../Types/Query";
import { DispatchUnitType } from "../model/DispatchUnit.model";
import UnitControllerType from "./Unit.controller.type";
import UnitService from "../service/Unit.service";

class UnitController implements UnitControllerType {
  async createUnit(
    req: Request<null, null, DispatchUnitType, null>,
    res: Response,
  ): Promise<void> {
    try {
      const unit = await UnitService.createUnit(req.body);
      res.status(200).json(unit);
    } catch (error) {
      throw error;
    }
  }
  async getUnits(
    req: Request<null, null, null, SearchQuery<DispatchUnitType>>,
    res: Response,
  ): Promise<void> {
    try {
      const query = req.query;
      const units = await UnitService.getUnits(query);

      res.status(200).json(units);
    } catch (error) {
      throw error;
    }
  }
  async getUnit(
    req: Request<{ id: string }, null, null, null>,
    res: Response,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const Unit = await UnitService.getUnit(id);
      res.status(200).json(Unit);
    } catch (error) {
      throw error;
    }
  }
  async updateUnit(
    req: Request<{ id: string }, null, DispatchUnitType, null>,
    res: Response,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const body = req.body;

      const Unit = await UnitService.updateUnit(id, body);

      res.status(200).json(Unit);
    } catch (error) {
      throw error;
    }
  }
  async deleteUnit(
    req: Request<{ id: string }, null, null, null>,
    res: Response,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const Unit = await UnitService.deleteUnit(id);
      res.status(200).json(Unit);
    } catch (error) {
      throw error;
    }
  }
}

export default new UnitController();
