import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [translated, setTranslated] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setTranslated("");

    const res = await fetch("/api/rewrite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();
    setTranslated(data.result);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-blue-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-xl w-full bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          💬 情绪翻译器（Emotion Translator）
        </h1>
        <p className="text-gray-500 text-center mb-6">
          把你想说的话写下来，我会帮你用温柔的方式表达出来。
        </p>

        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
          rows="5"
          placeholder="请输入你想表达的内容..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          onClick={handleTranslate}
          disabled={loading}
          className="mt-4 w-full py-2 bg-pink-400 hover:bg-pink-500 text-white rounded-lg transition-all disabled:opacity-50"
        >
          {loading ? "正在翻译中..." : "开始翻译"}
        </button>

        {translated && (
          <div className="mt-6 p-4 bg-pink-50 border border-pink-200 rounded-lg text-gray-700 whitespace-pre-line">
            {translated}
          </div>
        )}
      </div>

      <footer className="mt-8 text-gray-400 text-sm text-center">
        支持语言：中文 / 日语 · 用AI传递温柔 ✨
      </footer>
    </div>
  );
}
