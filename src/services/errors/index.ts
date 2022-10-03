export enum HttpStatusCode {
  OK = 200,
  OK_CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER = 500,
  NOT_IMPLEMENTED = 501,
}

export enum ErrorNames {
  ERROR = 'Error',
  API_ERROR = 'API error',
}
