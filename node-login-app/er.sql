
create database learning;
use learning;

-- Create the 'courses' table
CREATE TABLE courses (
    course_id INT AUTO_INCREMENT PRIMARY KEY,
    course_title VARCHAR(255) NOT NULL,
    teacher_name VARCHAR(255) NOT NULL,
    youtube_link VARCHAR(255) NOT NULL,
    drive_link VARCHAR(255) NOT NULL,
    quiz_link VARCHAR(255) NOT NULL,
    score INT NOT NULL,
    meeting_id VARCHAR(50) NOT NULL,
    meeting_time DATETIME NOT NULL
);

-- Insert sample data into the 'courses' table
INSERT INTO courses (course_title, teacher_name, youtube_link, drive_link, quiz_link, score, meeting_id, meeting_time)
VALUES
    ('Introduction to JavaScript', 'John Doe', 'https://www.youtube.com/embed/B7wHpNUUT4Y?si=rcYCKFGZ8ghXUQqp', 'https://drive.google.com/drive/folders/1X1OsK6Q7RBRuzCTcm4vA4-7WwcIg_rgQ', 'https://quiz.com/quiz1/', 90, 'ABCD123', '2024-05-01 10:00:00'),
    ('Python Fundamentals', 'Jane Smith', 'https://www.youtube.com/embed/tZE_fQFK8EY?si=hUCj7LKf8rBoMt2T', 'https://drive.google.com/drive/folders/1X1OsK6Q7RBRuzCTcm4vA4-7WwcIg_rgQ', 'https://quiz.com/quiz1/', 85, 'EFGH456', '2024-05-02 14:00:00'),
    ('Web Development Basics', 'Alex Johnson', 'https://www.youtube.com/embed/z0n1aQ3IxWI?si=0z7ab01977B7durf', 'https://drive.google.com/drive/folders/1X1OsK6Q7RBRuzCTcm4vA4-7WwcIg_rgQ', 'https://quiz.com/quiz1/', 88, 'IJKL789', '2024-05-03 12:00:00'),
    -- Add more courses as needed
    ('Deep Learning', 'John Doe', 'https://www.youtube.com/embed/aircAruvnKk?si=-G2XwW2h3WeNdFuB', 'https://drive.google.com/drive/folders/1X1OsK6Q7RBRuzCTcm4vA4-7WwcIg_rgQ', 'https://quiz.com/', 95, 'kjhfxchnht', '2024-04-21 17:15:00');

-- Create the 'students' table
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    roll_number VARCHAR(20) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Insert sample data into the 'students' table
INSERT INTO students (name, roll_number, password)
VALUES
    ('hello', '1', 'world'),
    ('nishit', '0230', 'password'),
    ('rohan', '0216', '6969'),
    -- Add more students as needed
    ('bharat', '1374', 'gupt');

-- Create the 'teachers' table
CREATE TABLE teachers (
    teacher_id INT AUTO_INCREMENT PRIMARY KEY,
    teacher_name VARCHAR(255) NOT NULL,
    teacher_username VARCHAR(50) NOT NULL,
    teacher_password VARCHAR(255) NOT NULL
);

-- Insert sample data into the 'teachers' table
INSERT INTO teachers (teacher_name, teacher_username, teacher_password)
VALUES
    ('John Doe', 'john_doe', 'password123'),
    ('Jane Smith', 'jane_smith', 'teacher456');

-- Display tables and sample data
SHOW TABLES;
SELECT * FROM courses;
SELECT * FROM students;
SELECT * FROM teachers;