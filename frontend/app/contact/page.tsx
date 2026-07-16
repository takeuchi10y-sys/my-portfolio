"use client";

import { useState } from "react";
import Link from "next/link";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 現時点ではAPIがないため、フロント側だけで「送信成功」のモック挙動にします
    if (
      formData.name &&
      formData.email &&
      formData.subject &&
      formData.message
    ) {
      setStatus("success");
    } else {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* ナビゲーションバー */}
      <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-tight">Yumiko's Portfolio</h1>
        <div className="space-x-6">
          <Link href="/" className="hover:text-blue-600 font-medium">
            Top
          </Link>
          <Link href="/contact" className="hover:text-blue-600 font-medium">
            Contact
          </Link>
        </div>
      </nav>

      <main className="max-w-xl mx-auto px-4 py-12">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-center">Contact</h2>

          {status === "success" ? (
            <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl text-center">
              <p className="font-semibold">お問い合わせを受け付けました。</p>
              <p className="text-sm mt-1">
                （※現在はデモモードです。メッセージは保存されていません）
              </p>
              <button
                onClick={() => {
                  setStatus("idle");
                  setFormData({
                    name: "",
                    email: "",
                    subject: "",
                    message: "",
                  });
                }}
                className="mt-4 text-sm underline text-green-800 hover:text-green-950"
              >
                続けて送信する
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  お名前
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="山田 太郎"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  メールアドレス
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="example@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  件名
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="お仕事のご依頼について"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  本文
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                  placeholder="こちらにメッセージを入力してください。"
                ></textarea>
              </div>

              {status === "error" && (
                <p className="text-red-600 text-sm font-medium">
                  すべての項目を入力してください。
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition duration-200 text-sm shadow-sm"
              >
                送信する
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
