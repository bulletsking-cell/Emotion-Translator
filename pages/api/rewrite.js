// pages/api/rewrite.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { text } = req.body || {};
    if (!text || !text.trim()) {
      return res.status(400).json({ error: "Missing text in request body" });
    }

    const OPENAI_KEY = process.env.OPENAI_API_KEY;
    const MODEL = process.env.OPENAI_MODEL || "gpt-3.5-turbo";

    if (!OPENAI_KEY) {
      return res.status(500).json({ error: "Missing OPENAI_API_KEY in environment" });
    }

    const payload = {
      model: MODEL,
      messages: [
        {
          role: "system",
          content:
            "你是一个温柔治愈的沟通顾问。将下列用户原文改写为温柔、体贴且保留原意的表达，句子简短清晰，适合直接发送给对方。仅返回最终文本内容。",
        },
        { role: "user", content: text },
      ],
      temperature: 0.7,
      max_tokens: 400,
    };

    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    const openaiData = await openaiRes.json();
    console.log("OpenAI response:", openaiData); // ✅ 调试日志

    if (!openaiRes.ok) {
      return res.status(500).json({
        error: "OpenAI API error",
        details: openaiData,
      });
    }

    const reply = openaiData.choices?.[0]?.message?.content;
    if (!reply) {
      return res.status(500).json({
        error: "No response from model",
        raw: openaiData,
      });
    }

    return res.status(200).json({ result: reply });
  } catch (err) {
    console.error("rewrite error:", err);
    return res.status(500).json({
      error: "Server error",
      details: String(err),
    });
  }
}
