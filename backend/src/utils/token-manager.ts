import { NextFunction } from "express";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { COOKIE_NAME, RESPONSE_MESSAGES } from "./constants.js";

const createToken = (id: string, email: string, expiresIn: string) => {
  const payload = { id, email };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn,
  });

  return token;
};

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.signedCookies[COOKIE_NAME];

  if (!token || token.trim() === "") {
    return res
      .status(401)
      .json({ message: RESPONSE_MESSAGES.ERROR.TOKEN_NOT_RECEIVED });
  }

  return new Promise<void>((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
      if (err) {
        reject(err.message);
        return res
          .status(401)
          .json({ message: RESPONSE_MESSAGES.ERROR.TOKEN_EXPIRED });
      } else {
        res.locals.jwtData = success;
        resolve();
        return next();
      }
    });
  });
};

export { createToken, verifyToken };
