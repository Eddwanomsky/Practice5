# Лабораторно-практична робота №5
## Розширення бекенд-додатку власними сутностями та реалізація REST API

**Тема / Предметна область:** Система управління автосалоном  
**Стек технологій:** Node.js, Express, TypeScript, TypeORM, PostgreSQL, Docker Compose, Postman.

---

## 1. Опис реалізованих сутностей та їхніх зв'язків

У межах виконання роботи було спроєктовано та реалізовано дві пов'язані реляційні сутності з курсового проєкту:

1. **`Brand` (Марка автомобіля)** — сутність, що описує бренд виробника.
   * `id` — унікальний ідентифікатор (первинний ключ).
   * `name` — назва бренду (наприклад, BMW, Audi, Mercedes).
   * `country` — країна походження бренду.
   * `createdAt` / `updatedAt` — системні тимчасові мітки.

2. **`Car` (Автомобіль)** — сутність, що описує автомобіль в автосалоні.
   * `id` — унікальний ідентифікатор (первинний ключ).
   * `model` — назва моделі (наприклад, X5, A6).
   * `price` — вартість автомобіля.
   * `year` — рік випуску.
   * `color` — колір кузова.
   * `brandId` — зовнішній ключ (`foreign key`), що посилається на `Brand`.
   * `createdAt` / `updatedAt` — системні тимчасові мітки.

### Реляційний зв'язок (TypeORM Relations)
Між сутностями реалізовано реляційний зв'язок **Один-до-Багатьох (`One-to-Many` / `Many-to-One`)**:
* Один бренд (`Brand`) може мати декілька автомобілів (`Car`).
* Кожен автомобіль (`Car`) належить конкретному бренду (`Brand`).
* Зв'язок налаштовано через декоратори `@OneToMany` та `@ManyToOne` з каскадним видаленням (`onDelete: 'CASCADE'`).

---

## 2. Перелік реалізованих API-ендпоінтів

Для керування сутностями реалізовано повний набір CRUD-операцій за архітектурою `Controller -> Service -> DTO -> Router`. Всі захищені ендпоінти вимагають авторизації через `Bearer Token`.

### Бренд (`/v1/brands`)
| Метод | Ендпоінт | Опис | Доступ |
|---|---|---|---|
| `POST` | `/v1/brands` | Створення нового бренду | Admin / Authorized |
| `GET` | `/v1/brands` | Отримання списку всіх брендів | Public / Authorized |

### Автомобілі (`/v1/cars`)
| Метод | Ендпоінт | Опис | Доступ |
|---|---|---|---|
| `POST` | `/v1/cars` | Створення нового автомобіля | Admin / Authorized |
| `GET` | `/v1/cars` | Отримання всіх авто (із JOIN вкладеного бренду) | Public / Authorized |
| `GET` | `/v1/cars/:id` | Отримання одного авто за ID (із JOIN) | Public / Authorized |
| `PUT` | `/v1/cars/:id` | Оновлення даних автомобіля за ID | Admin / Authorized |
| `DELETE` | `/v1/cars/:id` | Видалення автомобіля за ID | Admin / Authorized |

> **Ключова особливість:** При виконанні запитів `GET /v1/cars` та `GET /v1/cars/:id` використовується зв'язування таблиць (`relations: ['brand']`), завдяки чому у відповіді повертається повний вкладений об'єкт бренду (`Brand`), а не лише його ID.

---

## 3. Приклади відповіді сервера (Postman)

### **Створення бренду (`POST /v1/brands`)**
**Request Body:**
```json
{
  "name": "BMW",
  "country": "Germany"
}

{
  "id": 1,
  "name": "BMW",
  "country": "Germany",
  "createdAt": "2026-10-14T05:20:11.123Z",
  "updatedAt": "2026-10-14T05:20:11.123Z"
}

Інструкція із запуску проєкту
Клонування репозиторію:

Bash
git clone [https://github.com/Eddwanomsky/Practice5.git](https://github.com/Eddwanomsky/Practice5.git)
cd Practice5
Запуск бази даних у Docker Compose:

Bash
docker compose --file docker-compose.yml --file docker-compose.dev.yml up -d db_postgres
Встановлення залежностей та накат міграцій:

Bash
npm install
npm run migration:run:dev
npm run seed:run:dev
Запуск сервера розробки:

Bash
npm run dev

---

### Як зберегти та залити оновлений `README.md` на GitHub:

У PowerShell виконай дві команди:

```powershell
git add README.md
git commit -m "Docs: Update README.md with Lab 5 description and API endpoints"
git push origin main

## Лабораторно-практична робота №6
## Впровадження сервісного шару, валідації та DTO

### 1. Архітектура додатку (Separation of Concerns)
* **Middleware (Валідація):** Перевіряє вхідні дані в `req.body` до виклику контролера і повертає `400 Bad Request` у разі помилки.
* **Controller (Оркестрація):** Обробляє HTTP-запит, викликає відповідні методи сервісу та обгортає результат у DTO.
* **Service (Бізнес-логіка):** Інкапсулює роботу з TypeORM Repository та реалізує бізнес-логіку.
* **Response DTO:** Відфільтровує приватні та системні поля (`createdAt`, `updatedAt`) перед відправкою відповіді клієнту.

---

### 2. Приклади коду

#### **Middleware Валідації (`validatorCreateCar.ts`)**
```typescript
export const validatorCreateCar = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  const { model, price, brandId } = req.body;
  if (!model || isEmpty(String(model).trim())) {
    return next(new CustomError(400, 'Validation', 'Car model is required.'));
  }
  if (price === undefined || !isFloat(String(price), { gt: 0 })) {
    return next(new CustomError(400, 'Validation', 'Price must be a number greater than 0.'));
  }
  return next();
};

export class CarResponseDTO {
  id: number;
  modelName: string;
  price: number;
  year?: number;
  color?: string;

  constructor(car: Car) {
    this.id = car.id;
    this.modelName = car.model;
    this.price = Number(car.price);
    this.year = car.year;
    this.color = car.color;
  }
}
---
git add .
git commit -m "Lab 6: Implement Service layer, Validation middleware, and Response DTOs"
git push origin main
