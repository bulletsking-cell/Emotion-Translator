// pages/api/test.js
export default async function handler(req, res) {
  // 返回是否存在 OPENAI_API_KEY
  try {
    const hasKey = !!process.env.OPENAI_API_KEY;
    const keyPreview = hasKey ? "loaded" : "missing";
    res.status(200).json({
      message: hasKey
        ? "✅ OPENAI_API_KEY 已正确加载（变量存在）"
        : "❌ OPENAI_API_KEY 未检测到（变量缺失）",
      keyPreview,
      // 下面仅用于调试：显示 NODE 环境与部署时间（可删除）
      node_env: process.env.NODE_ENV || null,
      time: new Date().toISOString(),
    });
  } catch (e) {
    res.status(500).json({ error: "test endpoint failed", details: e.message });
  }
}
