import * as schemas from "./schemas.js";
import ValidationError from "../errors/ValidationError.js";

async function recommendationsValidations(recommendation) {
  const joiValidation = schemas.recommendationsSchema.validate(recommendation);
  if (joiValidation.error)
    throw new ValidationError(joiValidation.error.details[0].message);
}

export {
    recommendationsValidations
}