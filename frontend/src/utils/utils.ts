const getUserInitials = (name: any) => {
  const initials = name
    ?.split(" ")
    .map((firstName: any) => firstName[0])
    .join("");
  return initials?.toUpperCase();
};

const formSubmitOnEnter = (
  event: React.KeyboardEvent<HTMLDivElement>,
  submitFxn: Function
) => {
  if (event.key === "Enter") {
    event.preventDefault();
    submitFxn();
  }
};

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const isValidPassword = (password: string) =>
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\W]).{1,12}$/.test(password);

const extractCodeFromString = (message: string) => {
  if (message.includes("```")) {
    const blocks = message.split("```");
    return blocks;
  }
  return null;
};

const extractLanguageFromCodeBlock = (codeBlock: string) => {
  const match = codeBlock.match(/^([a-zA-Z]+)\n/);
  if (match) {
    return match[1].toLowerCase();
  }
  return "text";
};

const isCodeBlock = (str: string) => {
  if (
    str.includes("=") ||
    str.includes(";") ||
    str.includes("[") ||
    str.includes("]") ||
    str.includes("{") ||
    str.includes("}") ||
    str.includes("#") ||
    str.includes("//") ||
    str.includes(":")
  ) {
    return true;
  }
  return false;
};

export {
  getUserInitials,
  formSubmitOnEnter,
  isValidEmail,
  isValidPassword,
  extractCodeFromString,
  isCodeBlock,
  extractLanguageFromCodeBlock,
};
