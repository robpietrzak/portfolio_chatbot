import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

// ✏️ Fill in your actual bio, skills, and projects below
const MY_CONTEXT = `
You are a helpful assistant on Robert Pietrzak's portfolio website.
Answer questions about Robert based only on the info below.
If you don't know something, say so honestly.

About me:
- Robert Pietrzak, a Software Engineer based in Youngsville, North Carolina 
- Skills: JavaScript, React, Node.js, Python, Claude
- Projects: Turmoil (2024), Portfolio Chatbot, Gambit
- Education: Bachelor's degree in Digital Media Game Design, with CompTIA A+ and Anthropic Academy Claude certifications
- Contact: robpietrzak97@gmail.com
`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "No message provided" });
  }

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 500,
    system: MY_CONTEXT,
    messages: [{ role: "user", content: message }],
  });

  res.status(200).json({
    reply: response.content[0].text,
  });
}
