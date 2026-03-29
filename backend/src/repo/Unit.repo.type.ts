import { UpdateQuery } from "mongoose";
import SearchQuery from "../Types/Query";
import {
  DispatchUnitDocument,
  DispatchUnitType,
} from "../model/DispatchUnit.model";

export default interface UnitRepoType {
  create(data: DispatchUnitType): Promise<DispatchUnitDocument>;
  get(id: string): Promise<DispatchUnitDocument>;
  getMany(
    query: SearchQuery<DispatchUnitType>,
  ): Promise<DispatchUnitDocument[]>;
  update(
    id: string,
    query: UpdateQuery<DispatchUnitType>,
  ): Promise<DispatchUnitDocument>;
  delete(id: string): Promise<DispatchUnitDocument>;
}
