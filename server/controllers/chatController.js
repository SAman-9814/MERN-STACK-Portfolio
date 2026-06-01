const SYSTEM_PROMPT = `You are ARIA (Aman's Real-time Intelligent Assistant), a friendly and professional AI chatbot built by Aman Sah to answer questions about his career, projects, and skills on his portfolio website.

Aman's Professional Profile:
- Full Name: Aman Sah (Aman Kumar Sah)
- Role: Junior Software Engineer, Full Stack Developer, and AI Engineer
- Location: Kathmandu, Nepal
- WhatsApp: +977-9814834383
- Email: sah99017@gmail.com
- Portfolio Website: https://www.amansah.com.np
- Current Work: Full Stack Developer at SolutionPath Technology Pvt. Ltd. (working on Employee Management System and an AI Multi-Vendor E-Commerce App).
- Core Tech Stack: React.js, Next.js, Node.js, Express.js, MongoDB, PostgreSQL (MERN & PERN stack), Tailwind CSS.
- AI & Automation Skills: Building AI agents, prompt engineering, OpenAI API integrations, and workflow automation using n8n.
- Other Information: Resume can be downloaded from the Hero section of his portfolio. He is passionate about building end-to-end web apps, workflow automations, and AI tools.

Guidelines for your responses:
1. Keep responses concise, helpful, and under 3-4 sentences.
2. Maintain a friendly, supportive tone.
3. If asked questions unrelated to Aman's work, skills, or projects, politely redirect the conversation to Aman's professional profile.
4. Do not make up any facts or credentials not listed above. If you don't know the answer, advise the user to contact Aman directly at sah99017@gmail.com or via WhatsApp.`;

export const handleChat = async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ success: false, message: 'Message is required' });
  }

  // Define static fallback logic matching user queries to portfolio FAQ rules
  const getStaticFallback = (msg) => {
    const lower = msg.toLowerCase();
    if (lower.includes('who') || lower.includes('name') || lower.includes('about')) {
      return "I'm Aman Sah — a Junior Software Engineer specializing in Full Stack Development & AI Engineering based in Kathmandu, Nepal 🇳🇵";
    }
    if (lower.includes('stack') || lower.includes('tech') || lower.includes('skill')) {
      return "I work with MERN & PERN stacks: React.js, Next.js, Node.js, Express.js, MongoDB, PostgreSQL, TypeScript, and Tailwind CSS!";
    }
    if (lower.includes('ai') || lower.includes('automation') || lower.includes('n8n') || lower.includes('openai')) {
      return "I build AI-powered tools using OpenAI API, LLM integrations, and workflow automation with n8n. Also experienced with Factory AI and AI agent development.";
    }
    if (lower.includes('work') || lower.includes('job') || lower.includes('experience') || lower.includes('company')) {
      return "I currently work at SolutionPath Technology Pvt. Ltd. as a Full Stack Developer, where I've built an Employee Management System and an AI Multi-Vendor E-Commerce App.";
    }
    if (lower.includes('contact') || lower.includes('email') || lower.includes('reach') || lower.includes('whatsapp')) {
      return "Reach me at sah99017@gmail.com, WhatsApp +977-9814834383, or use the contact form on this page!";
    }
    if (lower.includes('resume') || lower.includes('cv') || lower.includes('download')) {
      return "You can download my resume directly from the hero section of this page 📄";
    }
    if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey')) {
      return "Hey! 👋 Great to meet you! How can I help you learn more about Aman?";
    }
    return "I'm not sure about that, but feel free to email Aman at sah99017@gmail.com 😊";
  };

  const geminiKey = process.env.GEMINI_API_KEY;

  if (geminiKey) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: message }]
            }
          ],
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT }]
          },
          generationConfig: {
            maxOutputTokens: 150,
            temperature: 0.7
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API returned status ${response.status}`);
      }

      const data = await response.json();
      if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
        const reply = data.candidates[0].content.parts[0].text.trim();
        return res.status(200).json({ success: true, reply, source: 'gemini' });
      }
      throw new Error('Unexpected response format from Gemini API');
    } catch (error) {
      console.error('Gemini API call failed, falling back to local matches:', error.message);
    }
  }

  // Fallback to static matching
  const reply = getStaticFallback(message);
  return res.status(200).json({ success: true, reply, source: 'local' });
};
