import { Box, Avatar, Typography } from "@mui/material";
import { useAuth } from "../context/context";
import { extractCodeFromString, extractLanguageFromCodeBlock, getUserInitials, isCodeBlock } from "../../utils/utils";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { blue } from "@mui/material/colors";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CopyToClipBoard from "./CopyToClipBoard";

const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: "user" | "assistant";
}) => {

  const messageBlocks = extractCodeFromString(content);
  const auth = useAuth();

  return role === "assistant" ? (
    <Box
      sx={{
        display: "flex",
        maxWidth: "70%",
        p: 2,
        bgcolor: "#111927",
        gap: 2,
        borderRadius: 2,
        my: 1,
        alignSelf: "flex-start",
      }}
    >
      <Avatar
        sx={{
          bgcolor: blue[500],
        }}
      >
        <AutoAwesomeIcon />
      </Avatar>
      <Box>
        {!messageBlocks && (
          <Typography sx={{ fontSize: { xs: "14px", md: "18px" } }}>{content}</Typography>
        )}
        {messageBlocks &&
          messageBlocks.map((block, index) =>
            isCodeBlock(block) ? (
              <>
                <CopyToClipBoard value={block.replace(/^([a-zA-Z]+)\n/, "")} />
                <SyntaxHighlighter
                  key={index}
                  style={coldarkDark}
                  language={extractLanguageFromCodeBlock(block)}
                  customStyle={{ fontSize: "18px", overflowWrap: "break-word" }}
                >
                  {block.replace(/^([a-zA-Z]+)\n/, "")}{" "}
                </SyntaxHighlighter>
              </>
            ) : (
              <Typography key={index} sx={{ fontSize: { xs: "14px", md: "18px" } }}>
                {block}
              </Typography>
            )
          )}
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        maxWidth: "70%",
        p: 2,
        bgcolor: "#111927",
        gap: 2,
        borderRadius: 2,
        my: 1,
        mr: 2,
        alignSelf: "flex-end",
      }}
    >
      <Avatar sx={{ bgcolor: "black", color: "white" }}>
        {getUserInitials(auth?.user?.name)}
      </Avatar>
      <Box>
        {!messageBlocks && (
          <Typography sx={{ fontSize: { xs: "14px", md: "18px" }, color: "white" }}>
            {content}
          </Typography>
        )}
        {messageBlocks &&
          messageBlocks.map((block, index) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter
                key={index}
                style={coldarkDark}
                language={extractLanguageFromCodeBlock(block)}
              >
                {block.replace(/^([a-zA-Z]+)\n/, "")}
              </SyntaxHighlighter>
            ) : (
              <Typography key={index} sx={{ fontSize: { xs: "14px", md: "18px" }, color: "white" }}>
                {block}
              </Typography>
            )
          )}
      </Box>
    </Box>
  );
};

export default ChatItem;
