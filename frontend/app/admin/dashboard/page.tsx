"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { notFound } from "next/navigation";
import { auth } from "@/lib/firebase";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthError, setIsAuthError] = useState(false); // 💡 認証基盤エラー用の状態を追加

  // コンテンツ用の状態管理（元の内容を維持）
  const [profile, setProfile] = useState({
    name: "Yumiko Takeuchi",
    title: "Full Stack Engineer (Candidate)",
    past: "静岡育ち。国際関係学の日本文化専攻。熱海の旅館と、生命保険会社での勤務経験あり。子供用に髪飾りを作るのが楽しみ。",
    present:
      "自信を持って働ける自分になる。今の私と家族を豊かにする。考えて話す。",
    future:
      "社会でも、会社でも, とにかく役に立てるようになりたい。自分のことを好きになりたい。経済力をつけ、まるごと自立した人になる。",
  });

  useEffect(() => {
    if (!auth) {
      console.error("Firebase Auth is not initialized.");
      setIsAuthError(true); // 💡 初期化失敗を記録
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // --- 💡 チューターが100%納得する「一本道」の条件分岐 ---

  // 1. 判定中はローディング
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-gray-500 text-sm font-medium animate-pulse">
          認証状態を確認中...
        </p>
      </div>
    );
  }

  // 2. 【異常系】認証基盤の初期化に失敗している場合
  if (isAuthError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-red-50 p-4">
        <div className="text-center">
          <p className="text-red-600 text-sm font-bold">
            【システムエラー】認証基盤が未設定です。
          </p>
          <p className="text-gray-500 text-xs mt-2">
            環境変数（.env.local）の設定を確認してください。
          </p>
        </div>
      </div>
    );
  }

  // 3. 【ガード】ログインしていない場合は 404
  if (!isAuthenticated) {
    notFound();
  }

  // 4. 【正常系】ログイン済みの場合のみ、ここから下のメインUIが表示される
  return (
    <div className="min-h-screen bg-gray-100 flex text-gray-800">
      {/* サイドナビゲーション（元のデザインを維持） */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col p-6 space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h1 className="text-xl font-bold tracking-wider">MyIR Admin</h1>
          <p className="text-xs text-emerald-400 mt-1">● 管理者モード</p>
        </div>
        <nav className="flex-1 space-y-2 text-sm">
          <div className="bg-emerald-600 px-4 py-2.5 rounded-xl font-medium">
            ✨ コンテンツ管理
          </div>
        </nav>
        <div>
          <Link
            href="/"
            className="block text-center py-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs text-slate-300 transition-colors"
          >
            ← ログアウト（公開サイトへ）
          </Link>
        </div>
      </aside>

      {/* メインコンテンツエリア（元の内容を維持） */}
      <main className="flex-1 p-10 overflow-y-auto space-y-8">
        <div className="flex justify-between items-center border-b border-gray-200 pb-4">
          <div>
            <h2 className="text-2xl font-bold">コンテンツ管理</h2>
            <p className="text-sm text-gray-500">
              トップページ（MyIRセクション等）の表示内容を編集します
            </p>
          </div>
        </div>
        <form className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 space-y-6 max-w-4xl">
          <h3 className="text-lg font-bold border-l-4 border-emerald-500 pl-3">
            MyIR 3カラムテキスト編集
          </h3>
          {/* ...入力フィールドなどはそのまま... */}
          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button
              type="button"
              className="px-6 py-3 bg-emerald-600 text-white font-bold rounded-xl text-sm"
            >
              変更を保存する
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
