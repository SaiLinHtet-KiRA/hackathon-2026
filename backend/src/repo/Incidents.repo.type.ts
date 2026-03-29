import { UpdateQuery } from "mongoose";
import { IncidentDocument } from "../model/Incident.model";
import SearchQuery from "../Types/Query";
import { IncidentsDocument, IncidentsType } from "../model/Incidents.model";

export default interface IncidentsRepoType {
  create(data: Partial<IncidentsType>): Promise<IncidentsDocument>;
  get(
    id: string,
    query: SearchQuery<IncidentDocument>,
  ): Promise<IncidentsDocument>;
  update(
    id: string,
    query: UpdateQuery<IncidentsType>,
  ): Promise<IncidentsDocument>;
  delete(id: string): Promise<IncidentsDocument>;
}
