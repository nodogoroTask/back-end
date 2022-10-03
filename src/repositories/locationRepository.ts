import { Document, Model, SchemaType } from "mongoose";
import { Service } from "typedi";
import { ILocation, ILocationInputDTO } from "../interfaces/ILocation";
import { ILocationRepository } from "../interfaces/repositories/ILocationRepository";
import { Location } from '../models';

@Service('location.repository')
export default class LocationRepository implements ILocationRepository {
  private readonly locationModel: Model<ILocation & Document>;
  constructor() {
    this.locationModel = Location;
  } 

  async get(
    filters = {},
    sorting = {},
    skip = 0,
    limit = 0
  ): Promise<Array<ILocation>> {
    return this.locationModel
      .find(filters)
      .sort(sorting)
      .skip(skip)
      .limit(limit);
  }

  async getOne(locationId: string): Promise<ILocation | null> {
    return this.locationModel.findById(locationId);
  }

  async create(item: ILocationInputDTO): Promise<ILocation> {
    let newLocation = await this.locationModel.create(item);
    let locationOTD = await this.getOne(newLocation._id);
    return locationOTD ? locationOTD : newLocation;
  }

  async delete(location: string[]): Promise<boolean> {
    const result = await this.locationModel.deleteMany({ _id: location });
    return result.ok === 1;
  }

  async update(
    updatedLocation: ILocationInputDTO,
    locationId: string
  ): Promise<ILocation | null> {
    return this.locationModel.findByIdAndUpdate(
      locationId,
      updatedLocation as any,
      {
        new: true,
      }
    );
  }

}
