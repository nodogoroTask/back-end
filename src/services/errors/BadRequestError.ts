import { ErrorNames, HttpStatusCode } from '.';
import BaseError from './BaseError';

export default class BadRequest extends BaseError {
  constructor(description: string, sourceKeys?: string[]) {
    super(
      ErrorNames.API_ERROR,
      description,
      HttpStatusCode.BAD_REQUEST,
      sourceKeys,
      true
    );
  }
}
