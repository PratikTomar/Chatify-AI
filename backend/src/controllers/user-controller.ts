import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { compare, hash } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME, RESPONSE_MESSAGES } from "../utils/constants.js";

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      message: RESPONSE_MESSAGES.SUCCESS.USERS_FETCHED,
      users,
    });
  } catch (error) {
    return res.status(500).json({
      message: RESPONSE_MESSAGES.ERROR.FETCH_USERS_FAILED,
      cause: error.message,
    });
  }
};

const userLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({
        message: RESPONSE_MESSAGES.ERROR.EMAIL_NOT_FOUND,
      });
    }

    const isPasswordCorrect = await compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(403).json({
        message: RESPONSE_MESSAGES.ERROR.PASSWORD_INCORRECT,
      });
    }

    res.clearCookie(COOKIE_NAME, {
      path: "/",
      domain: "chatify-ai-api.onrender.com",
      httpOnly: true,
      signed: true,
      secure: true,
      sameSite: "none",
    });

    const token = createToken(
      existingUser._id.toString(),
      existingUser.email,
      "7d"
    );

    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "chatify-ai-api.onrender.com",
      expires,
      httpOnly: true,
      signed: true,
      secure: true,
      sameSite: "none",
    });

    return res.status(200).json({
      message: RESPONSE_MESSAGES.SUCCESS.LOGIN_SUCCESS,
      name: existingUser.name,
      email: existingUser.email,
    });
  } catch (error) {
    return res.status(500).json({
      message: RESPONSE_MESSAGES.ERROR.LOGIN_ERROR,
      cause: error.message,
    });
  }
};

const userSignup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: RESPONSE_MESSAGES.ERROR.EMAIL_CONFLICT,
      });
    }

    const hashedPassword = await hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.clearCookie(COOKIE_NAME, {
      path: "/",
      domain: "chatify-ai-api.onrender.com",
      httpOnly: true,
      signed: true,
      secure: true,
      sameSite: "none",
    });

    const token = createToken(user._id.toString(), user.email, "7d");

    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "chatify-ai-api.onrender.com",
      expires,
      httpOnly: true,
      signed: true,
      secure: true,
      sameSite: "none",
    });

    return res.status(201).json({
      message: RESPONSE_MESSAGES.SUCCESS.SIGNUP_SUCCESS,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    return res.status(500).json({
      message: RESPONSE_MESSAGES.ERROR.SIGNUP_FAILED,
      cause: error.message,
    });
  }
};

const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);

    if (!user) {
      return res.status(404).json({
        message: RESPONSE_MESSAGES.ERROR.USER_NOT_FOUND,
      });
    }

    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(403).json({
        message: RESPONSE_MESSAGES.ERROR.FORBIDDEN_ACCESS,
      });
    }

    return res.status(200).json({
      message: RESPONSE_MESSAGES.SUCCESS.VERIFICATION_SUCCESS,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    return res.status(500).json({
      message: RESPONSE_MESSAGES.ERROR.VERIFICATION_FAILED,
      cause: error.message,
    });
  }
};

export const userLogout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(404).json({
        message: RESPONSE_MESSAGES.ERROR.USER_NOT_FOUND,
      });
    }

    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "chatify-ai-api.onrender.com",
      signed: true,
      path: "/",
      secure: true,
      sameSite: "none",
    });

    return res.status(200).json({
      message: RESPONSE_MESSAGES.SUCCESS.LOGOUT_SUCCESS,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    return res.status(500).json({
      message: RESPONSE_MESSAGES.ERROR.LOGOUT_FAILED,
      cause: error.message,
    });
  }
};

export { getAllUsers, userSignup, userLogin, verifyUser };
