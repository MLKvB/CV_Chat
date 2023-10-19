// chat.js
const { OpenAIApi } = require('openai');

exports.handler = async function(event, context) {
  const userMessage = JSON.parse(event.body).message;

  const gptApi = new OpenAIApi({
    apiKey: process.env.GPT_API_KEY,
  });

  try {
    const response = await gptApi.createCompletion({
      engine: 'davinci-codex', // Use the appropriate engine
      prompt: userMessage,
      max_tokens: 100,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: response.choices[0].text }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error communicating with the GPT-3 API' }),
    };
  }
};
