import CCTVServiceType from "./CCTV.service.type";
import { CCTVType, CCTVDocument } from "../model/CCTV.model";
import CCTVRepo from "../repo/CCTV.repo";
import SearchQuery from "../Types/Query";

class CCTVService implements CCTVServiceType {
  async createCCTV(data: CCTVType): Promise<CCTVDocument> {
    try {
      return await CCTVRepo.create(data);
    } catch (error) {
      throw error;
    }
  }
  async getCCTVs(query: SearchQuery<CCTVType>): Promise<CCTVDocument[]> {
    try {
      return await CCTVRepo.getMany(query);
    } catch (error) {
      throw error;
    }
  }
  async getCCTV(id: string): Promise<CCTVDocument> {
    try {
      return await CCTVRepo.get(id);
    } catch (error) {
      throw error;
    }
  }
  async updateCCTV(id: string, query: CCTVType): Promise<CCTVDocument> {
    try {
      return await CCTVRepo.update(id, query);
    } catch (error) {
      throw error;
    }
  }
  async deleteCCTV(id: string): Promise<CCTVDocument> {
    try {
      return await CCTVRepo.delete(id);
    } catch (error) {
      throw error;
    }
  }
}

export default new CCTVService();
