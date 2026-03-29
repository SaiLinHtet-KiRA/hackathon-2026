import { UpdateQuery } from "mongoose";
import { CCTVDocument, CCTVType } from "../model/CCTV.model";
import SearchQuery from "../Types/Query";

export default interface CCTVServiceType {
  createCCTV(data: CCTVType): Promise<CCTVDocument>;
  getCCTVs(query: SearchQuery<CCTVType>): Promise<CCTVDocument[]>;
  getCCTV(id: string): Promise<CCTVDocument>;
  updateCCTV(id: string, query: CCTVType): Promise<CCTVDocument>;
  deleteCCTV(id: string): Promise<CCTVDocument>;
}
