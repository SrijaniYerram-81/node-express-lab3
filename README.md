# 📚 LAB 3 – REST API DEVELOPMENT

## 👨‍🎓 Student Details

| Field | Details |
|---|---|
| **Name** | srijani yerram |
| **Registration Number** | 252U1R1232 |
| **University** | Aurora University |
| **Year** | II Year |
| **Term** | II Term |
| **Subject** | Backend Development |
| **Lab Exercise** | Lab 3 – REST API Development |

---

## 📌 Project Overview

This project focuses on developing a RESTful API for managing a collection of books using **Node.js, Express.js and SQLite**.

The application provides complete CRUD (Create, Read, Update and Delete) operations for book records. It also supports advanced functionalities such as searching, sorting, filtering and pagination through query parameters.

The API includes input validation, appropriate HTTP status codes, parameterized SQL queries and consistent error handling to ensure reliable and secure backend operations.

---

## 🎯 Objectives

- Understand REST API architecture and principles.
- Develop RESTful endpoints using Node.js and Express.js.
- Implement CRUD operations for book management.
- Integrate an SQLite database with the backend application.
- Implement searching using query parameters.
- Perform sorting in ascending and descending order.
- Implement pagination using limit and offset.
- Filter books based on minimum and maximum prices.
- Validate incoming request data.
- Handle errors using appropriate HTTP status codes.
- Test API endpoints using Postman.

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime environment |
| Express.js | Backend web framework |
| SQLite | Database management |
| SQLite3 | SQLite database connectivity |
| JavaScript | Backend programming language |
| Postman | API testing |
| Visual Studio Code | Development environment |
| Git | Version control |
| GitHub | Source code hosting |

---

## 📂 Project Structure

```text
lab3
│
├── server.js
├── database.js
├── package.json
├── package-lock.json
├── README.md
└── .gitignore
```

---

## ⚙️ Installation and Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/SrijaniYerram-81/node-express-lab3.git
```

### Step 2: Navigate to the Project Directory

```bash
cd node-express-lab3
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Start the Development Server

```bash
npm run dev
```

Alternatively, use:

```bash
npm start
```

### Step 5: Access the Application

The backend server runs at:

```text
http://localhost:3000
```

---

## 📖 API Endpoints

The following REST API endpoints are implemented in this project.

### 1. GET – Retrieve All Books

**Endpoint:**

```http
GET /books
```

**Description:** Retrieves all available books from the SQLite database.

### 2. GET – Retrieve a Book by ID

**Endpoint:**

```http
GET /books/:id
```

**Description:** Retrieves a particular book using its unique ID.

### 3. POST – Create a New Book

**Endpoint:**

```http
POST /books
```

**Request Body:**

```json
{
    "title": "Java Programming",
    "author": "James Gosling",
    "price": 450
}
```

**Description:** Creates and stores a new book in the database.

### 4. PUT – Update an Existing Book

**Endpoint:**

```http
PUT /books/:id
```

**Request Body:**

```json
{
    "title": "Advanced Java Programming",
    "author": "James Gosling",
    "price": 550
}
```

**Description:** Updates the details of an existing book.

### 5. DELETE – Delete a Book

**Endpoint:**

```http
DELETE /books/:id
```

**Description:** Deletes a particular book using its ID.

---

## 🔍 Query Parameters

The API supports query parameters to retrieve and manage book records efficiently.

| Parameter | Description | Example |
|---|---|---|
| `search_q` | Searches books by title | `?search_q=Python` |
| `order_by` | Specifies the sorting column | `?order_by=price` |
| `order` | Specifies ASC or DESC order | `?order=DESC` |
| `limit` | Specifies the maximum records to retrieve | `?limit=10` |
| `offset` | Specifies the number of records to skip | `?offset=10` |
| `min_price` | Filters books by minimum price | `?min_price=300` |
| `max_price` | Filters books by maximum price | `?max_price=800` |

### Example Requests

**1. Search books by title**

```http
GET /books?search_q=Python
```

**2. Sort books by price in descending order**

```http
GET /books?order_by=price&order=DESC
```

**3. Filter books by price**

```http
GET /books?min_price=300&max_price=800
```

**4. Retrieve the first 10 books**

```http
GET /books?limit=10&offset=0
```

**5. Retrieve the next 10 books**

```http
GET /books?limit=10&offset=10
```

**6. Combine multiple query parameters**

```http
GET /books?search_q=Java&order_by=price&order=ASC&limit=5&offset=0
```

---

## ✅ Input Validation and Error Handling

Input validation and error handling are important parts of this REST API.

The following validations and error-handling mechanisms are implemented:

- Book title is required.
- Book author is required.
- Price must be a valid number.
- Invalid input returns `400 Bad Request`.
- Successfully created records return `201 Created`.
- Successful GET, PUT and DELETE requests return `200 OK`.
- Requests for non-existing book IDs return `404 Not Found`.
- Unexpected server errors return `500 Internal Server Error`.
- Consistent JSON responses are used for error messages.
- Parameterized SQL queries are used to prevent SQL injection.

---

## 🧪 API Testing Using Postman

All API endpoints are tested using Postman to verify the correctness of the application.

The following test cases are covered:

1. GET – Retrieve all books.
2. GET – Retrieve a book using its ID.
3. POST – Create a new book.
4. PUT – Update an existing book.
5. DELETE – Delete a book.
6. Search books using query parameters.
7. Sort books in ascending order.
8. Sort books in descending order.
9. Filter books using minimum and maximum prices.
10. Test pagination using limit and offset.
11. Validate missing title and author fields.
12. Validate non-numeric price values.
13. Test requests using invalid book IDs.

---

## 📸 Screenshots

The following screenshots demonstrate the API operations and their responses in Postman.

### 1. GET – Retrieve All Books

![GET All Books](https://github.com/SrijaniYerram-81/node-express-lab3/blob/d26fe53866696ff987c17e7d39312b2efd55ef2a/Screenshot%202026-11-08%20173629.png)

### 2. POST – Create a New Book

![POST Create Book](https://github.com/SrijaniYerram-81/node-express-lab3/blob/d26fe53866696ff987c17e7d39312b2efd55ef2a/Screenshot%202026-11-08%20174144.png)

### 3. PUT – Update an Existing Book

![PUT Update Book](https://github.com/SrijaniYerram-81/node-express-lab3/blob/d26fe53866696ff987c17e7d39312b2efd55ef2a/Screenshot%202026-11-08%20174342.png)

### 4. DELETE – Delete a Book

![DELETE Book](https://github.com/SrijaniYerram-81/node-express-lab3/blob/d26fe53866696ff987c17e7d39312b2efd55ef2a/Screenshot%202026-11-08%20174553.png)

### 5. Search, Sorting and Filtering

![Query Parameters](https://github.com/SrijaniYerram-81/node-express-lab3/blob/d26fe53866696ff987c17e7d39312b2efd55ef2a/Screenshot%202026-11-08%20174911.png,https://github.com/SrijaniYerram-81/node-express-lab3/blob/d26fe53866696ff987c17e7d39312b2efd55ef2a/Screenshot%202026-11-08%20175121.png)

### 6. Input Validation and Error Handling

![Validation](https://github.com/SrijaniYerram-81/node-express-lab3/blob/d26fe53866696ff987c17e7d39312b2efd55ef2a/Screenshot%202026-11-08%20175745.png)

---

## 🔐 Security and Best Practices

The following development practices are followed:

- Used parameterized SQL queries to prevent SQL injection.
- Implemented request body validation.
- Used appropriate HTTP methods for CRUD operations.
- Followed REST API naming conventions.
- Used suitable HTTP status codes.
- Maintained a clean and organized project structure.
- Used `.gitignore` to exclude unnecessary files.
- Implemented consistent JSON responses.

---

## 🎓 Learning Outcomes

Through this laboratory exercise, I gained practical knowledge and experience in backend development.

The major learning outcomes include:

- Understanding REST API architecture and its working principles.
- Developing backend applications using Node.js and Express.js.
- Performing CRUD operations on database records.
- Connecting an SQLite database with a Node.js application.
- Working with HTTP methods such as GET, POST, PUT and DELETE.
- Using query parameters for searching and filtering.
- Implementing sorting and pagination.
- Performing input validation and error handling.
- Testing REST API endpoints using Postman.
- Managing source code using Git and GitHub.

---

## 📌 Conclusion

This laboratory exercise successfully demonstrates the development of a RESTful Book Management API using Node.js, Express.js and SQLite.

The application provides essential backend functionalities, including CRUD operations, searching, sorting, filtering, pagination, input validation and error handling.

By completing this project, I improved my understanding of REST API development, database integration, backend programming, API testing and version control using Git and GitHub.

---

**Developed as part of the Backend Development Laboratory – Lab 3.**
