import { UpdateQuery } from "mongoose";
import { NotFoundError } from "../util/error/errors";
import SearchQuery from "../Types/Query";
import UnitRepoType from "./Unit.repo.type";
import DispatchUnitModel, {
  DispatchUnitDocument,
  DispatchUnitType,
} from "../model/DispatchUnit.model";

class UnitRepo implements UnitRepoType {
  async create(data: DispatchUnitType): Promise<DispatchUnitDocument> {
    try {
      const newUnit = new DispatchUnitModel(data);
      return await newUnit.save();
    } catch (error) {
      throw error;
    }
  }
  async get(id: string): Promise<DispatchUnitDocument> {
    try {
      const CCTV = await DispatchUnitModel.findById(id);
      if (!CCTV) throw new NotFoundError(`${id} was not found CCTV`);
      return CCTV;
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
  }: SearchQuery<DispatchUnitType>): Promise<DispatchUnitDocument[]> {
    try {
      return await DispatchUnitModel.find(
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
        .populate({
          path: "ResponderUnit",
          populate: {
            path: "Incident",
          },
        });
    } catch (error) {
      throw error;
    }
  }
  async update(
    id: string,
    query: UpdateQuery<DispatchUnitType>,
  ): Promise<DispatchUnitDocument> {
    try {
      const CCTV = await DispatchUnitModel.findByIdAndUpdate(id, query, {
        new: true,
      });
      if (!CCTV) throw new NotFoundError(`${id} was not found CCTV`);
      return CCTV;
    } catch (error) {
      throw error;
    }
  }
  async delete(id: string): Promise<DispatchUnitDocument> {
    try {
      const CCTV = await DispatchUnitModel.findByIdAndDelete(id);
      if (!CCTV) throw new NotFoundError(`${id} was not found CCTV`);
      return CCTV;
    } catch (error) {
      throw error;
    }
  }
}

export default new UnitRepo();
