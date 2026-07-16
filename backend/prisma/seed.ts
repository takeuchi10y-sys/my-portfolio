import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 シードデータの投入を開始します...");

  await prisma.profile.deleteMany();

  const profile = await prisma.profile.create({
    data: {
      name: "Yumiko Takeuchi",
      title: "Full Stack Engineer (Candidate)",
      past: "静岡育ち。国際関係学の日本文化専攻。熱海の旅館と、生命保険会社での勤務経験あり。子供用に髪飾りを作るのが楽しみ。",
      present:
        "自信を持って働ける自分になる。今の私と家族を豊かにする。考えて話す。",
      future:
        "社会でも、会社でも、特定の人でも、とにかく役に立てるようになりたい。自分のことを好きになりたい。経済力をつけ、まるごと自立した人になる。",
      avatarUrl: "/profile.jpg",
      skills: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Node.js",
        "Express",
        "Prisma",
      ],
      projects: ["MyIR"],
    },
  });

  console.log("✅ シードデータの投入が成功しました！", profile);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
