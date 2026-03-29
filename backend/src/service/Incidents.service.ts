import { UpdateQuery } from "mongoose";
import { IncidentType, IncidentDocument } from "../model/Incident.model";
import { IncidentsDocument, IncidentsType } from "../model/Incidents.model";
import IncidentsRepo from "../repo/Incidents.repo";
import SearchQuery from "../Types/Query";
import IncidentsServiceType from "./Incidents.service.type";

class IncidentService implements IncidentsServiceType {
  async createIncidents(
    data: Partial<IncidentsType>,
  ): Promise<IncidentsDocument> {
    try {
      return await IncidentsRepo.create(data);
    } catch (error) {
      throw error;
    }
  }
  async getIncidents(
    id: string,
    query: SearchQuery<IncidentType>,
  ): Promise<IncidentsDocument> {
    try {
      return await IncidentsRepo.get(id, query);
    } catch (error) {
      throw error;
    }
  }

  async updateIncidents(
    id: string,
    data: UpdateQuery<IncidentsType>,
  ): Promise<IncidentsDocument> {
    try {
      return await IncidentsRepo.update(id, data);
    } catch (error) {
      throw error;
    }
  }
  async deleteIncidents(id: string): Promise<IncidentsDocument> {
    try {
      return await IncidentsRepo.delete(id);
    } catch (error) {
      throw error;
    }
  }
}

export default new IncidentService();
