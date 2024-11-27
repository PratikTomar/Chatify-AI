import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { chatComplitionValidator, validate } from "../utils/validators.js";
import {
  deleteAllChats,
  generateChatCompletion,
  sendAllChatsToUser,
} from "../controllers/chat-controller.js";

const chatRoutes = Router();

chatRoutes.post(
  "/new",
  validate(chatComplitionValidator),
  verifyToken,
  generateChatCompletion
);

chatRoutes.get("/all-chats", verifyToken, sendAllChatsToUser);

chatRoutes.delete("/delete", verifyToken, deleteAllChats);

export default chatRoutes;