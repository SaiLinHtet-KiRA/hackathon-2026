import { UpdateQuery } from "mongoose";
import { IncidentDocument, IncidentType } from "../model/Incident.model";
import SearchQuery from "../Types/Query";

export default interface IncidentServiceType {
  createIncident(data: IncidentType): Promise<IncidentDocument>;
  getIncident(id: string): Promise<IncidentDocument>;
  getIncidents(query: SearchQuery<IncidentType>): Promise<IncidentDocument[]>;
  updateIncident(
    id: string,
    data: UpdateQuery<IncidentDocument>,
  ): Promise<IncidentDocument>;
  deleteIncident(id: string): Promise<IncidentDocument>;
}
