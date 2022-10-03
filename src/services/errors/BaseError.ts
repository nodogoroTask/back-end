import { ErrorNames, HttpStatusCode } from '.';
/**
 * Operational errors represent runtime problems whose results
 * are expected. Mainly they are client fault
 */
export default class BaseError extends Error {
  public readonly name: ErrorNames;
  public readonly httpCode: HttpStatusCode;
  public readonly isOperational: boolean;
  public readonly sourceKeys: string[]; // key values

  constructor(
    name: ErrorNames,
    description: string,
    httpCode: HttpStatusCode,
    sourceKeys?: string[],
    isOperational?: boolean
  ) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = isOperational || true;
    this.sourceKeys = sourceKeys || [];

    Error.captureStackTrace(this);
  }
}
