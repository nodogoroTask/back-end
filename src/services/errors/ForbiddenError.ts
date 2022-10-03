import { ErrorNames, HttpStatusCode } from '.';
import BaseError from './BaseError';

export default class Forbidden extends BaseError {
  constructor(description: string, sourceKeys?: string[]) {
    super(
      ErrorNames.API_ERROR,
      description,
      HttpStatusCode.FORBIDDEN,
      sourceKeys,
      true
    );
  }
}
