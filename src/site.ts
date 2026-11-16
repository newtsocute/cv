type Link = {
  label: string;
  href: string;
  symbol: string;
};

type Project = {
  title: string;
  description: string;
  tags: readonly string[];
  featured?: boolean;
  visual:
    | { type: 'image'; file: string; alt: string }
    | { type: 'statistic'; number: string; label: string };
};

type Job = {
  employer: string;
  role: string;
  dates: string;
  description: string;
};

const profile = {
  name: 'Вячеслав Лапин',
  role: 'Product Manager',
  location: 'Москва',
  avatar: 'assets/avatar.png',
  resume: 'assets/resume.pdf',
  summary: 'Работаю с требованиями, пользовательскими сценариями, бэклогом и архитектурой. Совмещаю продуктовый менеджмент с практическим опытом разработки.',
} as const;

const contacts: readonly Link[] = [
  { label: '@newt_011', href: 'https://t.me/newt_011', symbol: '✈' },
  { label: 'slavchik.lapin@mail.ru', href: 'mailto:slavchik.lapin@mail.ru', symbol: '✉' },
  { label: 'github.com/newtsocute', href: 'https://github.com/newtsocute', symbol: '⌘' },
];

const facts = [
  { label: 'Опыт', value: '2 года 6 месяцев' },
  { label: 'Формат', value: 'Удалённо / гибрид / офис' },
  { label: 'Самозанятость', value: 'Да' },
] as const;

const stack = [
  'Python', 'Rust', 'TypeScript', 'React', 'Django', 'DRF', 'PostgreSQL', 'Docker', 'Linux', 'AI / ML',
] as const;

const sections = [
  { id: 'about', label: 'Резюме' },
  { id: 'projects', label: 'Проекты' },
  { id: 'experience', label: 'Опыт' },
  { id: 'education', label: 'Образование' },
] as const;

const projects: readonly Project[] = [
  {
    title: 'Nova Admin',
    description: 'Корпоративная система управления логистическими заказами, клиентской базой и статусами доставки. Встроенные чаты и голосовые комнаты.',
    tags: ['Логистика', 'CRM', 'Коммуникации'],
    featured: true,
    visual: { type: 'image', file: 'assets/nova.png', alt: 'Интерфейс Nova Admin' },
  },
  {
    title: 'Document IDE',
    description: 'Десктопный редактор DOCX и Markdown с AI-функциями, на Tauri, Rust и React.',
    tags: ['Rust', 'React', 'AI'],
    visual: { type: 'image', file: 'assets/document-ide.png', alt: 'Интерфейс Document IDE' },
  },
  {
    title: 'Adaptive diffusion execution policy',
    description: 'Эксперимент с SDXL 2048 × 2048: снижение пикового выделения VRAM примерно с 9,1 до 5,1 ГБ в tiled режиме.',
    tags: ['SDXL', 'Исследование', 'Оптимизация'],
    visual: { type: 'statistic', number: '44%', label: 'меньше peak VRAM в эксперименте' },
  },
  {
    title: 'Aria Studio',
    description: 'Проектирование инструментов для подготовки, разметки и оценки датасетов и генеративных моделей.',
    tags: ['AI / ML', 'Датасеты'],
    visual: { type: 'image', file: 'assets/aria-studio.png', alt: 'Интерфейс Aria Studio' },
  },
];

const jobs: readonly Job[] = [
  {
    employer: 'Доброезжев',
    role: 'Product Manager',
    dates: 'Авг 2026 — Сен 2026',
    description: 'CRM для отслеживания заказов. Работа со стейкхолдерами, требованиями, приоритетами, бэклогом и тестированием функций.',
  },
  {
    employer: 'Студия update',
    role: 'Product Manager',
    dates: 'Май 2024 — Авг 2026',
    description: 'Развитие продукта для отслеживания интернет-заказов, постановка требований, анализ метрик и пользовательского опыта.',
  },
  {
    employer: 'Orient Wind',
    role: 'Backend-разработчик',
    dates: 'Апр 2024 — Окт 2025',
    description: 'API и автоматизация логистики, PostgreSQL, аутентификация, права доступа и тестирование.',
  },
];

const education = {
  school: 'ММКЦТ «Академия TOP»',
  program: 'Информационные системы и программирование, среднее профессиональное',
  year: 2026,
} as const;

function escape(text: string): string {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function renderChips(values: readonly string[]): string {
  return values.map(value => `<span>${escape(value)}</span>`).join('');
}

function renderContact({ href, label, symbol }: Link): string {
  const external = href.startsWith('https:') ? ' target="_blank" rel="noopener noreferrer"' : '';
  return `<a href="${escape(href)}"${external}><span class="symbol" aria-hidden="true">${escape(symbol)}</span>${escape(label)}</a>`;
}

function renderProject(project: Project): string {
  const visual = project.visual;
  const media = visual.type === 'image'
    ? `<img src="${escape(visual.file)}" alt="${escape(visual.alt)}"${project.featured ? '' : ' loading="lazy"'}>`
    : `<div class="project-visual research-visual">
        <span class="research-number">${escape(visual.number)}</span>
        <span>${escape(visual.label)}</span>
      </div>`;

  return `<article class="project${project.featured ? ' featured' : ''}">
    ${media}
    <div class="project-body">
      <h3>${escape(project.title)}</h3>
      <p>${escape(project.description)}</p>
      <div class="tags">${renderChips(project.tags)}</div>
    </div>
  </article>`;
}

function renderJob(job: Job): string {
  return `<article class="job">
    <div class="job-title"><h3>${escape(job.employer)}</h3><span>${escape(job.role)}</span></div>
    <div class="job-date">${escape(job.dates)}</div>
    <p>${escape(job.description)}</p>
  </article>`;
}

export function renderPage(): string {
  const name = escape(profile.name);
  const nav = sections.map(({ id, label }) => `<a href="#${id}">${label}</a>`).join('');

  return `<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#eaf5ff">
  <meta name="description" content="${name}. Product Manager, Project Manager. Опыт, проекты и навыки.">
  <title>${name} | ${escape(profile.role)}</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="shell">
    <aside class="sidebar">
      <div class="identity">
        <img class="avatar" src="${escape(profile.avatar)}" alt="${name}">
        <h1>${name}</h1>
        <p class="muted">${escape(profile.location)}</p>
        <span class="role">${escape(profile.role)}</span>
      </div>
      <div class="contacts">${contacts.map(renderContact).join('\n')}</div>
      <div class="side-section">
        ${facts.map(({ label, value }) => `<div class="fact"><span>${escape(label)}</span><strong>${escape(value)}</strong></div>`).join('\n')}
      </div>
      <div class="side-section">
        <h2>Стек</h2><div class="chips">${renderChips(stack)}</div>
      </div>
    </aside>
    <main class="main">
      <header class="top">
        <nav aria-label="Навигация">${nav}</nav>
        <a class="download" href="${escape(profile.resume)}" download>Скачать PDF</a>
      </header>
      <section class="intro" id="about">
        <p class="eyebrow">PRODUCT / PROJECT MANAGER</p>
        <h2>Создаю и развиваю <em>IT-продукты</em></h2>
        <p>${escape(profile.summary)}</p>
      </section>
      <section id="projects">
        <div class="section-head"><h2>Проекты</h2></div>
        <div class="projects">${projects.map(renderProject).join('\n')}</div>
      </section>
      <section id="experience">
        <div class="section-head"><h2>Опыт работы</h2></div>
        <div class="timeline">${jobs.map(renderJob).join('\n')}</div>
      </section>
      <section id="education">
        <div class="section-head"><h2>Образование</h2></div>
        <div class="education">
          <div><h3>${escape(education.school)}</h3><p>${escape(education.program)}</p></div>
          <span>${education.year}</span>
        </div>
      </section>
      <footer>
        <span>${name}</span>
        <a href="${escape(contacts[0].href)}" target="_blank" rel="noopener noreferrer">Написать в Telegram</a>
      </footer>
    </main>
  </div>
</body>
</html>
`;
}
