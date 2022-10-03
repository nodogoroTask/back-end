import { ILocation, ILocationInputDTO } from "../ILocation";

export interface ILocationRepository {
  get(
    filters: {},
    sorting: {},
    skip: number,
    limit: number
  ): Promise<Array<ILocation>>;
  
  getOne(activityId: string): Promise<ILocation | null>;
  create(item: ILocationInputDTO): Promise<ILocation>;
  delete(activitiesIds: string[]): Promise<boolean>;
  update(
    item: ILocationInputDTO,
     activityId: string
  ): Promise<ILocation | null>;
  
}
