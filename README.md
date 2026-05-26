# Artists Page — Галерея картин русских художников

Веб-приложение для просмотра коллекции картин известных русских художников с возможностью фильтрации и навигации.

## 🚀 Технологии

- **Angular 21** — фреймворк для фронтенда
- **TypeScript** — типизированный JavaScript
- **IndexedDB** — локальное хранилище данных в браузере
- **RxJS** — реактивное программирование

## 📋 Особенности

- Просмотр коллекции картин с изображениями
- Фильтрация по автору, локации и поисковому запросу
- Пагинация результатов
- Детальный просмотр каждой картины
- Коллекция произведений
- Тёмная тема (переключатель)

## 🏗️ Структура проекта

```
src/
├── app/
│   ├── components/         # Компоненты страницы
│   │   ├── catalog-kartochek/   # Каталог картин
│   │   ├── collection-kartochek/# Коллекция
│   │   ├── kartocheka-view/     # Просмотр картины
│   │   ├── kartocheka/          # Карточка картины
│   │   ├── name/                # Компонент имени
│   │   └── opisaniye/           # Описание
│   ├── services/            # Сервисы
│   │   ├── kartochki.service.ts    # Работа с данными картин
│   │   ├── loader.service.ts       # IndexedDB и HTTP
│   │   ├── authors.service.ts      # Авторы
│   │   └── locations.service.ts    # Локации
│   ├── ui/                  # Переиспользуемые UI компоненты
│   │   ├── select-checkbox/       # Чекбокс-выбор
│   │   ├── select/                # Выпадающий список
│   │   ├── loading/               # Индикатор загрузки
│   │   └── numeraciya/            # Пагинация
│   └── button/              # Кнопки
├── environments/            # Конфигурации окружения
└── main.ts                  # Точка входа
```

## 🛠️ Установка и запуск

### Требования

- Node.js (версия совместимая с Angular 21)
- npm или yarn

### Установка зависимостей

```bash
npm install
```

### Запуск в режиме разработки

```bash
npm start
```

Или на порту 4242:

```bash
npm run start4242
```

### Сборка для продакшена

```bash
npm run build
```

### Тестирование

```bash
npm test
```

## 📊 Работа с данными

Приложение использует **IndexedDB** для локального хранения данных:

- **paintings** — картины (изображения, авторы, локации, даты)
- **authors** — список художников
- **locations** — локации произведений

Данные инициализируются автоматически при первом запуске приложения.

### Пересоздание базы данных

В `AppComponent` доступна функция `rewriteBD()` для очистки и пересоздания БД:

```typescript
this.loader.closeDB();
this.loader.deleteDB();
this.loader.initDB();
location.reload();
```

## 🔧 Фильтрация

Поддерживаемые фильтры:

| Параметр | Тип | Описание |
|----------|-----|----------|
| `authorId` | number | ID художника |
| `locationId` | number | ID локации |
| `q` | string | Поисковый запрос |
| `_page` | number | Номер страницы |
| `_limit` | number | Количество элементов на странице |

## 🎨 Компоненты

### SelectCheckboxComponent

Компонент для выбора стилей с чекбоксами и полосой прокрутки:

```typescript
@Input() disabled: boolean = false;
@Input() current: number = -1;
@Input() variants: TSelectItems = [];
@Input() updateFilter: TUpdateFilter | null = null;
@Input() nameFilter: TKeyFilters | null = null;
```

### SelectComponent

Выпадающий список для выбора вариантов фильтрации.

## 📁 Данные по умолчанию

В `StructureDB` предустановлены данные:

- **10 художников**: Репин, Шишкин, Васнецов, Рублёв, Левитан, Врубель, Куинджи, Айвазовский, Серов, Брюллов
- **20 картин** с изображениями и метаинформацией
- **2 локации**

## 🌐 Конфигурация

### Базовый URL

```typescript
// src/environments/environment.ts
export const environment = {
  production: false
};
```

### Base href

```html
<base href="/">
```

Получить значение в коде:

```typescript
const baseHref = document.querySelector('base')?.href;
```

## 📝 Лицензия

Проект создан в учебных целях.

---

**NLP-Core-Team**