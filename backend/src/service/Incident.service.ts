import { UpdateQuery } from "mongoose";
import { IncidentType, IncidentDocument } from "../model/Incident.model";
import IncidentRepo from "../repo/Incident.repo";
import SearchQuery from "../Types/Query";
import IncidentServiceType from "./Incident.service.type";

class IncidentService implements IncidentServiceType {
  async createIncident(data: IncidentType): Promise<IncidentDocument> {
    try {
      return await IncidentRepo.create(data);
    } catch (error) {
      throw error;
    }
  }
  async getIncidents(
    query: SearchQuery<IncidentType>,
  ): Promise<IncidentDocument[]> {
    try {
      return await IncidentRepo.getMany(query);
    } catch (error) {
      throw error;
    }
  }
  async getIncident(id: string): Promise<IncidentDocument> {
    try {
      return await IncidentRepo.get(id);
    } catch (error) {
      throw error;
    }
  }
  async updateIncident(
    id: string,
    data: UpdateQuery<IncidentType>,
  ): Promise<IncidentDocument> {
    try {
      return await IncidentRepo.update(id, data);
    } catch (error) {
      throw error;
    }
  }
  async deleteIncident(id: string): Promise<IncidentDocument> {
    try {
      return await IncidentRepo.delete(id);
    } catch (error) {
      throw error;
    }
  }
}

export default new IncidentService();
