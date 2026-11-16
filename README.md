# CV Вячеслава Лапина

Данные и разметка сайта находятся в `src/site.ts`. Стили лежат в `styles.css`, изображения и резюме в `assets/`. `src/build.ts` генерирует готовую страницу в `dist/`. В браузере страница работает без JavaScript.

## Сборка

```powershell
npm ci
npm run typecheck
npm run build
```

Для локального просмотра откройте `dist/index.html`.
## GitHub Pages

При каждом push в `main` GitHub Actions собирает TypeScript и публикует содержимое `dist/`. Источник публикации в настройках Pages — **GitHub Actions**.

[Сайт резюме](https://newtsocute.github.io/cv/)