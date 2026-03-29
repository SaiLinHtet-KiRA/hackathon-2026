import { UpdateQuery } from "mongoose";
import SearchQuery from "../Types/Query";
import {
  DispatchUnitDocument,
  DispatchUnitType,
} from "../model/DispatchUnit.model";

export default interface UnitServiceType {
  createUnit(data: DispatchUnitType): Promise<DispatchUnitDocument>;
  getUnits(
    query: SearchQuery<DispatchUnitType>,
  ): Promise<DispatchUnitDocument[]>;
  getUnit(id: string): Promise<DispatchUnitDocument>;
  updateUnit(
    id: string,
    query: UpdateQuery<DispatchUnitType>,
  ): Promise<DispatchUnitDocument>;
  deleteUnit(id: string): Promise<DispatchUnitDocument>;
}
