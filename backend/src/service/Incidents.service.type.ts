import { IncidentType } from "../model/Incident.model";
import SearchQuery from "../Types/Query";
import { IncidentsDocument, IncidentsType } from "../model/Incidents.model";
import { UpdateQuery } from "mongoose";

export default interface IncidentsServiceType {
  createIncidents(data: Partial<IncidentsType>): Promise<IncidentsDocument>;
  getIncidents(
    id: string,
    query: SearchQuery<IncidentType>,
  ): Promise<IncidentsDocument>;

  updateIncidents(
    id: string,
    data: UpdateQuery<IncidentsType>,
  ): Promise<IncidentsDocument>;
  deleteIncidents(id: string): Promise<IncidentsDocument>;
}
