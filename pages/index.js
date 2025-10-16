import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [translated, setTranslated] = useState('');

  const handleTranslate = () => {
    // 模拟温柔翻译结果
    setTranslated(`🌸 温柔表达版本：\n「${input}」 → 「我想温柔地说：${input}，希望你能感受到我的心意。」`);
  };

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center px-4 py-8">
      {/* 图标与标题 */}
      <div className="text-center mb-6">
        <div className="text-5xl mb-2">💬</div>
        <h1 className="text-3xl font-semibold text-pink-700">情绪翻译器 Emotion Translator</h1>
        <p className="text-gray-700 mt-2">把你想说的话写下来，我会帮你用温柔的方式表达出来。</p>
      </div>

      {/* 输入框 */}
      <div className="w-full max-w-xl bg-white rounded-xl shadow-md p-6">
        <label className="block text-gray-600 mb-2">你可以写下任何话，无论是生气、委屈或想表达爱意：</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="请输入你想表达的内容"
          className="w-full h-32 p-4 border border-pink-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-pink-300"
        />

        <button
          onClick={handleTranslate}
          className="mt-4 w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition"
        >
          开始翻译
        </button>

        {/* 模拟翻译结果 */}
        {translated && (
          <div className="mt-6 bg-pink-100 p-4 rounded-lg text-gray-800 whitespace-pre-line">
            {translated}
          </div>
        )}
      </div>

      {/* 底部语言提示 */}
      <p className="mt-6 text-sm text-gray-500">支持语言：中文 / 日语 - 用 AI 传递温柔</p>
    </div>
  );
}
