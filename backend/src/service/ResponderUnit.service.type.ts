import { UpdateQuery } from "mongoose";
import SearchQuery from "../Types/Query";
import {
  ResponderUnitDocument,
  ResponderUnitType,
} from "../model/ResponderUnit.model";

export default interface ResponderUnitServiceType {
  createResponderUnit(data: ResponderUnitType): Promise<ResponderUnitDocument>;
  getResponderUnits(
    query: SearchQuery<ResponderUnitType>,
  ): Promise<ResponderUnitDocument[]>;
  getResponderUnit(id: string): Promise<ResponderUnitDocument>;
  updateResponderUnit(
    id: string,
    query: UpdateQuery<ResponderUnitType>,
  ): Promise<ResponderUnitDocument>;
  deleteResponderUnit(id: string): Promise<ResponderUnitDocument>;
}
