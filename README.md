# Firdavs &amp; Rukhshona — Wedding Invitation

Премиальная свадебная пригласительная страница в бордово-золотой гамме.
Создана на чистом **HTML5 + CSS3 + JavaScript** — без фреймворков и сборщиков.

> **23 июня 2026 · 19:00 · ресторан Fotima Sulton**

## ✨ Возможности

- Полноэкранный Hero с анимированным бордовым фоном и **золотыми частицами** (canvas)
- Плавные **reveal-анимации** при прокрутке (fade / slide-up / scale / parallax)
- **Обратный отсчёт** до торжества в реальном времени
- Программа вечера в виде элегантной **временной шкалы**
- Блок **места проведения** с картой и кнопкой «Построить маршрут»
- Секция **Dress Code** с цветовой палитрой
- **Фотогалерея** с lightbox (увеличение, стрелки, клавиатура, свайп по клику)
- Форма **RSVP** с валидацией (ответ сохраняется в `localStorage`)
- Кнопка **включения/выключения музыки**
- Полная **адаптация под мобильные устройства** и `prefers-reduced-motion`
- **SEO**: мета-теги, Open Graph, Schema.org Event, semantic HTML

## 📁 Структура проекта

```
/
├── index.html          # разметка всех секций
├── css/
│   └── style.css       # стили, анимации, адаптив
├── js/
│   └── script.js       # конфиг + вся логика
├── assets/
│   ├── images/         # фото и SVG-заглушки
│   ├── music/          # фоновая музыка (background.mp3)
│   └── icons/          # favicon
├── .nojekyll           # корректная отдача файлов на GitHub Pages
└── README.md
```

## ⚙️ Редактирование данных

Все данные свадьбы хранятся в **одном объекте** `WEDDING_CONFIG`
в начале файла [`js/script.js`](js/script.js). Меняйте имена, дату,
программу, палитру, список фото и адрес места — разметка обновится автоматически.

```js
const WEDDING_CONFIG = {
  groom: "Firdavs",
  bride: "Rukhshona",
  date: { year: 2026, month: 5, day: 23, hour: 19, minute: 0 }, // month: 0=Jan
  venue: { name: "Fotima Sulton", query: "Fotima Sulton restaurant", coords: "" },
  music: { src: "assets/music/background.mp3", volume: 0.5 },
  // program, palette, gallery ...
};
```

### Добавить свои фотографии
Положите изображения в `assets/images/` и укажите пути в `WEDDING_CONFIG.gallery`.

### Добавить музыку
Положите трек в `assets/music/background.mp3` (или измените `music.src`).

### Точная карта
Укажите координаты в `venue.coords` в формате `"41.311,69.279"` для точной метки.

## 🚀 Запуск локально

Просто откройте `index.html` в браузере, либо поднимите локальный сервер:

```bash
python3 -m http.server 8000
# затем откройте http://localhost:8000
```

## 🌐 Публикация на GitHub Pages

1. Settings → Pages → **Source**: `Deploy from a branch`.
2. Branch: `main`, папка `/ (root)` → **Save**.
3. Через минуту сайт будет доступен по адресу:
   `https://<username>.github.io/<repository>/`

Файл `.nojekyll` уже добавлен, чтобы все ассеты отдавались корректно.

---

Сделано с любовью для **Firdavs &amp; Rukhshona** 💛
