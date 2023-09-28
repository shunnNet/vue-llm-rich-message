import { openaiClient } from './fetch'

const defaultOptions = {
  model: 'gpt-3.5-turbo',
  temperature: 0,
}
export const chatCompletion = (messages: any[] = [], options: any = defaultOptions) =>
  openaiClient('/chat/completions')
    .post({
      ...options,
      messages,
    })
    .json()
