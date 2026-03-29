import { QueryFilter, UpdateQuery } from "mongoose";
import { CCTVType, CCTVDocument } from "../model/CCTV.model";
import SearchQuery from "../Types/Query";

export default interface CCTVRepoType {
  create(data: CCTVType): Promise<CCTVDocument>;
  get(id: string): Promise<CCTVDocument>;
  getMany(query: SearchQuery<CCTVType>): Promise<CCTVDocument[]>;
  update(id: string, query: UpdateQuery<CCTVType>): Promise<CCTVDocument>;
  delete(id: string): Promise<CCTVDocument>;
}
