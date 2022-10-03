import Container, { Inject, Service } from "typedi";
import { Logger } from "winston";
import { ILocation, ILocationInputDTO } from "../interfaces/ILocation";
import { ILocationRepository } from "../interfaces/repositories/ILocationRepository";
import { LocationRepository } from "../repositories";
import NotFound from "./errors/NotFoundError";
import { parseFilters } from "./utils/filters";

@Service("location.service")
export default class LocationService {
  constructor(
    @Inject("logger") private logger: Logger,
    @Inject("location.repository")
    private locationRepository: ILocationRepository,
  ) {
    this.logger = Container.get("logger");
    this.locationRepository = Container.get<LocationRepository>(
      "location.repository"
    );
  }


  public async create(
    location: ILocationInputDTO,
  ): Promise<ILocation> {
    try {
      const newLocation = await this.locationRepository.create(location);
      return newLocation;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async getOne(
    locationId: string,
  ): Promise<ILocation | null> {
    const location = await this.locationRepository.getOne(locationId);
    return location;
  }
  public async getCustomized(
    filters = {},
    sorting = {},
    skip = 0,
    limit = 0,
  ): Promise<Array<ILocation>> {
    try {
      const customizedFilters = parseFilters(filters);
      return await this.locationRepository.get(
        customizedFilters,
        sorting,
        skip,
        limit
      );
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async multipleDelete(
    locations: string[],
   ): Promise<Boolean> {
    try {
      return await this.locationRepository.delete(locations);
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async update(
    location: ILocationInputDTO,
    locationId: string,
  ): Promise<ILocation> {
    try {

      const updatedLocation = await this.locationRepository.update(
        location,
        locationId
      );

      if (updatedLocation == null)
        throw new NotFound(`UpdatedLocation with "${locationId}" is not found`, [
          "locationId",
        ]);

      return updatedLocation;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

}
