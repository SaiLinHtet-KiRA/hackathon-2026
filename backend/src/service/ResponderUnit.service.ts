import SearchQuery from "../Types/Query";
import {
  ResponderUnitDocument,
  ResponderUnitType,
} from "../model/ResponderUnit.model";
import ResponderUnitRepo from "../repo/ResponderUnit.repo";
import ResponderUnitServiceType from "./ResponderUnit.service.type";

class ResponderUnitService implements ResponderUnitServiceType {
  async createResponderUnit(
    data: ResponderUnitType,
  ): Promise<ResponderUnitDocument> {
    try {
      return await ResponderUnitRepo.create(data);
    } catch (error) {
      throw error;
    }
  }
  async getResponderUnits(
    query: SearchQuery<ResponderUnitType>,
  ): Promise<ResponderUnitDocument[]> {
    try {
      return await ResponderUnitRepo.getMany(query);
    } catch (error) {
      throw error;
    }
  }
  async getResponderUnit(id: string): Promise<ResponderUnitDocument> {
    try {
      return await ResponderUnitRepo.get(id);
    } catch (error) {
      throw error;
    }
  }
  async updateResponderUnit(
    id: string,
    query: ResponderUnitType,
  ): Promise<ResponderUnitDocument> {
    try {
      return await ResponderUnitRepo.update(id, query);
    } catch (error) {
      throw error;
    }
  }
  async deleteResponderUnit(id: string): Promise<ResponderUnitDocument> {
    try {
      return await ResponderUnitRepo.delete(id);
    } catch (error) {
      throw error;
    }
  }
}

export default new ResponderUnitService();
