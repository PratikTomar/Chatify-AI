import { NextFunction, Request, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator";
import { VALIDATION_MESSAGES } from "./constants.js";

const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) {
        break;
      }
    }
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    return res.status(422).json({ errors: errors.array() });
  };
};

const loginValidator = [
  body("email").trim().isEmail().withMessage(VALIDATION_MESSAGES.EMAIL_REQUIRED),
  body("password")
    .trim()
    .isLength({ max: 12 })
    .withMessage(VALIDATION_MESSAGES.PASSWORD_MAX_LENGTH),
];

const signUpValidator = [
  body("name").notEmpty().withMessage(VALIDATION_MESSAGES.NAME_REQUIRED),
  ...loginValidator,
];

const chatComplitionValidator = [
  body("message").notEmpty().withMessage(VALIDATION_MESSAGES.MESSAGE_REQUIRED),
];

export { validate, signUpValidator, chatComplitionValidator, loginValidator };

