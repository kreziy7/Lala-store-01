# Lala Store API

API сервер для магазина детской одежды Lala Store.

## Установка и запуск

```bash
cd api
npm install
npm start
```

Для разработки с автоперезагрузкой:
```bash
npm run dev
```

API будет доступен по адресу: `http://localhost:3001`

## Эндпоинты

### Health Check
- **GET** `/api/health` - Проверка статуса API

### Товары
- **GET** `/api/products` - Получить все товары
  - Параметры: `category`, `inStock=true`
- **GET** `/api/products/:id` - Получить товар по ID

### Коллекции
- **GET** `/api/collections` - Получить все коллекции
  - Параметры: `featured=true`, `season`
- **GET** `/api/collections/:id` - Получить коллекцию с товарами

### Новости
- **GET** `/api/news` - Получить все новости
  - Параметры: `category`, `limit`
- **GET** `/api/news/:id` - Получить новость по ID

### Категории
- **GET** `/api/categories` - Получить список всех категорий

### Поиск
- **GET** `/api/search` - Поиск товаров
  - Обязательный параметр: `q` (поисковый запрос)
  - Дополнительные: `category`, `minPrice`, `maxPrice`

## Примеры запросов

```bash
# Получить все товары
curl http://localhost:3001/api/products

# Найти товары в категории "Новорожденные"
curl "http://localhost:3001/api/products?category=Новорожденные"

# Получить только товары в наличии
curl "http://localhost:3001/api/products?inStock=true"

# Получить рекомендуемые коллекции
curl "http://localhost:3001/api/collections?featured=true"

# Поиск товаров по запросу "боди"
curl "http://localhost:3001/api/search?q=боди"

# Получить последние 5 новостей
curl "http://localhost:3001/api/news?limit=5"
```

## Структура ответов

Все успешные ответы имеют структуру:
```json
{
  "success": true,
  "count": 10,
  "data": [...]
}
```

Ошибки возвращаются в формате:
```json
{
  "error": "Error message",
  "message": "Detailed description"
}
```
