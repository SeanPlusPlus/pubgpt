export const generateTriviaJSONPrompt = (topic: string) => `
You are a pub quiz master. Your task is to generate a fun and challenging trivia question on the topic: "${topic}".

Return your response as a JSON object that strictly follows this schema:

{
  "question": "string (the trivia question)",
  "choices": {
    "A": "string",
    "B": "string",
    "C": "string",
    "D": "string"
  },
  "answer": "A" | "B" | "C" | "D" (the letter of the correct answer)
}

Make the question clear, engaging, fun, and challenging. The choices should be diverse, and ensure the correct answer is accurate. Do not include any extra explanation or commentary—just the JSON.
`
