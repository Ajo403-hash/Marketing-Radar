"use client";

import { useEffect, useMemo, useState } from "react";
import { articles, type Article } from "./articles";

const sectionMeta: Record<string, [string, string]> = {
  daily: ["Daily Pick", "每日精选 · Three essential reads for busy marketers"],
  ai: ["AI Marketing", "AI 营销 · Tools, ad tech and workflow transformation"],
  social: ["Social Media", "社交媒体 · Reusable strategies and focused brand cases"],
  brand: ["Brand Highlights", "品牌动态 · Campaigns and emerging D2C brands"],
  saved: ["Saved Articles", "文章清单 · Your personal reading list"],
  inspirationList: ["Inspiration List", "灵感清单 · Ideas saved for future exploration"],
  brandList: ["Brand List", "品牌清单 · Brands saved for future exploration"],
};

const sectionFilters: Record<string, string[]> = {
  ai: ["AI marketing tools", "Ad tech"],
  social: ["Social Media Strategy", "Social Media Case Study"],
  brand: ["Brand campaign", "D2C highlight"],
};

const categories = [
  ["daily", "Daily Pick", "每日精选"],
  ["ai", "AI Marketing", "AI 营销"],
  ["social", "Social Media", "社交媒体"],
  ["brand", "Brand Highlights", "品牌动态"],
];

const angles = [
  {
    title: "Live creators need a clipping operation, not just a sponsorship deal",
    points: [
      "Use Expedia and IShowSpeed to explain why real-time clipping turns one livestream into a cross-platform media program.",
      "Map what a creator partnership needs before launch: natural category fit, a story arc and distribution roles.",
      "Give marketers a planning brief that protects authenticity while preparing for unpredictable live moments.",
    ],
  },
  {
    title: "Virtual try-on is moving from a visual trick to conversion infrastructure",
    points: [
      "Use the DRESSX shopper data to show where visualization can reduce purchase uncertainty in fashion ecommerce.",
      "Separate promising conversion signals from vendor claims that still require a brand’s own incrementality test.",
      "Give marketers a checklist for measuring try-on across product exploration, cart behavior, purchase and returns.",
    ],
  },
  {
    title: "ChatGPT ads are a learning channel before they are a scale channel",
    points: [
      "Use Bark and ButcherBox to show how existing AI-user questions can define an early test audience.",
      "Separate promising clicks and traffic from evidence of incrementality and scalable media performance.",
      "Give marketers an experimentation checklist for intent, tracking, control and the decision to expand or stop.",
    ],
  },
  {
    title: "Reddit visibility is becoming part community strategy, part AI search strategy",
    points: [
      "Use The Goat Agency’s Reddit discussion to explain why useful community participation can travel into search and AI-generated answers.",
      "Separate organic contribution from paid activation and show where each approach earns trust.",
      "Give marketers a research-first checklist for entering a subreddit without behaving like an advertiser.",
    ],
  },
  {
    title: "A heritage refresh starts by giving a familiar benefit new social meaning",
    points: [
      "Use Hanes to show how “comfort” can shift from a fabric claim into a confidence platform.",
      "Connect the new identity, awkward scenarios and media plan to one recognizable brand behavior.",
      "Give established brands a prompt for finding the human outcome behind a table-stakes product benefit.",
    ],
  },
  {
    title: "“Stronger, not smaller” is a lesson in choosing capability over correction",
    points: [
      "Use Ladder to show how an optimistic promise can challenge misinformation without shaming the audience.",
      "Connect Hilary Duff, branded print and the quiz-cab activation to the same strategic job.",
      "Ask creators to rewrite one restrictive category message around what the customer becomes able to do.",
    ],
  },
  {
    title: "Purely Elizabeth proves a functional launch does not need functional advertising",
    points: [
      "Show how category satire made a natural-ingredient protein claim more distinctive than another performance promise.",
      "Connect creator commerce, experiential sampling and live sports to the brand’s younger growth audience.",
      "Offer a framework for finding the cultural excess a challenger brand is uniquely qualified to challenge.",
    ],
  },
  {
    title: "Nostalgia grows when brands know what not to modernize",
    points: [
      "Compare Spangler’s careful restoration of Bit-O-Honey and Sweethearts with its decision to leave Necco largely alone.",
      "Explain selective modernization: protect emotional and sensory memory while updating weak points in relevance.",
      "Give marketers a three-column audit for heritage assets to preserve, restore or refresh.",
    ],
  },
  {
    title: "The best inclusive campaign makes more people feel expert, not merely represented",
    points: [
      "Use The Gist’s sports academy to show how an exclusive symbol can be creatively reversed.",
      "Explain how multiple fan archetypes give casual and committed audiences different routes into the same promise.",
      "Turn shares, reposts and recognition comments into a practical early measurement framework.",
    ],
  },
];

const brands = [
  { name: "Bark", reason: "It is testing ChatGPT ads where parents already express high-intent safety questions, while building its own measurement discipline.", url: "https://www.bark.us" },
  { name: "Expedia", reason: "Its IShowSpeed partnership shows how long-term creator relationships can become a social-first content system.", url: "https://www.expedia.com" },
  { name: "Hanes", reason: "It is making a heritage basics benefit culturally distinctive by turning comfort into visible confidence.", url: "https://www.hanes.com" },
  { name: "Michaels", reason: "Ask Mike remains worth watching as a customer-facing AI implementation with a strong early conversion signal.", url: "https://www.michaels.com" },
];

function defaultFilter(section: string) {
  return sectionFilters[section]?.[0] ?? "";
}

const briefContext: Record<Article["category"], [string, string]> = {
  ai: [
    "The wider context is a marketing industry moving from isolated AI experiments toward accountable systems embedded in everyday work. That makes implementation details—data quality, measurement, governance, review and the division of responsibility between people and software—more important than novelty. The article describes the development as part of that operational shift, where a useful capability must connect to an outcome a team can observe and manage.",
    "更广泛的背景是，营销行业正从孤立的 AI 实验转向嵌入日常工作的、可被问责的系统。因此，数据质量、衡量、治理、审核以及人员与软件之间的职责划分，比技术的新奇程度更重要。文章把这一变化视为运营方式转型的一部分：真正有用的能力必须连接到团队能够观察和管理的业务结果。",
  ],
  social: [
    "The article also reflects a broader change in social marketing. Brands are moving away from treating creators and platforms as simple distribution and are using them earlier in research, concept development and production. Cultural specificity, credible participation and a format people naturally want to share are becoming more valuable than a generic campaign adapted after the fact for every channel.",
    "文章也反映了社交营销更广泛的变化。品牌不再只把创作者和平台当作分发渠道，而是让它们更早参与研究、概念开发与内容制作。具有文化针对性的洞察、可信的参与者，以及人们自然愿意分享的内容形式，正在变得比事后把同一活动简单改编到所有渠道更有价值。",
  ],
  brand: [
    "In the wider brand context, the story shows why a campaign needs both a recognizable idea and a reason to matter now. Familiar brand assets, cultural references or ambassadors provide an entry point, but the execution must make them newly participatory and relevant. The article follows how the brand connects its existing meaning with a current audience behavior rather than pursuing attention through an unrelated stunt.",
    "从更广泛的品牌语境来看，这个案例说明一项活动既要有清晰可识别的创意，也要回答“为什么是现在”。熟悉的品牌资产、文化符号或代言人可以成为入口，但执行必须让它们以新的方式具备参与感和当下相关性。文章呈现了品牌如何把既有意义连接到当前受众行为，而不是通过无关噱头获取注意力。",
  ],
};

const briefConclusion: Record<string, [string, string]> = {
  "AI marketing tools": [
    "Taken together, the reported details point to a practical test for adoption: whether the system improves a defined part of the workflow without making accuracy, oversight or environmental cost harder to understand. The opportunity is meaningful, but the article keeps the focus on disciplined use rather than output volume alone.",
    "综合文章中的信息，一个实际的采用标准是：系统是否改善了明确的工作环节，同时没有让准确性、监督或环境成本变得更难理解。机会确实存在，但文章强调的重点是有纪律的使用，而不是单纯增加输出数量。",
  ],
  "Ad tech": [
    "For advertisers, the immediate significance is greater control over how an emerging capability enters planning, creative production and measurement. The article does not present the change as a finished replacement for established channels. Instead, it shows a format becoming testable enough to enter a structured media or production experiment, with clear objectives and evidence required before scale.",
    "对广告主而言，最直接的意义是能够更有控制地把新能力纳入规划、创意制作和衡量。文章并未把这一变化描述为成熟渠道的替代品，而是说明这种形式已经足够进入结构化的媒体或制作测试：先设定清晰目标，以证据决定是否扩大投入。",
  ],
  "Social Media Strategy": [
    "The practical value is a reusable operating principle rather than a campaign to imitate. The article explains how teams can translate changing platform behavior into research routines, content decisions, engagement standards and measurement. It belongs in the strategy section because its lessons can be applied across brands, with platform context treated as an input rather than the whole idea.",
    "它的实际价值是一套可重复使用的运营原则，而不是一个需要照搬的活动。文章说明团队如何把不断变化的平台行为转化为研究流程、内容决策、互动规范与衡量方式。它属于策略板块，因为其中的经验可被不同品牌应用，平台语境是重要输入，但不是创意本身的全部。",
  ],
  "Social Media Case Study": [
    "The case is useful because it connects one brand’s social choices to its audience, business constraints and growth model. Rather than extracting a single viral tactic, the article reveals how content roles, creators, community participation and offline activity reinforce one another. That makes the result a source of strategic inspiration without pretending another brand can copy the visible execution unchanged.",
    "这个案例的价值在于，它把单一品牌的社交选择与受众、业务限制和增长模式连接起来。文章不是只提取一个病毒式战术，而是呈现内容角色、创作者、社群参与和线下活动如何彼此加强。因此，它可以带来策略灵感，同时不会误导其他品牌原样复制表面执行。",
  ],
  "Brand campaign": [
    "The campaign’s value lies in the way each element supports the same central story. Product, partnership, media format and cultural timing are not treated as separate tactics. That coherence makes the idea easier for audiences to recognize and for the brand to extend, while still leaving enough novelty to earn attention around the launch.",
    "这项活动的价值在于所有元素都服务于同一个核心故事。产品、合作伙伴、媒体形式和文化时机并非彼此独立的战术。这种一致性让受众更容易识别创意，也便于品牌继续延展，同时仍保留足够的新鲜感来获得发布期的关注。",
  ],
};

function ArticleCard({
  article,
  saved,
  onRead,
  onSave,
}: {
  article: Article;
  saved: boolean;
  onRead: () => void;
  onSave: () => void;
}) {
  return (
    <article className={`articleCard ${article.daily ? "dailyArticle" : ""}`}>
      <div className="articleMeta">
        <span>{article.source}</span>
        <span>{article.date}</span>
        {article.platforms?.map((platform) => <span className="platformTag" key={platform}>{platform}</span>)}
        {article.daily && <b>DAILY PICK</b>}
      </div>
      <button className="articleHeadline" onClick={onRead}>
        <strong>{article.title}</strong>
        <span>{article.titleZh}</span>
      </button>
      <button className="topicPreview" onClick={onRead}>
        <div>
          <p>{article.summary}</p>
          <p className="summaryZh">{article.summaryZh ?? article.titleZh}</p>
        </div>
      </button>
      <div className="articleActions">
        <button className="readBrief" onClick={onRead}>Read article brief →</button>
        <button className={saved ? "saved" : ""} onClick={onSave}>
          {saved ? "Remove" : "Save ○"}
        </button>
      </div>
    </article>
  );
}

function Reader({ article, onBack }: { article: Article; onBack: () => void }) {
  return (
    <main className="readerPage">
      <header className="readerTop">
        <button onClick={onBack}>← Back to Marketing Radar</button>
        <span>{article.source} · {article.date}</span>
      </header>
      <article className="readerArticle">
        <p className="kicker">{article.subcategory}</p>
        <h1>{article.title}</h1>
        <h2>{article.titleZh}</h2>
        <section>
          <h2>Article brief · 文章摘要</h2>
          <p>{article.summary}</p>
          <p>{article.digest ?? article.summary}</p>
          <p>{briefContext[article.category][0]}</p>
          <p>{briefConclusion[article.subcategory]?.[0]}</p>
          <div className="chineseBrief">
            <p>{article.summaryZh ?? article.titleZh}</p>
            <p>{article.digestZh ?? article.summaryZh ?? article.titleZh}</p>
            <p>{briefContext[article.category][1]}</p>
            <p>{briefConclusion[article.subcategory]?.[1]}</p>
          </div>
        </section>
        <footer className="readerSource">
          <p>This digest is an editorial interpretation designed to save reading time.</p>
          <a href={article.url} target="_blank" rel="noreferrer">
            Read the complete original article on {article.source} ↗
          </a>
        </footer>
        <button className="readerBottomBack" onClick={onBack}>← Back to Marketing Radar</button>
      </article>
    </main>
  );
}

export default function Home() {
  const [section, setSection] = useState("daily");
  const [filter, setFilter] = useState("");
  const [query, setQuery] = useState("");
  const [reader, setReader] = useState<number | null>(null);
  const [openAngle, setOpenAngle] = useState<number | null>(null);
  const [anglePage, setAnglePage] = useState(0);
  const [about, setAbout] = useState(false);
  const [saved, setSaved] = useState<number[]>([1, 6, 9]);
  const [savedAngles, setSavedAngles] = useState<typeof angles>([]);
  const [savedBrands, setSavedBrands] = useState<typeof brands>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const articleData = localStorage.getItem("marketing-radar-articles");
      const angleData = localStorage.getItem("marketing-radar-inspirations");
      const brandData = localStorage.getItem("marketing-radar-brands");
      if (articleData) setSaved(JSON.parse(articleData));
      if (angleData) setSavedAngles(JSON.parse(angleData));
      if (brandData) setSavedBrands(JSON.parse(brandData));
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("marketing-radar-articles", JSON.stringify(saved));
    localStorage.setItem("marketing-radar-inspirations", JSON.stringify(savedAngles));
    localStorage.setItem("marketing-radar-brands", JSON.stringify(savedBrands));
  }, [hydrated, saved, savedAngles, savedBrands]);

  const chooseSection = (next: string) => {
    setSection(next);
    setFilter(defaultFilter(next));
    setReader(null);
    setAbout(false);
  };

  const visible = useMemo(() => {
    let list =
      section === "daily"
        ? articles.filter((article) => article.daily)
        : section === "saved"
          ? articles.filter((article) => saved.includes(article.id))
          : articles.filter((article) => article.category === section);
    if (filter) list = list.filter((article) => article.subcategory === filter);
    if (query.trim()) {
      const needle = query.toLowerCase();
      list = list.filter((article) =>
        `${article.title} ${article.titleZh} ${article.summary} ${article.source}`
          .toLowerCase()
          .includes(needle),
      );
    }
    return list;
  }, [section, filter, query, saved]);

  const selectedArticle = articles.find((article) => article.id === reader);
  if (selectedArticle) return <Reader article={selectedArticle} onBack={() => setReader(null)} />;
  if (about) return (
    <main className="readerPage">
      <header className="readerTop"><button onClick={() => setAbout(false)}>← Back to Marketing Radar</button></header>
      <article className="readerArticle aboutPage">
        <p className="kicker">ABOUT THE CREATOR · 关于创作者</p>
        <h1>Hi, my name is Jo.</h1>
        <p>This platform is created for marketers to receive the most advanced AI marketing trends and daily brand marketing inspirations.</p>
        <p>I am a solo marketer with 10+ years experience and hands-on practice in fortune 500 global companies. I help brands find out what&apos;s blocking them and turn it into their breakthrough.</p>
        <section className="creatorContact">
          <div><h2>Contact me</h2><p>Scan the WeChat QR code to start a conversation.</p></div>
          <div className="qrPlaceholder"><span>WECHAT</span><b>QR CODE</b><small>PLACEHOLDER</small></div>
        </section>
      </article>
    </main>
  );

  const meta = sectionMeta[section] ?? sectionMeta.daily;
  const resultTotal = section === "inspirationList" ? savedAngles.length : section === "brandList" ? savedBrands.length : visible.length;
  const anglesPerPage = 3;
  const anglePageCount = Math.ceil(angles.length / anglesPerPage);
  const visibleAngles = angles.slice(anglePage * anglesPerPage, (anglePage + 1) * anglesPerPage);
  const regenerateAngles = () => {
    setAnglePage((current) => (current + 1) % anglePageCount);
    setOpenAngle(null);
  };

  return (
    <main className="siteShell">
      <header className="masthead">
        <button className="wordmark" onClick={() => chooseSection("daily")}>
          <span className="radarDot" />
          <span><b>Marketing Radar</b><small>Powered by Inflexa</small></span>
        </button>
        <div className="headline">
          <p>SATURDAY · 15 AUGUST 2026</p>
          <h1>Your signal in the marketing noise.</h1>
          <span>
            A quiet daily reading room for marketers and creators who need useful
            strategies, important platform shifts and brands worth watching—without
            spending hours in the feed.
          </span>
        </div>
        <label className="topSearch">
          <span className="searchIcon">⌕</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the radar" />
          {query && <button onClick={() => setQuery("")}>×</button>}
        </label>
      </header>

      <div className="dashboard">
        <aside className="leftNav">
          <div className="radarTitle"><span>START HERE</span></div>
          {categories.map(([id, en, zh]) => (
            <button key={id} className={`mainNavItem ${section === id ? "active" : ""}`} onClick={() => chooseSection(id)}>
              <span><b>{en}</b><small>{zh}</small>
                {id === "daily" && <em>Three essential signals before your first coffee.</em>}
                {id === "daily" && <mark>ABOUT 7 MIN</mark>}
              </span>
              <i>{articles.filter((a) => id === "daily" ? a.daily : a.category === id).length}</i>
            </button>
          ))}
          <div className="utilityNav">
            <button className={section === "saved" ? "active" : ""} onClick={() => chooseSection("saved")}>
              <span><b>Saved Articles</b><small>文章清单</small></span><i>{saved.length}</i>
            </button>
            <button className={section === "inspirationList" ? "active" : ""} onClick={() => chooseSection("inspirationList")}>
              <span><b>Inspiration List</b><small>灵感清单</small></span><i>{savedAngles.length}</i>
            </button>
            <button className={section === "brandList" ? "active" : ""} onClick={() => chooseSection("brandList")}>
              <span><b>Brand List</b><small>品牌清单</small></span><i>{savedBrands.length}</i>
            </button>
          </div>
          <button className="editorNote brandItem" onClick={() => setAbout(true)}>
            <strong>ABOUT THE CREATOR</strong><p>Meet Jo, the solo marketer behind the radar.</p><span>Explore more →</span>
          </button>
        </aside>

        <section className="articleArea">
          <div className="sectionHeader">
            <div><p>CURATED MARKETING INTELLIGENCE</p><h2>{meta[0]}</h2><span>{meta[1]}</span></div>
            <div className="resultCount">{resultTotal}<span>{section === "inspirationList" ? "IDEAS" : section === "brandList" ? "BRANDS" : "ARTICLES"}</span></div>
          </div>

          {section === "daily" && (
            <div className="newsletterIntro">
              <span>THE DAILY LETTER · 15 AUGUST 2026</span>
              <h3>Good morning. Here are the three signals worth carrying into your work today.</h3>
              <p>One shift in AI media, one fresh social idea and one brand move—edited for a focused seven-minute read.</p>
            </div>
          )}

          {sectionFilters[section] && (
            <div className="filterBars">
              {sectionFilters[section].map((item) => (
                <button className={filter === item ? "active" : ""} onClick={() => setFilter(item)} key={item}>
                  {item}<span>{articles.filter((a) => a.subcategory === item).length}</span>
                </button>
              ))}
            </div>
          )}

          {section === "inspirationList" && (
            <div className="collectionList">
              {savedAngles.length === 0 && <p className="emptyState">Your saved content inspirations will stay here when tomorrow&apos;s edition arrives.</p>}
              {savedAngles.map((angle) => (
                <article className="collectionCard" key={angle.title}><span>CONTENT INSPIRATION</span><h3>{angle.title}</h3><ul>{angle.points.map((point) => <li key={point}>{point}</li>)}</ul><button onClick={() => setSavedAngles((current) => current.filter((item) => item.title !== angle.title))}>Remove</button></article>
              ))}
            </div>
          )}

          {section === "brandList" && (
            <div className="collectionList">
              {savedBrands.length === 0 && <p className="emptyState">Brands saved for later exploration will stay here when tomorrow&apos;s edition arrives.</p>}
              {savedBrands.map((brand) => (
                <article className="collectionCard" key={brand.name}><span>BRAND TO WATCH</span><h3>{brand.name}</h3><p>{brand.reason}</p><div><a href={brand.url} target="_blank" rel="noreferrer">Explore more ↗</a><button onClick={() => setSavedBrands((current) => current.filter((item) => item.name !== brand.name))}>Remove</button></div></article>
              ))}
            </div>
          )}

          {!["inspirationList", "brandList"].includes(section) && <div className="articleList">
            {visible.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                saved={saved.includes(article.id)}
                onRead={() => { setReader(article.id); window.scrollTo(0, 0); }}
                onSave={() => setSaved((current) =>
                  current.includes(article.id) ? current.filter((id) => id !== article.id) : [...current, article.id],
                )}
              />
            ))}
          </div>}
        </section>

        <aside className="insightRail">
          <section>
            <div className="railHeading"><span>CONTENT INSPIRATION FOR TODAY</span><b>03</b></div>
            <div className="inspirationRefresh">
              <span>{anglePage * anglesPerPage + 1}–{anglePage * anglesPerPage + visibleAngles.length} of {angles.length} ideas</span>
              <button onClick={regenerateAngles}>
                {anglePage === anglePageCount - 1 ? "Start over ↻" : "Regenerate inspirations ↻"}
              </button>
            </div>
            {visibleAngles.map((angle, index) => (
              <div className="opportunity" key={angle.title}>
                <button onClick={() => setOpenAngle(openAngle === index ? null : index)}>
                  <span>{String(anglePage * anglesPerPage + index + 1).padStart(2, "0")}</span>
                  <strong>{angle.title}</strong>
                  <i>{openAngle === index ? "−" : "+"}</i>
                </button>
                {openAngle === index && (
                  <ul>{angle.points.map((point) => <li key={point}>{point}</li>)}</ul>
                )}
                <button className={`railSave ${savedAngles.some((item) => item.title === angle.title) ? "saved" : ""}`} onClick={() => setSavedAngles((current) => current.some((item) => item.title === angle.title) ? current.filter((item) => item.title !== angle.title) : [...current, angle])}>
                  {savedAngles.some((item) => item.title === angle.title) ? "Saved · Remove" : "Save to inspiration list"}
                </button>
              </div>
            ))}
          </section>

          <section className="watchlist">
            <div className="railHeading"><span>BRANDS TO WATCH</span><b>04</b></div>
            {brands.map((brand) => (
              <div className="brandItem" key={brand.name}>
                <strong>{brand.name}</strong><p>{brand.reason}</p>
                <div className="brandActions"><a href={brand.url} target="_blank" rel="noreferrer">Explore more ↗</a><button className={savedBrands.some((item) => item.name === brand.name) ? "saved" : ""} onClick={() => setSavedBrands((current) => current.some((item) => item.name === brand.name) ? current.filter((item) => item.name !== brand.name) : [...current, brand])}>{savedBrands.some((item) => item.name === brand.name) ? "Saved · Remove" : "Save to brand list"}</button></div>
              </div>
            ))}
          </section>

          <section className="ratingModel">
            <div className="railHeading"><span>SELECTION MODEL</span><b>100</b></div>
            {[
              ["30%", "Tech impact"], ["30%", "Strategy value"], ["20%", "Brand impact"],
              ["10%", "Source credibility"], ["10%", "Recency"],
            ].map(([weight, label]) => <div key={label}><strong>{weight}</strong><span>{label}</span></div>)}
          </section>
        </aside>
      </div>
    </main>
  );
}
