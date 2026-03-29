import { UpdateQuery } from "mongoose";
import { NotFoundError } from "../util/error/errors";
import SearchQuery from "../Types/Query";
import ResponderUnitRepoType from "./ResponderUnit.repo.type";
import ResponderUnitModel, {
  ResponderUnitType,
  ResponderUnitDocument,
} from "../model/ResponderUnit.model";

class ResponderUnitRepo implements ResponderUnitRepoType {
  async create(data: ResponderUnitType): Promise<ResponderUnitDocument> {
    try {
      const newResponderUnit = new ResponderUnitModel(data);
      return await newResponderUnit.save();
    } catch (error) {
      throw error;
    }
  }
  async get(id: string): Promise<ResponderUnitDocument> {
    try {
      const responderUnit = await ResponderUnitModel.findById(id);
      if (!responderUnit)
        throw new NotFoundError(`${id} was not found responderUnit`);
      return responderUnit;
    } catch (error) {
      throw error;
    }
  }
  async getMany({
    start,
    limit,
    field,
    value,
    sort,
    search,
  }: SearchQuery<ResponderUnitType>): Promise<ResponderUnitDocument[]> {
    try {
      return await ResponderUnitModel.find(
        field && search
          ? {
              [field]: { $regex: value, $options: "i" },
              id: { $regex: search, $options: "i" },
            }
          : field
            ? { [field]: { $regex: value, $options: "i" } }
            : search
              ? { id: { $regex: search, $options: "i" } }
              : {},
      )
        .skip(start)
        .limit(limit)
        .sort({ [sort ? sort : "createdAt"]: 1 })
        .populate(["DispatchUnit", "Incident"]);
    } catch (error) {
      throw error;
    }
  }
  async update(
    id: string,
    query: UpdateQuery<ResponderUnitType>,
  ): Promise<ResponderUnitDocument> {
    try {
      const responderUnit = await ResponderUnitModel.findByIdAndUpdate(
        id,
        query,
        {
          upsert: true,
          new: true,
        },
      );
      if (!responderUnit)
        throw new NotFoundError(`${id} was not found responderUnit`);
      return responderUnit;
    } catch (error) {
      throw error;
    }
  }
  async delete(id: string): Promise<ResponderUnitDocument> {
    try {
      const responderUnit = await ResponderUnitModel.findByIdAndDelete(id);
      if (!responderUnit)
        throw new NotFoundError(`${id} was not found responderUnit`);
      return responderUnit;
    } catch (error) {
      throw error;
    }
  }
}

export default new ResponderUnitRepo();
