export default async function handler(req, res) {
  const hasKey = !!process.env.OPENAI_API_KEY;
  res.status(200).json({
    message: hasKey
      ? "✅ OPENAI_API_KEY 已正确加载！"
      : "❌ 环境变量未检测到。",
  });
}
