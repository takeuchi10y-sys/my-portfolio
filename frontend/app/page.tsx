import Link from "next/link";
import Image from "next/image"; // ✨ 写真を表示するために追加

export default function Home() {
  // ✨ デモ用のダミーデータをMyIRの内容（Photoshop画像）に置き換え
  const profile = {
    name: "Yumiko Takeuchi",
    title: "Full Stack Engineer (Candidate)",
    story: {
      past: {
        title: "過去",
        desc: "これまで行ってきたことや経歴、人柄がわかるものなど",
        items: [
          "静岡育ち",
          "国際関係学部の日本文化専攻",
          "熱海の旅館と、生命保険会社での勤務経験あり",
          "子供用に髪飾りを作るのが楽しみ",
        ],
      },
      present: {
        title: "現在",
        desc: "今頑張っていること、大事にしている考え、譲れない軸など",
        items: [
          "自信を持って働ける自分になる",
          "今の私と家族を豊かにする",
          "考えて話す",
        ],
      },
      future: {
        title: "未来",
        desc: "これからどんな人間になっていきたいか、成し遂げたいこと、野望やビジョンなど",
        items: [
          "社会でも、会社でも、特定の人でも、とにかく役に立てるようになりたい。",
          "自分のことを好きになりたい。",
          "経済力をつけ、まるごと自立した人になる。",
        ],
      },
    },
  };

  const skills = [
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Node.js",
    "Express",
    "Prisma",
  ];

  // ProjectsはひとまずMyIRそのものと、ハッカソンの成果物にしてみます
  const projects = [
    {
      id: "1",
      title: "MyIR (自己紹介ツール)",
      tech: "Photoshop (Design)",
      desc: "自分自身の『過去・現在・未来』を言語化し、相手に伝えるための自己紹介ツール。",
    },
    {
      id: "2",
      title: "ハッカソン・ポートフォリオ",
      tech: "Next.js / Express",
      desc: "MyIRの概念をWeb上に実装した、管理機能付きのフルスタック・ポートフォリオサイト。",
    },
  ];

  return (
    <div className="min-h-screen bg-[#d1fae5] text-gray-900">
      {/* ナビゲーションバー */}
      <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center fixed top-0 w-full z-50">
        <h1 className="text-xl font-bold tracking-tight">Yumiko's MyIR</h1>
        <div className="space-x-6">
          <Link href="/" className="hover:text-blue-600 font-medium">
            Top
          </Link>
          <Link href="/contact" className="hover:text-blue-600 font-medium">
            Contact
          </Link>
        </div>
      </nav>

      {/* メインコンテンツ (ヘッダーと被らないように余白を追加) */}
      <main className="max-w-6xl mx-auto px-4 pt-28 pb-16 space-y-16">
        {/* ✨ プロフィールセクション (MyIR 3カラム仕様) */}
        <section className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden">
          {/* MyIRの背景風のグラデーションをTailwindで再現 */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#e0f2fe] via-[#f3e8ff] to-[#ccfbf1] opacity-70"></div>

          <div className="relative z-10 space-y-10">
            {/* ヘッダーエリア (名前と写真) */}
            <div className="flex justify-between items-center pb-6 border-b border-gray-100">
              <div>
                <h2 className="text-sm font-semibold text-blue-700 uppercase tracking-wider mb-2">
                  MYIR
                </h2>
                <h3 className="text-4xl font-extrabold tracking-tight text-gray-900">
                  Yumiko Takeuchi
                </h3>
                <p className="text-lg text-gray-500 mt-2 font-medium">
                  Full Stack Engineer (Candidate)
                </p>
              </div>

              {/* 👇 ここをダミー枠から本物の画像タグに書き換え！ */}
              <div className="relative w-28 h-28 rounded-full overflow-hidden shadow-md border-4 border-white bg-white/50 flex-shrink-0">
                <Image
                  src="/profile.jpg"
                  alt="Yumiko Takeuchi"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>

            {/* ✨過去・現在・未来の3カラムエリア */}
            <div className="grid md:grid-cols-3 gap-8">
              {[
                profile.story.past,
                profile.story.present,
                profile.story.future,
              ].map((story) => (
                <div
                  key={story.title}
                  className="bg-white/70 p-6 rounded-2xl border border-white/50 backdrop-blur-sm shadow-inner"
                >
                  <h4 className="text-xl font-bold mb-3 text-center text-gray-800 border-b pb-2 border-gray-100">
                    {story.title}
                  </h4>
                  <p className="text-xs text-gray-400 mb-5 text-center leading-relaxed h-10">
                    {story.desc}
                  </p>
                  <ul className="space-y-3.5 text-sm text-gray-700 list-disc list-inside px-1">
                    {story.items.map((item, index) => (
                      <li
                        key={index}
                        className="leading-relaxed pl-1 -indent-5"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* スキルセクション (以前のまま) */}
        <section>
          <h2 className="text-2xl font-bold mb-6 border-b pb-2 border-gray-200">
            Skills
          </h2>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium text-sm border border-blue-100"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* 実績セクション (MyIRをProjectsとして掲載) */}
        <section>
          <h2 className="text-2xl font-bold mb-6 border-b pb-2 border-gray-200">
            Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold mb-2">{project.title}</h3>
                  <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md mb-3 inline-block">
                    {project.tech}
                  </span>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {project.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      {/* 底部フッター（管理者画面への隠し入り口） */}
      <footer className="text-center py-8 text-xs text-gray-400 border-t border-gray-100 bg-white mt-16">
        <p>© 2026 Yumiko Takeuchi. All Rights Reserved.</p>
        {/* こっそりログイン画面へのリンクを配置（見た目は普通の文字に見えるように） */}
        <Link
          href="/admin/login"
          className="mt-1 inline-block text-[10px] text-gray-300 hover:text-blue-400 transition-colors"
        >
          ⚙️
        </Link>
      </footer>
    </div>
  );
}
