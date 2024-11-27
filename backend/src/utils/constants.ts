export const COOKIE_NAME = "auth_token";

export const RESPONSE_MESSAGES = {
  SUCCESS: {
    CHATS_GENERATED: "Chat response generated successfully.",
    CHATS_RETRIEVED: "Chats retrieved successfully.",
    CHATS_DELETED: "All chats have been deleted successfully.",
    USERS_FETCHED: "Successfully fetched all users.",
    LOGIN_SUCCESS: "Login successful.",
    SIGNUP_SUCCESS: "User registration successful.",
    VERIFICATION_SUCCESS: "User verification successful.",
    LOGOUT_SUCCESS: "Logout successful. See you again!",
    TOKEN_VERIFIED: "Token verified successfully.",
  },
  ERROR: {
    UNAUTHORIZED_USER:
      "User not registered or token invalid. Please log in again.",
    FORBIDDEN_ACCESS:
      "Access denied. You do not have permission to perform this action.",
    GENERATION_FAILED:
      "Failed to generate chat response. Please try again later.",
    RETRIEVAL_FAILED: "Failed to retrieve chats. Please try again later.",
    DELETION_FAILED: "Failed to delete chats. Please try again later.",
    FETCH_USERS_FAILED: "Failed to fetch users. Please try again later.",
    LOGIN_ERROR: "An error occurred during login. Please try again later.",
    SIGNUP_FAILED: "Failed to register user. Please try again later.",
    VERIFICATION_FAILED: "Failed to verify user. Please try again later.",
    LOGOUT_FAILED: "Failed to log out. Please try again later.",
    USER_NOT_FOUND: "User not found. Please login again.",
    EMAIL_NOT_FOUND: "No user found with the provided email address.",
    PASSWORD_INCORRECT: "Incorrect password. Please try again.",
    EMAIL_CONFLICT:
      "A user with this email already exists. Please login or use a different email.",
    TOKEN_NOT_RECEIVED: "Token not received.",
    TOKEN_EXPIRED: "Token expired.",
  },
};

export const VALIDATION_MESSAGES = {
  EMAIL_REQUIRED: "Email is required",
  PASSWORD_MAX_LENGTH: "Password should contain a maximum of 12 characters",
  NAME_REQUIRED: "Name is required",
  MESSAGE_REQUIRED: "Message is required",
};
