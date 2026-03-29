import { UpdateQuery } from "mongoose";
import SearchQuery from "../Types/Query";
import {
  ResponderUnitType,
  ResponderUnitDocument,
} from "../model/ResponderUnit.model";

export default interface ResponderUnitRepoType {
  create(data: ResponderUnitType): Promise<ResponderUnitDocument>;
  get(id: string): Promise<ResponderUnitDocument>;
  getMany(
    query: SearchQuery<ResponderUnitType>,
  ): Promise<ResponderUnitDocument[]>;
  update(
    id: string,
    query: UpdateQuery<ResponderUnitType>,
  ): Promise<ResponderUnitDocument>;
  delete(id: string): Promise<ResponderUnitDocument>;
}
