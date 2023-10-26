-- Create the database
CREATE DATABASE Doctor_appointments;

-- Use the database
USE Doctor_appointments;

-- Create the Doctor table
CREATE TABLE Doctor (
    doctor_id INT PRIMARY KEY,
    doctor_name VARCHAR(255),
    email VARCHAR(255),
    contact_no VARCHAR(15),
    password VARCHAR(255),
    spl_id INT,
    FOREIGN KEY (spl_id) REFERENCES specialty(spl_id)
);

-- Create the Appointments table
CREATE TABLE Appointments (
    appointment_id INT PRIMARY KEY,
    date DATE,
    patient_id INT,
    doctor_id INT,
    status VARCHAR(50),
    prescription TEXT,
    FOREIGN KEY (patient_id) REFERENCES Patient(patient_id),
    FOREIGN KEY (doctor_id) REFERENCES Doctor(doctor_id)
);

-- Create the Patient table
CREATE TABLE Patient (
    patient_id INT PRIMARY KEY,
    patient_name VARCHAR(255),
    email VARCHAR(255),
    contact_no VARCHAR(15),
    password VARCHAR(255),
    appointment_id INT,
    FOREIGN KEY (appointment_id) REFERENCES Appointments(appointment_id)
);

-- Create the Transaction table
CREATE TABLE Transaction (
    transaction_id INT PRIMARY KEY,
    date DATE,
    amount DECIMAL(10, 2),
    appointment_id INT,
    FOREIGN KEY (appointment_id) REFERENCES Appointments(appointment_id)
);

-- Create the Reviews_appointments table
CREATE TABLE Reviews_appointments (
    review_id INT PRIMARY KEY,
    description TEXT,
    review_score INT,
    appointment_id INT,
    FOREIGN KEY (appointment_id) REFERENCES Appointments(appointment_id)
);

-- Create the Reviews_doctor table
CREATE TABLE Reviews_doctor (
    review_id INT PRIMARY KEY,
    description TEXT,
    review_score INT,
    patient_id INT,
    doctor_id INT,
    FOREIGN KEY (patient_id) REFERENCES Patient(patient_id),
    FOREIGN KEY (doctor_id) REFERENCES Doctor(doctor_id)
);

-- Create the specialty table
CREATE TABLE specialty (
    spl_id INT PRIMARY KEY,
    spl_name VARCHAR(255)
);


-- 1. Write a SQL query to obtain doctor-name and spl-id.  

SELECT doctor_name, spl_id 
FROM Doctor; 


-- 2. Write a query to obtain a total number of appointments in a day.  

SELECT COUNT(appointment_id) AS total_appointments 
FROM Appointments 
WHERE date = CURDATE(); 

 
-- 3. Write a query to find out the peak day (having maximum number of appointments) in the week.  

SELECT DATE_FORMAT(date, '%W') AS peak_day, COUNT(appointment_id) AS appointment_count 
FROM Appointments 
GROUP BY DATE_FORMAT(date, '%W') 
ORDER BY appointment_count DESC 
LIMIT 1; 


-- 4. Write a query to find the status of every appointment for today.  

SELECT appointment_id, status 
FROM Appointments 
WHERE date = CURDATE(); 


-- 5. Find out the contact-details for a specific doctor with name -xyz. 

SELECT doctor_name, contact_no, email 
FROM Doctor 
WHERE doctor_name = 'xyz'; 

 
-- 6. Create a SQL query to count the number of patients who have scheduled appointments with a particular doctor.  

SELECT doctor_name, COUNT(DISTINCT patient_id) AS patient_count 
FROM Appointments 
JOIN Doctor ON Appointments.doctor_id = Doctor.doctor_id 
GROUP BY doctor_name; 

 
-- 7. Create a SQL query to count the number of patients who have scheduled appointments with a particular doctor.  

SELECT doctor_name, COUNT(DISTINCT patient_id) AS patient_count 
FROM Appointments 
JOIN Doctor ON Appointments.doctor_id = Doctor.doctor_id 
GROUP BY doctor_name; 

 
-- 8. Create a SQL query to figure out the total transactions happened for each speciality.  

SELECT s.spl_name, COUNT(t.transaction_id) AS total_transactions 
FROM specialty s 
LEFT JOIN Doctor d ON s.spl_id = d.spl_id 
LEFT JOIN Appointments a ON d.doctor_id = a.doctor_id 
LEFT JOIN Transaction t ON a.appointment_id = t.appointment_id 
GROUP BY s.spl_name; 

 
-- 9. Create a query to count how many distinct specialities are there in the hospital.  

SELECT COUNT(DISTINCT spl_id) AS distinct_specialties 
FROM specialty; 

 
-- 10. Create a stored procedure to update the password of a particular patient.  

DELIMITER //  

CREATE PROCEDURE UpdatePatientPassword(IN patient_id INT, IN new_password VARCHAR(255)) 
BEGIN 
    UPDATE Patient 
    SET password = new_password 
    WHERE patient_id = patient_id; 
END// 

DELIMITER ; 

 

-- 11. Select name of patients who have taken appointment for a particular doctor for today.  

SELECT p.patient_name 
FROM Appointments a 
JOIN Patient p ON a.patient_id = p.patient_id 
JOIN Doctor d ON a.doctor_id = d.doctor_id 
WHERE d.doctor_name = 'xyz' AND a.date = CURDATE(); 


-- 12. Select which patient appointments are in pending state.  

SELECT p.patient_name, a.appointment_id 
FROM Appointments a 
JOIN Patient p ON a.patient_id = p.patient_id 
WHERE a.status = 'Pending'; 

 
-- 13. Find out the prescription, doctor name and patient name of all the done appointments for today.  

SELECT a.appointment_id, d.doctor_name, p.patient_name, a.prescription 
FROM Appointments a 
JOIN Doctor d ON a.doctor_id = d.doctor_id 
JOIN Patient p ON a.patient_id = p.patient_id 
WHERE a.date = CURDATE() AND a.status = 'Completed'; 

 
-- 14. Find out the amount paid by a particular patient in last 1 month.  

SELECT t.amount 
FROM Transaction t 
JOIN Appointments a ON t.appointment_id = a.appointment_id 
WHERE a.patient_id = <patient_id> AND t.date >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH); 

 
-- 15. Select doctor name, doctor speciality name and status of appointment for today. 

SELECT d.doctor_name, s.spl_name, a.status 
FROM Appointments a 
JOIN Doctor d ON a.doctor_id = d.doctor_id 
JOIN specialty s ON d.spl_id = s.spl_id 
WHERE a.date = CURDATE(); 

 


