CREATE DATABASE Sample_Tables;

USE Sample_Tables;

CREATE TABLE Students (
    student_id INT PRIMARY KEY,
    student_name VARCHAR(255),
    age INT,
    class_id INT
);

CREATE TABLE Classes (
    class_id INT PRIMARY KEY,
    class_name VARCHAR(255)
);

CREATE TABLE Scores (
    student_id INT,
    subject VARCHAR(255),
    score INT,
    PRIMARY KEY (student_id, subject),
    FOREIGN KEY (student_id) REFERENCES Students(student_id)
);

/* 1.	Question: For each class, find the student(s) who scored the highest in Science. */

SELECT c.class_name, s.student_name
FROM Students s
JOIN Scores sc ON s.student_id = sc.student_id
JOIN Classes c ON s.class_id = c.class_id
WHERE sc.subject = 'Science'
AND sc.score = (SELECT MAX(score) FROM Scores WHERE subject = 'Science');

/* 2. Question: List the names of students who scored lower in Math than their average Science score.*/

SELECT s.student_name
FROM Students s
JOIN Scores math_scores ON s.student_id = math_scores.student_id AND math_scores.subject = 'Math'
JOIN (SELECT student_id, AVG(score) AS avg_science_score FROM Scores WHERE subject = 'Science' GROUP BY student_id) avg_science ON s.student_id = avg_science.student_id
WHERE math_scores.score < avg_science.avg_science_score;

/*3. Question: Display the class names with the highest number of students who scored above 80 in any subject.*/

SELECT c.class_name, COUNT(DISTINCT s.student_id) AS num_students_above_80
FROM Students s
JOIN Scores sc ON s.student_id = sc.student_id
JOIN Classes c ON s.class_id = c.class_id
WHERE sc.score > 80
GROUP BY c.class_name
HAVING COUNT(DISTINCT s.student_id) = (SELECT MAX(num_students_above_80) FROM (SELECT COUNT(DISTINCT s.student_id) AS num_students_above_80
FROM Students s
JOIN Scores sc ON s.student_id = sc.student_id
WHERE sc.score > 80
GROUP BY s.class_id) AS temp);

/* 4. Question: Find the students who scored the highest in each subject. */

SELECT sc1.subject, s.student_name, sc1.score AS highest_score
FROM Scores sc1 JOIN Students s ON sc1.student_id = s.student_id
WHERE (sc1.score, sc1.subject) IN ( SELECT MAX(sc2.score), sc2.subject
        FROM Scores sc2 GROUP BY sc2.subject );



/* 5. Question: List the names of students who scored higher than the average of any student's score in their own class. */

SELECT s1.student_name, s1.class_id, sc1.subject, sc1.score
FROM Students s1 JOIN Scores sc1 ON s1.student_id = sc1.student_id
WHERE sc1.score > ( SELECT AVG(sc2.score) FROM Students s2
JOIN Scores sc2 ON s2.student_id = sc2.student_id
WHERE s2.class_id = s1.class_id);

/* 6. Question: Find the class(es) where the students average age is above the average age of all students. */

SELECT c.class_name
FROM Classes c
JOIN Students s ON c.class_id = s.class_id
GROUP BY c.class_name
HAVING AVG(s.age) > (SELECT AVG(age) FROM Students);

/* 7. Question: Display the student names and their total scores, ordered by the total score in descending order. */

SELECT s.student_name, SUM(sc.score) AS total_score
FROM Students s
JOIN Scores sc ON s.student_id = sc.student_id
GROUP BY s.student_name
ORDER BY total_score DESC;


/* 8. Question: Find the student(s) who scored the highest in the class with the lowest average score. */

SELECT s.student_name
FROM Students s
JOIN Scores sc ON s.student_id = sc.student_id
WHERE s.class_id = (SELECT class_id FROM (
                        SELECT class_id, AVG(score) as avg_score
                        FROM Scores
                        GROUP BY class_id
                        ORDER BY avg_score ASC
                        LIMIT 1
                    ) AS lowest_avg_class)
ORDER BY sc.score DESC;

/* 9. Question: List the names of students who scored the same as Alice in at least one subject. */

SELECT DISTINCT s.student_name
FROM Students s
JOIN Scores sa ON s.student_id = sa.student_id
WHERE sa.score = (SELECT score FROM Scores WHERE subject = (SELECT subject FROM Scores WHERE student_id = 1) AND student_id = 1);



/* 10. Question: Display the class names along with the number of students who scored below the average score in their class. */


SELECT c.class_name, COUNT(*) AS num_students_below_avg
FROM Students s
JOIN Scores sc ON s.student_id = sc.student_id
JOIN Classes c ON s.class_id = c.class_id
WHERE sc.score < (SELECT AVG(score) FROM Scores WHERE subject = sc.subject)
GROUP BY c.class_name;
