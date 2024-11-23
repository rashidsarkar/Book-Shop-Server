

# Book-Shop-Server

A robust and scalable RESTful API for managing products and orders in a book shop. Built with Node.js, Express, TypeScript, and MongoDB, this application supports product management, order creation, inventory tracking, and revenue calculation.

---

## Features

- **Product Management**:
  - Add, update, delete, and retrieve books.
  - Search functionality for books by title, author, or category.
  - Real-time inventory updates during order creation.

- **Order Management**:
  - Create orders with stock validation using Zod for schema-based validation.
  - Revenue calculation feature.
  - Automated inventory deduction and `inStock` status updates.

- **Error Handling**:
  - Centralized error handling for validation and server errors.
  - User-friendly error messages with stack traces for debugging.

- **Validation**:
  - Zod-based validation for consistent and strict data validation.

- **Environment Configuration**:
  - Centralized configuration management using the `/src/app/config/index.ts` file.

---

## Technologies

- **Backend**: Node.js, Express
- **Database**: MongoDB (using Mongoose)
- **Validation**: Zod
- **Language**: TypeScript
- **Environment Variables**: Dotenv

---

## Prerequisites

Ensure you have the following installed:

- **Node.js** (v16+)
- **MongoDB Atlas Account** or a local MongoDB setup
- **npm** (Node Package Manager)

---

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/rashidsarkar/Book-Shop-Server.git
cd Book-Shop-Server
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and add the following:

```env
PORT=5000
DATABASE_URL=DB_URL
NODE_ENV=development
```

### 4. Start the Server
Run the following command to start the application:

```bash
npm run start:dev
```

The server will start on `http://localhost:5000`.

---

## Folder Structure

```plaintext
book-shop-api/
├── src/
│   ├── app/
│   │   ├── config/
│   │   │   ├── index.ts
│   │   ├── modules/
│   │   │   ├── order/
│   │   │   │   ├── order.controller.ts
│   │   │   │   ├── order.interface.ts
│   │   │   │   ├── order.model.ts
│   │   │   │   ├── order.service.ts
│   │   │   │   ├── order.validation.ts
│   │   │   ├── product/
│   │   │   │   ├── product.controller.ts
│   │   │   │   ├── product.interface.ts
│   │   │   │   ├── product.model.ts
│   │   │   │   ├── product.service.ts
│   │   │   │   ├── product.validation.ts
│   ├── app.ts
│   ├── server.ts
├── .env
├── package.json
├── tsconfig.json
├── README.md
```

---

## API Endpoints

### Product Endpoints
- **GET** `/products` - Retrieve all products.
- **GET** `/products/:productId` - Retrieve a specific product by ID.
- **POST** `/products` - Add a new product.
- **PUT** `/products/:productId` - Update an existing product.
- **DELETE** `/products/:productId` - Delete a product by ID.

### Order Endpoints
- **POST** `/orders` - Create a new order with stock validation.
- **GET** `/orders/revenue` - Retrieve total revenue from all orders.

---





## Contributing

We welcome contributions! Follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Make your changes and commit: `git commit -m 'Add feature-name'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## Author

**MD Rashid Sarkar**  
- [GitHub](https://github.com/rashidsarkar)  
- [Portfolio](https://fabulous-meringue-442652.netlify.app)  
- [Email](mailto:rashidsarkar558@gmail.com)  
```

