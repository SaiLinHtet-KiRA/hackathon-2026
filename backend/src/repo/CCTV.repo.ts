import { UpdateQuery } from "mongoose";
import { NotFoundError } from "../util/error/errors";
import CCTVModel, { CCTVType, CCTVDocument } from "../model/CCTV.model";
import CCTVRepoType from "./CCTV.repo.type";
import SearchQuery from "../Types/Query";

class CCTVRepo implements CCTVRepoType {
  async create(data: CCTVType): Promise<CCTVDocument> {
    try {
      const newCCTV = new CCTVModel(data);
      return await newCCTV.save();
    } catch (error) {
      throw error;
    }
  }
  async get(id: string): Promise<CCTVDocument> {
    try {
      const CCTV = await CCTVModel.findById(id);
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
  }: SearchQuery<CCTVType>): Promise<CCTVDocument[]> {
    try {
      return await CCTVModel.find(
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
        .sort({ [sort ? sort : "createdAt"]: 1 });
    } catch (error) {
      throw error;
    }
  }
  async update(
    id: string,
    query: UpdateQuery<CCTVType>,
  ): Promise<CCTVDocument> {
    try {
      const CCTV = await CCTVModel.findByIdAndUpdate(id, query, { new: true });
      if (!CCTV) throw new NotFoundError(`${id} was not found CCTV`);
      return CCTV;
    } catch (error) {
      throw error;
    }
  }
  async delete(id: string): Promise<CCTVDocument> {
    try {
      const CCTV = await CCTVModel.findByIdAndDelete(id);
      if (!CCTV) throw new NotFoundError(`${id} was not found CCTV`);
      return CCTV;
    } catch (error) {
      throw error;
    }
  }
}

export default new CCTVRepo();
