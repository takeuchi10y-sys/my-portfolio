import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client"; // 💡 追加：Prismaをインポート

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const prisma = new PrismaClient(); // 💡 追加：PrismaClientのインスタンスを作成

// 🔒 MUST要件：CORS設定（フロントエンド localhost:3000 からのアクセスを許可）
app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
  }),
);

// JSONリクエストをパースできるようにする
app.use(express.json());

// 🟢 疎通確認用ルート
app.get("/", (req, res) => {
  res.send("MyIR Backend API is running! 🚀");
});

// 🟢 フロントエンド取得用のAPIエンドポイント（💡 本物のDB連携にアップデート！）
app.get("/api/profile", async (req, res) => {
  try {
    // PostgreSQLデータベースから、シードで入れた「竹内優美子」さんのデータを最初の1件取得する
    const profile = await prisma.profile.findFirst({
      where: {
        name: "Yumiko Takeuchi", // 💡 名前が完全に一致するデータを狙い撃ちする
      },
    });

    // もしデータが空っぽだったら404エラーを返す（課題のMUST要件「404で応答」のガードレール）
    if (!profile) {
      res.status(404).json({ message: "プロフィールデータが見つかりません" });
      return;
    }

    // データベースから取ってきた本物のデータをフロントエンドに返す！
    res.json(profile);
  } catch (error) {
    console.error(
      "❌ データベースからのデータ取得中にエラーが発生しました:",
      error,
    );
    res.status(500).json({ message: "サーバーエラーが発生しました" });
  }
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(` 🚀 Server is running on http://localhost:${PORT}`);
  console.log(`=========================================`);
});
