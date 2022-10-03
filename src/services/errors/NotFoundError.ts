import { ErrorNames, HttpStatusCode } from '.';
import BaseError from './BaseError';

export default class NotFound extends BaseError {
  constructor(description: string, sourceKeys?: string[]) {
    super(
      ErrorNames.API_ERROR,
      description,
      HttpStatusCode.NOT_FOUND,
      sourceKeys,
      true
    );
  }
}
