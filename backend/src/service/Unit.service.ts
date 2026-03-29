import SearchQuery from "../Types/Query";
import UnitServiceType from "./Unit.service.type";
import {
  DispatchUnitDocument,
  DispatchUnitType,
} from "../model/DispatchUnit.model";
import UnitRepo from "../repo/Unit.repo";
import { UpdateQuery } from "mongoose";

class UnitService implements UnitServiceType {
  async createUnit(data: DispatchUnitType): Promise<DispatchUnitDocument> {
    try {
      return await UnitRepo.create(data);
    } catch (error) {
      throw error;
    }
  }
  async getUnits(
    query: SearchQuery<DispatchUnitType>,
  ): Promise<DispatchUnitDocument[]> {
    try {
      return await UnitRepo.getMany(query);
    } catch (error) {
      throw error;
    }
  }
  async getUnit(id: string): Promise<DispatchUnitDocument> {
    try {
      return await UnitRepo.get(id);
    } catch (error) {
      throw error;
    }
  }
  async updateUnit(
    id: string,
    query: UpdateQuery<DispatchUnitType>,
  ): Promise<DispatchUnitDocument> {
    try {
      return await UnitRepo.update(id, query);
    } catch (error) {
      throw error;
    }
  }
  async deleteUnit(id: string): Promise<DispatchUnitDocument> {
    try {
      return await UnitRepo.delete(id);
    } catch (error) {
      throw error;
    }
  }
}

export default new UnitService();
