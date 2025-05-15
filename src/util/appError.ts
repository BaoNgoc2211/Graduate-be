export class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number, status: string = 'error') {
    super(message);
    this.statusCode = statusCode;
    this.status = status;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends AppError {
  constructor(message: string) {
    super(message, 400, 'bad_request');
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(message, 401, 'unauthorized');
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string) {
    super(message, 403, 'forbidden');
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404, 'not_found');
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409, 'conflict');
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 422);
  }
} 