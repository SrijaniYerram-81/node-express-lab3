const express = require("express");
const db = require("./database");

const app = express();
const PORT = 3000;

app.use(express.json());

// HOME ROUTE
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to Book Management REST API"
    });
});

// GET ALL BOOKS WITH SEARCH, SORTING, PAGINATION AND PRICE FILTER
app.get("/books", (req, res) => {

    let {
        search_q = "",
        order_by = "id",
        order = "ASC",
        limit = "10",
        offset = "0",
        min_price,
        max_price
    } = req.query;

    // Validate sorting
    const allowedColumns = ["id", "title", "author", "price"];

    if (!allowedColumns.includes(order_by)) {
        return res.status(400).json({
            message: "Invalid order_by value"
        });
    }

    order = order.toUpperCase();

    if (!["ASC", "DESC"].includes(order)) {
        return res.status(400).json({
            message: "Order must be ASC or DESC"
        });
    }

    // Validate pagination
    limit = Number(limit);
    offset = Number(offset);

    if (!Number.isInteger(limit) || limit <= 0 ||
        !Number.isInteger(offset) || offset < 0) {
        return res.status(400).json({
            message: "Invalid limit or offset"
        });
    }

    // Validate price range
    if (min_price !== undefined && !Number.isFinite(Number(min_price))) {
        return res.status(400).json({
            message: "min_price must be numeric"
        });
    }

    if (max_price !== undefined && !Number.isFinite(Number(max_price))) {
        return res.status(400).json({
            message: "max_price must be numeric"
        });
    }

    if (min_price !== undefined && max_price !== undefined &&
        Number(min_price) > Number(max_price)) {
        return res.status(400).json({
            message: "min_price cannot be greater than max_price"
        });
    }

    let sql = "SELECT * FROM books WHERE 1=1";
    let params = [];

    // Search using LIKE
    if (search_q) {
        sql += " AND title LIKE ?";
        params.push(`%${search_q}%`);
    }

    // Minimum price
    if (min_price !== undefined) {
        sql += " AND price >= ?";
        params.push(Number(min_price));
    }

    // Maximum price
    if (max_price !== undefined) {
        sql += " AND price <= ?";
        params.push(Number(max_price));
    }

    // Sorting
    sql += ` ORDER BY ${order_by} ${order}`;

    // Pagination
    sql += " LIMIT ? OFFSET ?";
    params.push(limit, offset);

    db.all(sql, params, (err, rows) => {

        if (err) {
            return res.status(500).json({
                message: "Database error",
                error: err.message
            });
        }

        res.status(200).json({
            message: "Books retrieved successfully",
            count: rows.length,
            books: rows
        });
    });
});


// GET BOOK BY ID
app.get("/books/:id", (req, res) => {

    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            message: "Invalid book ID"
        });
    }

    db.get(
        "SELECT * FROM books WHERE id = ?",
        [id],
        (err, book) => {

            if (err) {
                return res.status(500).json({
                    message: "Database error"
                });
            }

            if (!book) {
                return res.status(404).json({
                    message: "Book not found"
                });
            }

            res.status(200).json({
                message: "Book retrieved successfully",
                book: book
            });
        }
    );
});


// CREATE A NEW BOOK
app.post("/books", (req, res) => {

    const { title, author, price } = req.body;

    if (
        typeof title !== "string" ||
        !title.trim() ||
        typeof author !== "string" ||
        !author.trim() ||
        price === undefined ||
        price === null ||
        typeof price !== "number" ||
        !Number.isFinite(price)
    ) {
        return res.status(400).json({
            message: "Title, author and a valid numeric price are required"
        });
    }

    const sql = `
        INSERT INTO books (title, author, price)
        VALUES (?, ?, ?)
    `;

    db.run(sql, [title.trim(), author.trim(), price], function (err) {

        if (err) {
            return res.status(500).json({
                message: "Unable to create book"
            });
        }

        res.status(201).json({
            message: "Book created successfully",
            book: {
                id: this.lastID,
                title,
                author,
                price
            }
        });
    });
});


// UPDATE BOOK
app.put("/books/:id", (req, res) => {

    const id = Number(req.params.id);
    const { title, author, price } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            message: "Invalid book ID"
        });
    }

    if (
        typeof title !== "string" ||
        !title.trim() ||
        typeof author !== "string" ||
        !author.trim() ||
        typeof price !== "number" ||
        !Number.isFinite(price)
    ) {
        return res.status(400).json({
            message: "Valid title, author and numeric price are required"
        });
    }

    const sql = `
        UPDATE books
        SET title = ?, author = ?, price = ?
        WHERE id = ?
    `;

    db.run(sql, [title.trim(), author.trim(), price, id], function (err) {

        if (err) {
            return res.status(500).json({
                message: "Unable to update book"
            });
        }

        if (this.changes === 0) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json({
            message: "Book updated successfully"
        });
    });
});


// DELETE BOOK
app.delete("/books/:id", (req, res) => {

    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            message: "Invalid book ID"
        });
    }

    db.run(
        "DELETE FROM books WHERE id = ?",
        [id],
        function (err) {

            if (err) {
                return res.status(500).json({
                    message: "Unable to delete book"
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    message: "Book not found"
                });
            }

            res.status(200).json({
                message: "Book deleted successfully"
            });
        }
    );
});
.

// START SERVER
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
