import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Only POST requests are allowed" });
    return;
  }

  const { prompt } = req.body;

  if (!prompt) {
    res.status(400).json({ message: "Prompt is required" });
    return;
  }

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 150,
    });

    res.status(200).json({ result: response.data.choices[0].text });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
      }
