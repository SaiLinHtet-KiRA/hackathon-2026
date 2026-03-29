import { UpdateQuery } from "mongoose";
import { IncidentDocument, IncidentType } from "../model/Incident.model";
import SearchQuery from "../Types/Query";

export default interface IncidentRepoType {
  create(data: IncidentType): Promise<IncidentDocument>;
  get(id: string): Promise<IncidentDocument>;
  getMany(query: SearchQuery<IncidentType>): Promise<IncidentDocument[]>;
  update(
    id: string,
    query: UpdateQuery<IncidentType>,
  ): Promise<IncidentDocument>;
  delete(id: string): Promise<IncidentDocument>;
}
