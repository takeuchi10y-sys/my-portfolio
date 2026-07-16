"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
// 🔒 MUST要件：CORS設定（フロントエンド localhost:3000 からのアクセスを許可）
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
}));
// JSONリクエストをパースできるようにする
app.use(express_1.default.json());
// 📝 テスト用のモックデータ（Issue #12でDBに置き換える用のMyIRデータ）
const mockProfile = {
    name: "Yumiko Takeuchi",
    title: "Full Stack Engineer (Candidate)",
    past: "静岡育ち。国際関係学の日本文化専攻。熱海の旅館と、生命保険会社での勤務経験あり。子供用に髪飾りを作るのが楽しみ。",
    present: "自信を持って働ける自分になる。今の私と家族を豊かにする。考えて話す。",
    future: "社会でも、会社でも、特定の人でも、とにかく役に立てるようになりたい。自分のことを好きになりたい。経済力をつけ、まるごと自立した人になる。",
};
// 🟢 疎通確認用ルート
app.get("/", (req, res) => {
    res.send("MyIR Backend API is running! 🚀");
});
// 🟢 フロントエンド取得用のAPIエンドポイント
app.get("/api/profile", (req, res) => {
    res.json(mockProfile);
});
// サーバー起動
app.listen(PORT, () => {
    console.log(`=========================================`);
    console.log(` 🚀 Server is running on http://localhost:${PORT}`);
    console.log(`=========================================`);
});
