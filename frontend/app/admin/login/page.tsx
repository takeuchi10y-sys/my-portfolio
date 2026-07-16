"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase"; // Firebase初期化ファイルのインポート

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // 1. signInWithEmailAndPassword を呼ぶ直前に、authが存在するかチェックする（安全弁）
    if (!auth) {
      // 💡 利用者にも原因がハッキリわかる文言に変更！
      setError(
        "【システムエラー】認証基盤が未設定です。環境変数（.env.local）の設定を確認してください。"
      );
      return; // 処理をここでストップ
    }

    try {
      // 2. ここまで来れば、auth は絶対に null じゃないので安全に実行できる！
      await signInWithEmailAndPassword(auth, email, password);
      console.log("ログイン成功！");

      // 認証が成功したときだけ、ダッシュボードへ進む
      router.push("/admin/dashboard");
    } catch (err: any) {
      console.error("ログイン失敗:", err);
      setError("メールアドレスまたはパスワードが正しくありません。");
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            管理者ログイン
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="text-red-500 text-sm text-center font-medium bg-red-50 p-2 rounded">
              {error}
            </div>
          )}
          <div className="-space-y-px rounded-md shadow-sm">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                メールアドレス
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="relative block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                placeholder="admin@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                パスワード
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="relative block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
            >
              ログイン
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
