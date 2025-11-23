import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { inngest } from './client';
import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { createAnthropic } from '@ai-sdk/anthropic';
import * as Sentry from '@sentry/nextjs';

const google = createGoogleGenerativeAI();
const openai = createOpenAI();
const anthropic = createAnthropic();

export const execute = inngest.createFunction(
  { id: 'execute-ai' },
  { event: 'execute/ai' },
  async ({ event, step }) => {
    Sentry.logger.info('User triggered test log', {
      log_source: 'sentry_test',
    });
    console.warn('Something is missing');
    console.error('This is an error to test sentry');

    const { steps: geminiSteps } = await step.ai.wrap('gemini-generative-text', generateText, {
      model: google('gemini-2.5-flash'),
      system: 'You are a helpful assistant.',
      prompt: 'What is the capital of Korea?',
      experimental_telemetry: {
        isEnabled: true,
        recordInputs: true,
        recordOutputs: true,
      },
    });

    const { steps: openaiSteps } = await step.ai.wrap('openai-generative-text', generateText, {
      model: openai('gpt-5'),
      system: 'You are a helpful assistant.',
      prompt: 'What is the capital of America?',
      experimental_telemetry: {
        isEnabled: true,
        recordInputs: true,
        recordOutputs: true,
      },
    });

    const { steps: anthropicSteps } = await step.ai.wrap(
      'anthropic-generative-text',
      generateText,
      {
        model: anthropic('claude-sonet-4-5'),
        system: 'You are a helpful assistant.',
        prompt: 'What is the capital of Vietnam?',
        experimental_telemetry: {
          isEnabled: true,
          recordInputs: true,
          recordOutputs: true,
        },
      },
    );

    return { geminiSteps, openaiSteps, anthropicSteps };
  },
);
