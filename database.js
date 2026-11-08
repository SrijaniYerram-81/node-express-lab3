const sqlite3 = require("sqlite3").verbose();

// Connect to SQLite database
const db = new sqlite3.Database("./books.db", (err) => {
    if (err) {
        console.error("Database connection failed:", err.message);
    } else {
        console.log("Database connected successfully");
    }
});

// Create books table
db.run(`
    CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        price REAL NOT NULL
    )
`, (err) => {

    if (err) {
        console.error("Table creation failed:", err.message);
        return;
    }

    console.log("Books table created successfully");

    // Check existing records
    db.get("SELECT COUNT(*) AS count FROM books", (err, row) => {

        if (err) {
            console.error("Database error:", err.message);
            return;
        }

        // Insert dummy data only when database is empty
        if (row.count === 0) {

            const books = [

                // First 10 books
                ["Java Programming", "James Gosling", 450],
                ["Python Programming", "Guido van Rossum", 350],
                ["C Programming", "Dennis Ritchie", 250],
                ["JavaScript Basics", "Brendan Eich", 400],
                ["Data Structures", "Seymour Lipschutz", 550],
                ["Database Management", "Raghu Ramakrishnan", 600],
                ["Operating Systems", "Abraham Silberschatz", 700],
                ["Computer Networks", "Andrew Tanenbaum", 500],
                ["Machine Learning", "Tom Mitchell", 800],
                ["Web Development", "Jon Duckett", 650],

                // Additional 30 books
                ["C++ Programming", "Bjarne Stroustrup", 420],
                ["Advanced Python", "Mark Lutz", 550],
                ["HTML and CSS", "Jon Duckett", 380],
                ["React JS", "Alex Banks", 650],
                ["Node.js Development", "David Herron", 480],
                ["Express.js Guide", "Ethan Brown", 520],
                ["Artificial Intelligence", "Stuart Russell", 950],
                ["Deep Learning", "Ian Goodfellow", 1200],
                ["Computer Architecture", "John Hennessy", 750],
                ["Software Engineering", "Ian Sommerville", 680],
                ["Cyber Security", "William Stallings", 850],
                ["Cloud Computing", "Thomas Erl", 720],
                ["Big Data Analytics", "Seema Acharya", 580],
                ["Data Science Handbook", "Jake VanderPlas", 900],
                ["Algorithms", "Robert Sedgewick", 780],
                ["Discrete Mathematics", "Kenneth Rosen", 620],
                ["Linear Algebra", "Gilbert Strang", 490],
                ["Operating System Concepts", "Abraham Silberschatz", 890],
                ["Computer Organization", "Carl Hamacher", 560],
                ["Network Security", "Charlie Kaufman", 740],
                ["Android Development", "Bill Phillips", 690],
                ["iOS Programming", "Matt Neuburg", 1100],
                ["Full Stack Development", "Colt Steele", 850],
                ["Machine Learning Basics", "Ethem Alpaydin", 950],
                ["Database Systems", "Raghu Ramakrishnan", 780],
                ["SQL for Beginners", "Alan Beaulieu", 350],
                ["Java Design Patterns", "Erich Gamma", 670],
                ["Python for Data Analysis", "Wes McKinney", 720],
                ["Web Design Fundamentals", "Jennifer Robbins", 450],
                ["Introduction to Algorithms", "Thomas Cormen", 1500]
            ];

            const stmt = db.prepare(`
                INSERT INTO books (title, author, price)
                VALUES (?, ?, ?)
            `);

            db.serialize(() => {

                books.forEach((book) => {
                    stmt.run(book);
                });

                stmt.finalize((err) => {

                    if (err) {
                        console.error("Data insertion failed:", err.message);
                    } else {
                        console.log("40 dummy books inserted successfully");
                    }
                });
            });

        } else {
            console.log(
                `Database already contains ${row.count} books. No new data inserted.`
            );
        }
    });
});

// Export database
module.exports = db;