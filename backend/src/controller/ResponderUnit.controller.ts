import { Request, Response } from "express";
import SearchQuery from "../Types/Query";
import ResponderUnitControllerType from "./ResponderUnit.controller.type";
import { ResponderUnitType } from "../model/ResponderUnit.model";
import ResponderUnitService from "../service/ResponderUnit.service";

class ResponderUnitController implements ResponderUnitControllerType {
  async createResponderUnit(
    req: Request<null, null, ResponderUnitType, null>,
    res: Response,
  ): Promise<void> {
    try {
      console.log(req.body);
      const unit = await ResponderUnitService.createResponderUnit(req.body);
      res.status(200).json(unit);
    } catch (error) {
      throw error;
    }
  }
  async getResponderUnits(
    req: Request<null, null, null, SearchQuery<ResponderUnitType>>,
    res: Response,
  ): Promise<void> {
    try {
      const query = req.query;
      const units = await ResponderUnitService.getResponderUnits(query);

      res.status(200).json(units);
    } catch (error) {
      throw error;
    }
  }
  async getResponderUnit(
    req: Request<{ id: string }, null, null, null>,
    res: Response,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const Unit = await ResponderUnitService.getResponderUnit(id);
      res.status(200).json(Unit);
    } catch (error) {
      throw error;
    }
  }
  async updateResponderUnit(
    req: Request<{ id: string }, null, ResponderUnitType, null>,
    res: Response,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const body = req.body;
      console.log(id, body);
      const Unit = await ResponderUnitService.updateResponderUnit(id, body);

      res.status(200).json(Unit);
    } catch (error) {
      throw error;
    }
  }
  async deleteResponderUnit(
    req: Request<{ id: string }, null, null, null>,
    res: Response,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const Unit = await ResponderUnitService.deleteResponderUnit(id);
      res.status(200).json(Unit);
    } catch (error) {
      throw error;
    }
  }
}

export default new ResponderUnitController();
