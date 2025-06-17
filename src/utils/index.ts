/**
 * Utilities Barrel Export
 * Centralized exports for all utility functions and classes
 */

// API Utilities
export { makeApiRequest } from "./api-helpers";

// Date Utilities
export { default as DateUtils } from "./date-utils";

// Geographic Utilities
export { 
  calculateDistanceKm, 
  estimateWalkingMinutes,
  type Coordinates 
} from "./geo-utils";

// ID Generation Utilities
export { default as createIdGenerator } from "./id-utils";

// Logging Utilities
export { logger } from "./logger";

// Validation Utilities
export {
  isValidLatitude,
  isValidLongitude,
  sanitizeHtml,
  validateTouristSpot,
  validateTouristSpots,
  type ValidationResult
} from "./validation-utils";