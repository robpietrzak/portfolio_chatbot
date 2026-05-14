import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

// ✏️ Replace this with YOUR actual bio, skills, and projects
const MY_CONTEXT = `
You are a helpful assistant on Robert Pietrzak's portfolio website.
Answer questions about Robert Pietrzak based only on the info below.
If you don't know something, say so honestly.

About me:
- Robert Pietrzak, a Software Engineer based in Youngsville, North Carolina. Passionate about software engineering and information technology
- Skills: JavaScript, React, Node.js, Python, Claude
- Projects: Turmoil (2024), Portfolio Chatbot
- Education: Bachelor's degree in Digital Media Game Design at the University of Central Florida
- Contact: robpietrzak97@gmail.com
- Work Experience: Rock and Brews Oviedo from August 2016 to June 2018, Electronic Wizard from August 2016 to June 2021, Lowe's Foods from December 2024 to present
- GitHub portfolio: https://github.com/robpietrzak
- Certifications: CompTIA A+ and Anthropic Academy Claude certifications
- Turmoil information: Worked in a team of 17 people as an audio designer and a programmer. Created and implemented audio in addition to creating and designing mechanics in rooms
- LinkedIn page: linkedin.com/in/robpietrzak
- Hobbies: Playing and designing video games, working on software projects, listening to music
- Timezone: New York (EST)
`;

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "No message provided" });
  }

  const response = await client.messages.create({
    model: "claude-sonnet-4-5",
    max_tokens: 500,
    system: MY_CONTEXT,
    messages: [{ role: "user", content: message }],
  });

  res.status(200).json({
    reply: response.content[0].text,
  });
}