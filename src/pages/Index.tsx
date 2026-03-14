import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const SECTIONS = [
  { id: "home", label: "Главная" },
  { id: "schedule", label: "Программа" },
  { id: "conditions", label: "Условия" },
  { id: "nominations", label: "Номинации" },
  { id: "criteria", label: "Критерии" },
  { id: "important", label: "Важно" },
  { id: "fees", label: "Взносы" },
  { id: "contacts", label: "Контакты" },
];

const SHOW_NOMINATIONS = [
  {
    id: "ladies-pro",
    tag: "SHOW",
    title: "Ladies Show PRO",
    level: "Продвинутый",
    levelColor: "#e8151b",
    desc: "Номинация включает в себя все женские стили на каблуках: frame up, стрип, high heels. Pro — танцоры, которые занимаются на постоянной основе; опытные танцоры, имеющие хорошую технику исполнения; сложная постановка номера.",
  },
  {
    id: "ladies-beg",
    tag: "SHOW",
    title: "Ladies Show BEGINNERS",
    level: "Начинающий",
    levelColor: "#888",
    desc: "Номинация включает в себя все женские стили на каблуках: frame up, стрип, high heels. Хореограф не участвует в номере. Beginners — начинающие танцоры, имеющие маленький танцевальный опыт. Лёгкая постановка.",
  },
  {
    id: "best-show",
    tag: "SHOW",
    title: "Best Dance Show",
    level: "Любой",
    levelColor: "#888",
    desc: "Номинация включает в себя любые стили, но команда выступает без каблуков.",
  },
];

const DUET_NOMINATIONS = [
  {
    id: "duet",
    tag: "DUET",
    title: "Duet",
    level: "Любой",
    levelColor: "#888",
    desc: "Номинация для дуэтных исполнителей любого стиля танца.",
  },
];

const SOLO_NOMINATIONS = [
  {
    id: "solo-pro",
    tag: "SOLO",
    title: "Best Solo PRO",
    level: "Продвинутый",
    levelColor: "#e8151b",
    desc: "Номинация для сольных исполнителей продвинутого уровня.",
  },
  {
    id: "solo-beg",
    tag: "SOLO",
    title: "Best Solo BEGINNER",
    level: "Начинающий",
    levelColor: "#888",
    desc: "Номинация для сольных исполнителей категории начинающие. Исключает участие действующих педагогов, а также танцоров продвинутого уровня.",
  },
  {
    id: "solo-men",
    tag: "SOLO",
    title: "Best Solo MEN",
    level: "Мужчины",
    levelColor: "#888",
    desc: "Номинация для сольных исполнителей мужского пола.",
  },
];

const ALL_NOM_IDS = [...SHOW_NOMINATIONS, ...DUET_NOMINATIONS, ...SOLO_NOMINATIONS].map((n) => n.id);
const SOLO_IDS = SOLO_NOMINATIONS.map((n) => n.id);

function calcFee(selected: string[]): number {
  const soloSelected = selected.filter((id) => SOLO_IDS.includes(id));
  const nonSoloSelected = selected.filter((id) => !SOLO_IDS.includes(id));
  let total = 0;
  soloSelected.forEach(() => (total += 2000));
  if (nonSoloSelected.length === 1) total += 1500;
  else if (nonSoloSelected.length === 2) total += 2500;
  else if (nonSoloSelected.length >= 3) total += 3500;
  return total;
}

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedNoms, setSelectedNoms] = useState<string[]>([]);
  const [form, setForm] = useState({
    teamName: "",
    leader: "",
    phone: "",
    email: "",
    city: "",
    members: "",
    comment: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 100;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(SECTIONS[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  const toggleNom = (id: string) => {
    setSelectedNoms((prev) =>
      prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const fee = calcFee(selectedNoms);

  return (
    <div className="min-h-screen scrollbar-dark" style={{ background: "var(--black)", color: "var(--white)" }}>

      {/* ── NAV ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12"
        style={{
          height: "64px",
          background: "rgba(13,13,13,0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(232,21,27,0.15)",
        }}
      >
        <button
          onClick={() => scrollTo("home")}
          className="font-oswald font-bold tracking-widest text-sm"
          style={{ color: "var(--red)" }}
        >
          HOTTIE FEST
        </button>

        <div className="hidden md:flex items-center gap-7">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={`nav-link ${activeSection === s.id ? "active" : ""}`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ color: "var(--white)" }}>
          <Icon name={menuOpen ? "X" : "Menu"} size={22} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col pt-20 px-8 gap-5"
          style={{ background: "rgba(13,13,13,0.98)" }}
        >
          {SECTIONS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className="font-oswald text-2xl font-light tracking-widest text-left animate-fade-in"
              style={{
                color: activeSection === s.id ? "var(--red)" : "var(--white)",
                animationDelay: `${i * 0.05}s`,
                opacity: 0,
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}

      {/* ── HERO ── */}
      <section
        id="home"
        className="hero-grid relative flex flex-col items-center justify-center text-center min-h-screen px-6"
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden>
          <span
            className="font-oswald font-black"
            style={{ fontSize: "clamp(120px, 30vw, 360px)", color: "rgba(232,21,27,0.04)", letterSpacing: "-0.02em" }}
          >
            2026
          </span>
        </div>

        <div className="relative z-10 animate-fade-in" style={{ opacity: 0 }}>
          <div className="tag-red mb-6">Сургут · 30–31 мая</div>
          <h1
            className="font-oswald font-black mb-4"
            style={{ fontSize: "clamp(52px, 12vw, 130px)", lineHeight: 0.9, letterSpacing: "-0.01em" }}
          >
            HOTTIE<br />
            <span style={{ color: "var(--red)" }}>FEST</span>
          </h1>
          <p className="font-golos text-base md:text-lg mb-2" style={{ color: "var(--gray)" }}>
            Танцевальный чемпионат
          </p>
          <p className="font-oswald font-light tracking-widest text-sm mb-10" style={{ color: "rgba(255,255,255,0.4)" }}>
            РК BABYLON · ул. Профсоюзов, 55
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              className="btn-red px-10 py-3 text-sm font-semibold tracking-widest"
              onClick={() => window.open("https://docs.google.com/forms/d/e/1FAIpQLSd15tsg4PDLzwmAMELevZQkFgS-tGo3NgHutRNOt50_PwM4tA/viewform?usp=dialog", "_blank")}
            >
              Зарегистрироваться
            </button>
            <button
              className="btn-outline-red px-8 py-3 text-sm tracking-widest"
              onClick={() => scrollTo("nominations")}
            >
              Номинации
            </button>
          </div>
        </div>

        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in"
          style={{ opacity: 0, animationDelay: "0.8s" }}
        >
          <span className="font-oswald text-xs tracking-widest" style={{ color: "var(--gray)" }}>ЛИСТАЙ</span>
          <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, var(--red), transparent)" }} />
        </div>
      </section>

      {/* ── SCHEDULE ── */}
      <section id="schedule" className="py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto">
          <SectionHeader number="01" title="Программа" />
          <div className="grid md:grid-cols-2 gap-5 mt-12">
            <div className="p-8" style={{ background: "var(--black-card)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="tag-red mb-5 inline-block">30 мая</div>
              <h3 className="font-oswald text-2xl font-semibold mb-3 tracking-wide">Мастер-классы</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--gray)" }}>Мастер-классы по хореографии</p>
              <div className="mt-6 flex items-center gap-2" style={{ color: "rgba(255,255,255,0.3)" }}>
                <Icon name="MapPin" size={14} fallback="Star" />
                <span className="text-xs tracking-wide">Fitness Plaza · ул. Университетская, 25а</span>
              </div>
            </div>
            <div className="p-8" style={{ background: "var(--black-card)", border: "1px solid rgba(232,21,27,0.25)" }}>
              <div className="tag-red mb-5 inline-block">31 мая · 17:00</div>
              <h3 className="font-oswald text-2xl font-semibold mb-3 tracking-wide">Чемпионат</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--gray)" }}>Главное танцевальное событие весны. Все номинации, финалы, награждение.</p>
              <div className="mt-6 flex items-center gap-2" style={{ color: "rgba(255,255,255,0.3)" }}>
                <Icon name="MapPin" size={14} fallback="Star" />
                <span className="text-xs tracking-wide">РК BABYLON · ул. Профсоюзов, 55</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider-red mx-12 md:mx-24" />

      {/* ── CONDITIONS ── */}
      <section id="conditions" className="py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto">
          <SectionHeader number="02" title="Условия участия" />
          <div className="grid md:grid-cols-2 gap-5 mt-12">
            {[
              { icon: "ShieldCheck", title: "Свободный выбор номинации", text: "Руководитель самостоятельно выбирает номинацию в соответствии с уровнем и опытом команды. Организаторы имеют право перенести команду в другую номинацию при несоответствии требованиям." },
              { icon: "Award", title: "Финалисты и награждение", text: "Три финалиста выбираются в конце каждого блока. Награждение проводится в конце мероприятия." },
              { icon: "Users", title: "Лимит SOLO", text: "В номинациях SOLO есть ограничение по количеству регистраций — 20 участников." },
              { icon: "TrendingUp", title: "Перевод в PRO", text: "Если во время выступления команды в уровне начинающих судьи решат, что команда имеет хорошую технику и сильный номер, организаторы вправе перевести такую команду в уровень PRO." },
              { icon: "RefreshCcw", title: "Объединение номинаций", text: "Если номинация не набирается (от 5 заявок), её объединяют с другой номинацией. Организаторы оставляют за собой право вносить изменения в номинации команд." },
              { icon: "Type", title: "Название команды", text: "Название команды не может содержать ненормативную лексику, быть грубым или обидным. Организаторы вправе потребовать сменить недопустимое название." },
            ].map((item, i) => (
              <div key={i} className="card-hover p-6" style={{ background: "var(--black-card)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="w-10 h-10 flex items-center justify-center mb-4" style={{ background: "rgba(232,21,27,0.12)", color: "var(--red)" }}>
                  <Icon name={item.icon} size={20} fallback="Star" />
                </div>
                <h3 className="font-oswald text-base font-medium mb-2 tracking-wide">{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--gray)" }}>{item.text}</p>
              </div>
            ))}
          </div>


        </div>
      </section>

      <div className="divider-red mx-12 md:mx-24" />

      {/* ── NOMINATIONS ── */}
      <section id="nominations" className="py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto">
          <SectionHeader number="03" title="Номинации" />

          <h3 className="font-oswald text-xs tracking-widest mt-12 mb-3" style={{ color: "var(--red)" }}>
            SHOW-КАТЕГОРИИ
          </h3>
          <div className="mb-5 px-4 py-3 flex flex-wrap gap-4 text-xs" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
            {["Команда от 3 человек", "Длительность 3–4 минуты", "Реквизит по согласованию с организаторами"].map((t) => (
              <span key={t} className="flex items-center gap-1.5" style={{ color: "var(--gray)" }}>
                <span style={{ color: "var(--red)" }}>—</span> {t}
              </span>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {SHOW_NOMINATIONS.map((nom) => <NomCard key={nom.id} nom={nom} />)}
          </div>

          <h3 className="font-oswald text-xs tracking-widest mt-10 mb-5" style={{ color: "var(--red)" }}>
            DUET-КАТЕГОРИЯ
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {DUET_NOMINATIONS.map((nom) => <NomCard key={nom.id} nom={nom} />)}
          </div>

          <h3 className="font-oswald text-xs tracking-widest mt-10 mb-3" style={{ color: "var(--red)" }}>
            SOLO-КАТЕГОРИИ
          </h3>
          <div className="mb-5 px-4 py-3 flex flex-wrap gap-4 text-xs" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <span className="flex items-center gap-1.5" style={{ color: "var(--gray)" }}>
              <span style={{ color: "var(--red)" }}>—</span> Лимит 20 участников в каждой номинации
            </span>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {SOLO_NOMINATIONS.map((nom) => <NomCard key={nom.id} nom={nom} />)}
          </div>
        </div>
      </section>

      <div className="divider-red mx-12 md:mx-24" />

      {/* ── CRITERIA ── */}
      <section id="criteria" className="py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto">
          <SectionHeader number="04" title="Критерии оценки" />
          <div className="grid md:grid-cols-2 gap-4 mt-12">
            {[
              { n: "01", title: "Техника / синхрон", weight: 0.35 },
              { n: "02", title: "Хореография / рисунки", weight: 0.35 },
              { n: "03", title: "Креативность", weight: 0.15 },
              { n: "04", title: "Образ / подача", weight: 0.15 },
            ].map((c) => (
              <div
                key={c.n}
                className="card-hover p-5 flex items-center gap-5"
                style={{ background: "var(--black-card)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <span className="font-oswald text-3xl font-black" style={{ color: "rgba(232,21,27,0.25)", minWidth: "40px" }}>
                  {c.n}
                </span>
                <div className="flex-1">
                  <div className="font-oswald font-medium tracking-wide mb-2">{c.title}</div>
                  <div className="w-full rounded-full overflow-hidden" style={{ height: "3px", background: "rgba(255,255,255,0.07)" }}>
                    <div className="h-full" style={{ width: `${c.weight * 100}%`, background: "var(--red)" }} />
                  </div>
                  <div className="font-oswald text-xs mt-1" style={{ color: "var(--red)" }}>
                    {c.weight.toFixed(2).replace(".", ",")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-red mx-12 md:mx-24" />

      {/* ── IMPORTANT ── */}
      <section id="important" className="py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto">
          <SectionHeader number="05" title="Важно" />
          <div className="mt-12 grid md:grid-cols-2 gap-4">
            {[
              { icon: "Clock", title: "Регистрация до 17 мая", text: "Команда считается зарегистрированной после 100% оплаты. Инструкция по оплате приходит в течение 48 часов после подачи заявки." },
              { icon: "Music", title: "Музыка до 17 мая", text: "Отправляйте на hottiefest@mail.ru. Тема письма: «музыка на хоти». Трек назвать: НОМИНАЦИЯ_НАЗВАНИЕ КОМАНДЫ_С ТОЧКИ/КУЛИС. Пример: BEST DUET_Sladkie bulochki_с точки. Формат: MP3." },
              { icon: "AlertTriangle", title: "Взнос не возвращается", text: "Если вы отказываетесь от участия после оплаты — взнос не возвращается. Внимание!" },
              { icon: "TrendingUp", title: "Повышение цены после 10 мая", text: "После 10 мая стоимость участия повышается — плюс 300 ₽ к каждой номинации." },
              { icon: "Timer", title: "Ограничения по времени", text: "Solo номинации — до 2:30 минут · Duet — до 3:30 минут · Команды — до 4:00 минут." },
              { icon: "Package", title: "Реквизит", text: "Любой реквизит в номере должен быть согласован с организаторами заранее." },
            ].map((item, i) => (
              <div key={i} className="card-hover p-5 flex gap-4" style={{ background: "var(--black-card)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center mt-0.5" style={{ background: "rgba(232,21,27,0.1)", color: "var(--red)" }}>
                  <Icon name={item.icon} size={17} fallback="Info" />
                </div>
                <div>
                  <div className="font-oswald font-medium tracking-wide mb-1">{item.title}</div>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--gray)" }}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-red mx-12 md:mx-24" />

      {/* ── FEES ── */}
      <section id="fees" className="py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto">
          <SectionHeader number="06" title="Оргвзнос" />
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <div style={{ background: "var(--black-card)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="p-5 border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                <span className="tag-red text-xs">SHOW / DUET</span>
              </div>
              {[
                ["1 номинация", "1 500 ₽"],
                ["2 номинации", "2 500 ₽"],
                ["3 номинации", "3 500 ₽"],
                ["Каждая следующая", "+1 000 ₽"],
              ].map(([label, price], i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-5 py-3"
                  style={{ borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none" }}
                >
                  <span className="text-sm" style={{ color: "var(--gray)" }}>{label}</span>
                  <span className="font-oswald font-semibold text-base">{price}</span>
                </div>
              ))}
            </div>

            <div style={{ background: "var(--black-card)", border: "1px solid rgba(232,21,27,0.25)" }}>
              <div className="p-5 border-b" style={{ borderColor: "rgba(232,21,27,0.15)" }}>
                <span className="tag-red text-xs">SOLO</span>
              </div>
              {[
                ["1 соло-номинация", "2 000 ₽"],
                ["Считается отдельно", "от других номинаций"],
              ].map(([label, price], i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-5 py-3"
                  style={{ borderBottom: i < 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}
                >
                  <span className="text-sm" style={{ color: "var(--gray)" }}>{label}</span>
                  <span className="font-oswald font-semibold text-base">{price}</span>
                </div>
              ))}
              <div className="mx-5 mb-5 mt-3 p-3 flex gap-3" style={{ background: "rgba(232,21,27,0.08)", border: "1px solid rgba(232,21,27,0.2)" }}>
                <Icon name="AlertCircle" size={16} style={{ color: "var(--red)", flexShrink: 0, marginTop: "2px" }} />
                <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                  После 10 мая стоимость повышается на 300 ₽ к каждой номинации
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider-red mx-12 md:mx-24" />

      {/* ── REGISTRATION ── */}
      <section id="registration" className="py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-3xl mx-auto">
          <SectionHeader number="07" title="Регистрация" />

          {submitted ? (
            <div className="mt-12 p-10 text-center" style={{ background: "var(--black-card)", border: "1px solid rgba(232,21,27,0.3)" }}>
              <div className="w-16 h-16 flex items-center justify-center mx-auto mb-5" style={{ background: "rgba(232,21,27,0.12)", color: "var(--red)" }}>
                <Icon name="CheckCircle" size={32} />
              </div>
              <h3 className="font-oswald text-2xl font-semibold mb-3">Заявка отправлена!</h3>
              <p className="text-sm" style={{ color: "var(--gray)" }}>
                В течение 48 часов вы получите инструкцию по оплате на указанный e-mail.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-12 space-y-5">
              <div>
                <label className="font-oswald text-xs tracking-widest mb-3 block" style={{ color: "var(--gray)" }}>
                  ВЫБЕРИТЕ НОМИНАЦИИ
                </label>
                <p className="font-oswald text-xs tracking-wider mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>SHOW / DUET</p>
                <div className="grid sm:grid-cols-2 gap-2 mb-3">
                  {SHOW_NOMINATIONS.map((nom) => (
                    <NomCheckbox key={nom.id} nom={nom} checked={selectedNoms.includes(nom.id)} onToggle={() => toggleNom(nom.id)} />
                  ))}
                </div>
                <p className="font-oswald text-xs tracking-wider mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>SOLO</p>
                <div className="grid sm:grid-cols-3 gap-2">
                  {SOLO_NOMINATIONS.map((nom) => (
                    <NomCheckbox key={nom.id} nom={nom} checked={selectedNoms.includes(nom.id)} onToggle={() => toggleNom(nom.id)} />
                  ))}
                </div>
              </div>

              {selectedNoms.length > 0 && (
                <div className="p-4 flex items-center justify-between" style={{ background: "rgba(232,21,27,0.07)", border: "1px solid rgba(232,21,27,0.2)" }}>
                  <span className="font-oswald text-sm tracking-widest" style={{ color: "var(--gray)" }}>ИТОГО К ОПЛАТЕ</span>
                  <span className="font-oswald text-2xl font-bold" style={{ color: "var(--red)" }}>{fee.toLocaleString("ru-RU")} ₽</span>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                <InputField label="Название команды" value={form.teamName} onChange={(v) => setForm({ ...form, teamName: v })} required placeholder="Название команды" />
                <InputField label="Руководитель" value={form.leader} onChange={(v) => setForm({ ...form, leader: v })} required placeholder="Имя Фамилия" />
                <InputField label="Телефон" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} required placeholder="+7 (___) ___-__-__" type="tel" />
                <InputField label="E-mail" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required placeholder="email@mail.ru" type="email" />
                <InputField label="Город" value={form.city} onChange={(v) => setForm({ ...form, city: v })} placeholder="Ваш город" />
                <InputField label="Количество участников" value={form.members} onChange={(v) => setForm({ ...form, members: v })} placeholder="Например: 5" type="number" />
              </div>

              <div>
                <label className="font-oswald text-xs tracking-widest mb-2 block" style={{ color: "var(--gray)" }}>
                  КОММЕНТАРИЙ
                </label>
                <textarea
                  className="input-dark w-full px-4 py-3 text-sm resize-none"
                  rows={3}
                  placeholder="Дополнительная информация, реквизит..."
                  value={form.comment}
                  onChange={(e) => setForm({ ...form, comment: e.target.value })}
                  style={{ borderRadius: "2px" }}
                />
              </div>

              <button
                type="submit"
                className="btn-red w-full py-4 text-sm font-semibold tracking-widest"
                style={{ borderRadius: "2px" }}
                onClick={() => window.open("https://docs.google.com/forms/d/e/1FAIpQLSd15tsg4PDLzwmAMELevZQkFgS-tGo3NgHutRNOt50_PwM4tA/viewform?usp=dialog", "_blank")}
              >
                Отправить заявку
              </button>
              <p className="text-xs text-center" style={{ color: "rgba(255,255,255,0.3)" }}>
                Инструкция по оплате придёт в течение 48 часов на указанный e-mail
              </p>
            </form>
          )}
        </div>
      </section>

      <div className="divider-red mx-12 md:mx-24" />

      {/* ── CONTACTS ── */}
      <section id="contacts" className="py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto">
          <SectionHeader number="08" title="Контакты" />
          <div className="mt-12 grid sm:grid-cols-3 gap-5">
            {[
              { icon: "Phone", label: "Телефон", value: "+7-922-488-38-96", sub: "Юлия", href: "tel:+79224883896" },
              { icon: "Mail", label: "Почта", value: "hottiefest@mail.ru", sub: "Музыка и вопросы", href: "mailto:hottiefest@mail.ru" },
              { icon: "MapPin", label: "Место проведения", value: "РК BABYLON", sub: "ул. Профсоюзов, 55, Сургут", href: "#" },
            ].map((c, i) => (
              <a key={i} href={c.href} className="card-hover p-6 block" style={{ background: "var(--black-card)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="w-10 h-10 flex items-center justify-center mb-4" style={{ background: "rgba(232,21,27,0.1)", color: "var(--red)" }}>
                  <Icon name={c.icon} size={19} fallback="Info" />
                </div>
                <div className="font-oswald text-xs tracking-widest mb-1" style={{ color: "var(--gray)" }}>{c.label}</div>
                <div className="font-oswald font-medium text-base">{c.value}</div>
                <div className="text-xs mt-1" style={{ color: "var(--gray)" }}>{c.sub}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 md:px-12 text-center" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <p className="font-oswald text-xs tracking-widest" style={{ color: "rgba(255,255,255,0.2)" }}>
          © 2026 HOTTIE FEST · СУРГУТ · 30–31 МАЯ
        </p>
      </footer>
    </div>
  );
}

/* ── Helper components ── */

function SectionHeader({ number, title }: { number: string; title: string }) {
  return (
    <div className="relative">
      <span className="section-number">{number}</span>
      <h2 className="font-oswald font-bold relative z-10" style={{ fontSize: "clamp(28px, 5vw, 48px)", paddingLeft: "8px" }}>
        {title}<span style={{ color: "var(--red)" }}>.</span>
      </h2>
      <div className="mt-3" style={{ width: "40px", height: "2px", background: "var(--red)" }} />
    </div>
  );
}

function NomCard({ nom }: { nom: { id: string; tag: string; title: string; level: string; levelColor: string; desc: string; limit?: string } }) {
  return (
    <div className="card-hover p-5" style={{ background: "var(--black-card)", border: "1px solid rgba(255,255,255,0.07)" }}>
      <div className="flex items-start justify-between mb-3">
        <span className="tag-red text-xs">{nom.tag}</span>
        <span className="font-oswald text-xs tracking-widest" style={{ color: nom.levelColor }}>{nom.level}</span>
      </div>
      <h3 className="font-oswald font-semibold text-lg mb-2 tracking-wide">{nom.title}</h3>
      <p className="text-sm leading-relaxed" style={{ color: "var(--gray)" }}>{nom.desc}</p>
      {nom.limit && (
        <div className="mt-3 text-xs font-oswald tracking-widest" style={{ color: "rgba(232,21,27,0.7)" }}>
          {nom.limit}
        </div>
      )}
    </div>
  );
}

function NomCheckbox({ nom, checked, onToggle }: { nom: { id: string; title: string; tag: string }; checked: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="text-left px-3 py-2 flex items-center gap-2 transition-all"
      style={{
        background: checked ? "rgba(232,21,27,0.12)" : "var(--black-light)",
        border: `1px solid ${checked ? "var(--red)" : "rgba(255,255,255,0.08)"}`,
        borderRadius: "2px",
      }}
    >
      <div
        className="w-4 h-4 flex-shrink-0 flex items-center justify-center"
        style={{ background: checked ? "var(--red)" : "transparent", border: `1px solid ${checked ? "var(--red)" : "rgba(255,255,255,0.2)"}` }}
      >
        {checked && <Icon name="Check" size={10} />}
      </div>
      <span className="font-golos text-xs leading-snug" style={{ color: checked ? "var(--white)" : "var(--gray)" }}>
        {nom.title}
      </span>
    </button>
  );
}

function InputField({ label, value, onChange, placeholder, required, type = "text" }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; required?: boolean; type?: string;
}) {
  return (
    <div>
      <label className="font-oswald text-xs tracking-widest mb-2 block" style={{ color: "var(--gray)" }}>
        {label.toUpperCase()}{required && <span style={{ color: "var(--red)" }}> *</span>}
      </label>
      <input
        className="input-dark w-full px-4 py-3 text-sm"
        style={{ borderRadius: "2px" }}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}