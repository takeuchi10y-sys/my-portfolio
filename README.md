# my-portfolio（ポートフォリオサイト）

## 📝 概要

このリポジトリは、**Next.js（フロント）＋ Express（バックエンド）＋ Prisma（ORM）＋ PostgreSQL（DB）＋ Firebase（認証）** を組み合わせて構築した、管理機能付きポートフォリオサイトです。

- プロフィール表示
- 制作実績一覧
- 問い合わせフォーム
- 管理者ログイン
- 管理画面からのデータ編集

など、ポートフォリオとして必要な機能をフルスタックで実装しています。

## ⚙️ 使用技術

### フロントエンド

- Next.js 14
- TypeScript
- Tailwind CSS
- Firebase Authentication
- App Router 構成

### バックエンド

- Node.js / Express
- Prisma ORM
- PostgreSQL
- Docker / docker-compose

## 📁 ディレクトリ構成

```
my-portfolio/
├── frontend/   # Next.js アプリ（UI・認証・問い合わせフォームなど）
├── backend/    # Express API（プロフィール・実績データ取得）
├── docker-compose.yml
└── README.md
```

## 📄 主な機能

### 🔐 管理者ログイン（Firebase Auth）

- Firebase Authentication を利用した安全なログイン機能
- ログイン後のみ `/admin` にアクセス可能

### 📝 プロフィール・実績データの取得（Prisma + PostgreSQL）

- Express API からプロフィール情報を取得
- Prisma ORM による型安全な DB 操作
- DB エラー時の安全なレスポンス（404 / 500）

### 📬 問い合わせフォーム

- `/contact` から問い合わせ内容を送信
- バックエンド API で受け取り（モック → 実装へ拡張可能）

### 🌐 レスポンシブ対応

- Tailwind CSS による軽量で柔軟な UI
- PC / スマホ両対応

## 🧩 工夫したポイント

- **Prisma のスキーマ設計**：プロフィール・実績データを柔軟に扱えるようにモデルを最適化
- **Firebase Auth の安全な導入**：認証情報は `.env.local` に隠蔽し、GitHub に流出しないよう管理
- **バックエンドの Docker 化**：PostgreSQL を Docker 上で構築し、環境差異をなくす
- **CORS 設定の最適化**：フロント（localhost:3000）との通信を安全に許可
- **App Router の活用**：Next.js 14 の最新構成でページ管理をシンプルに

## 🛠 セットアップ方法（開発環境）

### 1. 依存関係のインストール

```bash
cd frontend
npm install

cd ../backend
npm install
```

### 2. Docker 起動

```bash
docker-compose up -d
```

### 3. Prisma マイグレーション

```bash
cd backend
npx prisma migrate dev
```

### 4. フロント起動

```bash
cd frontend
npm run dev
```

## 👤 作者

**Yumiko Takeuchi**
Web開発・UI設計・ポートフォリオ制作が好きです。

## 🔗 リンク

- GitHub リポジトリ
- デプロイ後にサイトURLを追記予定
