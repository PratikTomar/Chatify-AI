import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  Button,
  IconButton,
  TextField,
} from "@mui/material";

import { useAuth } from "../components/context/context";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ChatItem from "../components/Chat/ChatItem";
import { getUserInitials, formSubmitOnEnter } from "../utils/utils";

import {
  deleteAllChatsRequest,
  getAllChatsRequest,
  sendChatRequest,
} from "../helpers/api-communicator";
import useLoading from "../hooks/useLoading";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const Chat = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { loadingHandler } = useLoading();

  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;

    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }

    const newMessage: Message = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);

    loadingHandler();
    const chatData = await sendChatRequest(content);

    setChatMessages([...chatData.chats]);
    loadingHandler();
  };

  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting Chats", { id: "deletechats" });
      const data: any = await deleteAllChatsRequest();

      setChatMessages([]);
      toast.success(data?.message, { id: "deletechats" });
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message, { id: "deletechats" });
    }
  };

  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Chats", { id: "loadchats" });
      getAllChatsRequest()
        .then((data) => {
          if (data.chats.length > 0) {
            setChatMessages([...data.chats]);

            toast.success(data?.message, {
              id: "loadchats",
            });
          } else {
            toast.error("There are no chats, interact with assistant to generate chats", {
              id: "loadchats",
            });
          }

        })
        .catch((err) => {
          console.log(err);
          toast.error(err?.response?.data?.message, { id: "loadchats" });
        });
    }
  }, [auth]);

  useEffect(() => {
    if (!auth?.user) {
      return navigate("/login");
    }
  }, [auth]);

  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: "#212121",
        height: "100vh",
        width: "100%",
      }}
    >
      <Box
        sx={{
          flex: 0.2,
          bgcolor: "#111927",
          p: 3,
          color: "white",
          display: { xs: "none", md: "block" },
        }}
      >
        <Avatar sx={{ bgcolor: "white", color: "black", mx: "auto", mb: 2 }}>
          {getUserInitials(auth?.user?.name)}
        </Avatar>
        <Typography variant="h6" sx={{ textAlign: "center", mb: 2 }}>
          Hi, {auth?.user?.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{ textAlign: "center", mb: 2, fontSize: "14px" }}
        >
          Chatify Personal Assistant can provide wrong answers, do double check
          from other source as well
        </Typography>
        <Button
          variant="contained"
          color="error"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleDeleteChats}
        >
          Clear Chat
        </Button>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          width: "100%",
          height: "90vh",
          px: { xs: 1, sm: 3 },
          bgcolor: "#121212",
        }}
      >
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 1,
            py: 2,
          }}
        >
          {chatMessages.map((msg, index) => (
            <ChatItem key={index} content={msg.content} role={msg.role} />
          ))}
        </Box>
        <Box
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            bgcolor: "#2c2c2c",
            borderRadius: 2,
          }}
        >
          <TextField
            inputRef={inputRef}
            placeholder="Type your message..."
            size="small"
            multiline
            maxRows={4}
            onKeyDown={(event) => formSubmitOnEnter(event, handleSubmit)}
            sx={{
              flex: 1,
              ".MuiInputBase-input": {
                color: "white",
                padding: "10px",
                fontSize: "16px",
              },
              ".MuiOutlinedInput-notchedOutline": { border: "none" },
            }}
          />
          <IconButton
            sx={{
              bgcolor: "#1976d2",
              color: "white",
              ml: 2,
              ":hover": { bgcolor: "white", color: "#1976d2" },
            }}
            onClick={handleSubmit}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
