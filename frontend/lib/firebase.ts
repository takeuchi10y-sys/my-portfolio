import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";

// 1. 必要な変数を列挙して一括チェック
const requiredEnvVars = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
} as const;

// 2. undefined の変数を検出して、開発者が気づけるよう明示的にエラーを出す
const missingVars = Object.entries(requiredEnvVars)
  .filter(([, value]) => !value)
  .map(([key]) => `NEXT_PUBLIC_FIREBASE_${key.toUpperCase()}`);

if (missingVars.length > 0) {
  // 1. エラーを投げる(throw)のをやめて、コンソールに特大の警告を出すだけに留める
  console.error(
    "\n==================================================\n" +
      "[Firebase Init Error] 以下の環境変数が未設定です:\n" +
      missingVars.join("\n") +
      "\nfrontend/.env.local を確認し、開発サーバーを再起動してください。\n" +
      "=================================================="
  );
  // 2. アプリをクラッシュさせないよう、この後の初期化処理にダミー変数を渡すか、
  // もしくはこのファイルの下部で app や auth を null にして安全にハンドリングできるようにする
}

// 3. 型アサーション（missingVarsチェック済みなのでstring確定）
const firebaseConfig = requiredEnvVars as Record<string, string>;

let app: FirebaseApp;
let auth: Auth | null = null; // 👈 落ちないように最初は null で初期化できるように型を定義

try {
  // 環境変数が無事に揃っている時だけ、通常の初期化 or 再利用を行う
  if (missingVars.length === 0) {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
  } else {
    // 環境変数が足りない場合は、appの初期化をスキップしてダミーの例外ログ用オブジェクトなどを入れておく
    console.warn(
      "[Firebase Init] 環境変数不足のため、Firebaseの初期化をスキップしました。"
    );
  }
} catch (e) {
  console.error("[Firebase Init] 初期化中にエラーが発生しました:", e);
}

export { auth };
// 💡 環境変数が足りない（missingVarsがある）ときは、安全に null をエクスポートするように変更
export default missingVars.length === 0 && getApps().length > 0
  ? getApp()
  : null;
