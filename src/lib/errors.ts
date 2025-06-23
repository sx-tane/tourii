/**
 * Base class for custom application errors.
 */
export class AppError extends Error {
	public readonly context?: Record<string, unknown>;

	constructor(message: string, context?: Record<string, unknown>) {
		super(message);
		this.name = this.constructor.name;
		this.context = context;
		// Maintains proper stack trace in V8 environments (Node, Chrome)
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, this.constructor);
		}
	}
}

/**
 * Represents an error originating from an API call.
 */
export class ApiError extends AppError {
	public readonly status: number;
	public readonly code?: string;
	public readonly details?: unknown;

	constructor(
		message: string,
		status: number,
		context?: {
			code?: string;
			details?: unknown;
			[key: string]: unknown; // Allow additional context
		},
	) {
		super(message, context);
		this.status = status;
		this.code = context?.code;
		this.details = context?.details;
	}
}

/**
 * Represents an authentication or authorization error.
 */
export class AuthError extends AppError {
	constructor(
		message: string = "Authentication required",
		context?: Record<string, unknown>,
	) {
		super(message, context);
	}
}

/**
 * Represents a resource not found error (e.g., 404).
 */
export class NotFoundError extends ApiError {
	constructor(
		message: string = "Resource not found",
		context?: Record<string, unknown>,
	) {
		super(message, 404, context);
	}
}

/**
 * Represents an input validation error.
 */
export class ValidationError extends AppError {
	public readonly fieldErrors?: Record<string, string | string[]>;

	constructor(
		message: string = "Validation failed",
		context?: {
			fieldErrors?: Record<string, string | string[]>;
			[key: string]: unknown;
		},
	) {
		super(message, context);
		this.fieldErrors = context?.fieldErrors;
	}
}
