import { ChatCompletionRequestMessage, OpenAIApi } from "openai";
import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { configureOpenAI } from "../configs/openai-config.js";
import { RESPONSE_MESSAGES } from "../utils/constants.js";

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;

  try {
    const user = await User.findById(res.locals.jwtData.id);

    if (!user) {
      return res.status(401).json({
        message: RESPONSE_MESSAGES.ERROR.UNAUTHORIZED_USER,
      });
    }

    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    })) as ChatCompletionRequestMessage[];

    chats.push({ content: message, role: "user" });

    user.chats.push({ content: message, role: "user" });

    const config = configureOpenAI();
    const openai = new OpenAIApi(config);

    const chatResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: chats,
    });

    user.chats.push(chatResponse.data.choices[0].message);

    await user.save();

    return res.status(200).json({
      message: RESPONSE_MESSAGES.SUCCESS.CHATS_GENERATED,
      chats: user.chats,
    });
  } catch (error) {
    console.error("Error in generating chat completion:", error.message);
    return res.status(500).json({
      message: RESPONSE_MESSAGES.ERROR.GENERATION_FAILED,
      error: error.message,
    });
  }
};

export const sendAllChatsToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {


  try {
    const user = await User.findById(res.locals.jwtData.id);

    if (!user) {
      return res.status(401).json({
        message: RESPONSE_MESSAGES.ERROR.UNAUTHORIZED_USER,
      });
    }

    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(403).json({
        message: RESPONSE_MESSAGES.ERROR.FORBIDDEN_ACCESS,
      });
    }

    return res.status(200).json({
      message: RESPONSE_MESSAGES.SUCCESS.CHATS_RETRIEVED,
      chats: user.chats,
    });
  } catch (error) {
    console.error("Error in fetching chats:", error.message);
    return res.status(500).json({
      message: RESPONSE_MESSAGES.ERROR.RETRIEVAL_FAILED,
      error: error.message,
    });
  }
};

export const deleteAllChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);

    if (!user) {
      return res.status(401).json({
        message: RESPONSE_MESSAGES.ERROR.UNAUTHORIZED_USER,
      });
    }

    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(403).json({
        message: RESPONSE_MESSAGES.ERROR.FORBIDDEN_ACCESS,
      });
    }

    //@ts-ignore
    user.chats = [];

    await user.save();

    return res.status(200).json({
      message: RESPONSE_MESSAGES.SUCCESS.CHATS_DELETED,
    });
  } catch (error) {
    console.error("Error in deleting chats:", error.message);
    return res.status(500).json({
      message: RESPONSE_MESSAGES.ERROR.DELETION_FAILED,
      error: error.message,
    });
  }
};
