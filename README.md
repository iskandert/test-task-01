# TreeRender

Веб-приложение для визуализации текстового представления дерева в виде псевдо-графической текстовой визуализации.

## Описание

Приложение принимает текстовое определение дерева в формате `(1 (2 (4 5 6 (7) 108 (9)) 3))` и отрисовывает его в виде текстовой визуализации.

Пример ввода:
```
(1 (2 (4 5 6 (7) 108 (9)) 3))
```

Пример вывода:
```
1---+
    2---+
    |   4
    |   5
    |   6---+
    |   |   7
    |   108---+
    |         9
    3
```

## Запуск приложения

### Локальная разработка

1. Скачайте или клонируйте репозиторий
2. Установите зависимости:
```
npm install
```
3. Запустите сервер разработки:
```
npm run dev
```
4. Откройте в браузере http://localhost:5173

### Сборка

1. Выполните сборку проекта:
```
npm run build
```
2. Результаты сборки будут доступны в папке `build`
3. Для просмотра сборки выполните команду:
```
npm run preview
```
4. Откройте в браузере http://localhost:4173

## Технологии

- TypeScript
- HTML5
- CSS3
- Vite (сборка)

## Структура проекта

- `index.html` - HTML-разметка приложения
- `src/script.ts` - Логика приложения (парсинг и отрисовка дерева)
- `src/style.css` - Стили приложения
- `src/main.ts` - Точка входа 