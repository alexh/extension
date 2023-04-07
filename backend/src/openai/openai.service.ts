import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { Promise } from 'mongoose';

const OPEN_AI_CHAT_ENDPOINT = 'https://api.openai.com/v1/chat/completions';
const SUMMARY_PROMPT =
  'A user highlighted the following text on a web page and would like an easy to read and simplified summary (roughly the length of a Tweet). Please return a summary of all text following this colon: ';

enum OpenAIRole {
  user = 'user',
  assistant = 'assistant',
}

interface OpenAIMessageWrapper {
  message: OpenAIMessage;
  finish_reason: object;
}

interface OpenAIMessage {
  role: OpenAIRole;
  content: string;
}

enum OpenAIModel {
  gpt3_5 = 'gpt-3.5-turbo',
  gpt4 = 'gpt-4',
}

interface OpenAIChatRequest {
  model: OpenAIModel;
  messages: OpenAIMessage[];
}

interface OpenAIResponse {
  choices: OpenAIMessageWrapper[];
}

@Injectable()
export class OpenAIService {
  constructor(
    private readonly httpService: HttpService,
    private config: ConfigService,
  ) {}

  async getTextSummary(text: string): Promise<string> {
    const data: OpenAIChatRequest = {
      model: OpenAIModel.gpt3_5,
      messages: [{ role: OpenAIRole.user, content: SUMMARY_PROMPT + text }],
    };
    const auth_token = this.config.get('OPENAI_API_KEY');
    const response = await firstValueFrom(
      this.httpService.post(OPEN_AI_CHAT_ENDPOINT, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth_token,
        },
      }),
    );
    if (response.status != 200) {
      return Promise.resolve();
    }
    return (response.data as OpenAIResponse).choices[0].message.content;
  }
}
