// app.js

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();

// Middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: 'password', // Replace with your MySQL password
    database: 'learning' // Replace with your database name
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database as id ' + db.threadId);
});

// Routes
app.get('/', (req, res) => {
    const { registered } = req.query;
    if (registered) {
        res.render('login', { message: 'You are already registered. Please log in.' });
    } else {
        res.render('register');
    }
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/teacher/login', (req, res) => {
    res.render('teacher_login');
});

app.post('/login', (req, res) => {
    const { roll_number, password } = req.body;
    const sql = 'SELECT * FROM students WHERE roll_number = ? AND password = ?';
    db.query(sql, [roll_number, password], (err, result) => {
        if (err) {
            console.error('Error authenticating student: ' + err.stack);
            res.send('Login failed');
        } else {
            if (result.length > 0) {
                console.log('Student Login successful');
                res.redirect('/dashboard');
            } else {
                res.send('Invalid credentials. Please try again.');
            }
        }
    });
});



app.get('/dashboard', (req, res) => {
    const sql = 'SELECT * FROM courses';
    db.query(sql, (err, courses) => {
        if (err) {
            console.error('Error fetching courses: ' + err.stack);
            res.send('Error fetching courses');
        } else {
            res.render('dashboard', { courses });
        }
    });
});



// Route for teacher login form
app.get('/teacher/login', (req, res) => {
    res.render('teacher_login');
});

// Route for handling teacher login form submission
app.post('/teacher/login', (req, res) => {
    const { teacher_username, teacher_password } = req.body;
    const sql = 'SELECT * FROM teachers WHERE teacher_username = ? AND teacher_password = ?';
    db.query(sql, [teacher_username, teacher_password], (err, result) => {
        if (err) {
            console.error('Error authenticating teacher: ' + err.stack);
            res.send('Login failed');
        } else {
            if (result.length > 0) {
                console.log('Teacher login successful');
                // Redirect to teacher dashboard if login is successful
                res.redirect('/teacher/dashboard?teacher_name=' + result[0].teacher_name);
            } else {
                res.send('Invalid credentials. Please try again.');
            }
        }
    });
});


app.post('/register', (req, res) => {
    const { name, roll_number, password } = req.body;
    const sql = 'INSERT INTO students (name, roll_number, password) VALUES (?, ?, ?)';
    db.query(sql, [name, roll_number, password], (err) => {
        if (err) {
            console.error('Error registering student: ' + err.stack);
            res.send('Registration failed');
        } else {
            console.log('Student registered successfully');
            // Redirect to login page with a query parameter indicating registration status
            res.redirect('/login');
        }
    });
});

// Route for handling teacher login form submission
app.post('/teacher/login', (req, res) => {
    const { teacher_username, teacher_password } = req.body;
    const sql = 'SELECT * FROM teachers WHERE teacher_username = ? AND teacher_password = ?';
    db.query(sql, [teacher_username, teacher_password], (err, result) => {
        if (err) {
            console.error('Error authenticating teacher: ' + err.stack);
            res.send('Login failed');
        } else {
            if (result.length > 0) {
                console.log('Teacher login successful');
                // Redirect to teacher dashboard if login is successful
                res.redirect('/teacher/dashboard?teacher_name=' + result[0].teacher_name);
            } else {
                res.send('Invalid credentials. Please try again.');
            }
        }
    });
});


// Route for teacher dashboard
app.get('/teacher/dashboard', (req, res) => {
    const { teacher_name } = req.query;
    // Fetch courses data for the specific teacher from the database
    const sql = 'SELECT * FROM courses WHERE teacher_name = ?';
    db.query(sql, [teacher_name], (err, courses) => {
        if (err) {
            console.error('Error fetching courses: ' + err.stack);
            res.send('Error fetching courses');
        } else {
            // Render the teacher dashboard view with fetched courses data
            res.render('teacher_dashboard', { courses });
        }
    });
});


// app.js

// Route for updating drive link
app.post('/update-drive-link/:courseId', (req, res) => {
    const courseId = req.params.courseId;
    const { driveLink } = req.body;
    
    // Update the drive_link for the specified course in the database
    const sql = 'UPDATE courses SET drive_link = ? WHERE course_id = ?';
    db.query(sql, [driveLink, courseId], (err) => {
        if (err) {
            console.error('Error updating drive link:', err.stack);
            res.status(500).send('Failed to update drive link');
        } else {
            console.log(`Drive link updated for course ${courseId}`);
            res.sendStatus(200); // Send success response
        }
    });
});

app.post('/update-quiz-link/:courseId', (req, res) => {
    const { courseId } = req.params;
    const { quizLink } = req.body;
    db.query('UPDATE courses SET quiz_link = ? WHERE course_id = ?', [quizLink, courseId], err => {
        if (err) {
            console.error('Error updating quiz link:', err);
            res.status(500).send('Failed to update quiz link');
        } else {
            res.sendStatus(200);
        }
    });
});

// Route to update meeting_id for a course
app.post('/update-meeting-id/:courseId', (req, res) => {
    const { meetingId } = req.body;
    const { courseId } = req.params;
    const sql = 'UPDATE courses SET meeting_id = ? WHERE course_id = ?';
    db.query(sql, [meetingId, courseId], (err) => {
        if (err) {
            console.error('Error updating meeting ID:', err);
            res.status(500).send('Failed to update meeting ID');
        } else {
            res.sendStatus(200); // Send success response
        }
    });
});

app.get('/addCourse', (req, res) => {
    res.render('addCourse');
});

// Route to handle form submission and insert new course into the database
app.post('/add', (req, res) => {
    const { course_title, teacher_name, youtube_link, drive_link, quiz_link, score, meeting_id, meeting_time } = req.body;
    const sql = `
        INSERT INTO courses (course_title, teacher_name, youtube_link, drive_link, quiz_link, score, meeting_id, meeting_time)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [course_title, teacher_name, youtube_link, drive_link, quiz_link, score, meeting_id, meeting_time];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting new course:', err.stack);
            res.send('Failed to add new course');
        } else {
            console.log('New course added successfully');
            res.redirect('/dashboard'); // Redirect to dashboard after adding course
        }
    });
});


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

