import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { inngest } from "./client";
import { generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";

const google = createGoogleGenerativeAI();
const openai = createOpenAI();
const anthropic = createAnthropic();

export const execute = inngest.createFunction(
  { id: "execute-ai" },
  { event: "execute/ai" },
  async ({ event, step }) => {
    const { steps: geminiSteps } = await step.ai.wrap(
      "gemini-generative-text",
      generateText,
      {
        model: google("gemini-2.5-flash"),
        system: "You are a helpful assistant.",
        prompt: "What is the capital of Korea?",
      }
    );

    const { steps: openaiSteps } = await step.ai.wrap(
      "openai-generative-text",
      generateText,
      {
        model: openai("gpt-5"),
        system: "You are a helpful assistant.",
        prompt: "What is the capital of America?",
      }
    );

    const { steps: anthropicSteps } = await step.ai.wrap(
      "anthropic-generative-text",
      generateText,
      {
        model: anthropic("claude-4"),
        system: "You are a helpful assistant.",
        prompt: "What is the capital of Vietnam?",
      }
    );

    return { geminiSteps, openaiSteps, anthropicSteps };
  }
);
