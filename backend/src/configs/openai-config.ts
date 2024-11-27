import { Configuration } from "openai";

const configureOpenAI = () => {
  const config = new Configuration({
    apiKey: process.env.OPEN_AI_SECRET,
    organization: process.env.OPEN_AI_ORGANISATION_ID,
  });
  return config;
};

export { configureOpenAI };
