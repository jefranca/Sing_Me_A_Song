import * as schemas from "./schemas.js";
import ValidationError from "../errors/ValidationError.js";

async function recommendationsValidations(recommendation) {
  const joiValidation = schemas.recommendationsSchema.validate(recommendation);
  if (joiValidation.error)
    throw new ValidationError(joiValidation.error.details[0].message);
}

async function idValidation(id) {
  const joiValidation = schemas.idSchema.validate(id);
  if (joiValidation.error)
    throw new ValidationError(joiValidation.error.details[0].message);
}

async function amountValidation(amount) {
  const joiValidation = schemas.amountSchema.validate(amount);
  if (joiValidation.error)
    throw new ValidationError(joiValidation.error.details[0].message);
}

export { recommendationsValidations, idValidation, amountValidation };
