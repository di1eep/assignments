CREATE DATABASE car_data;
USE car_data;

CREATE TABLE Model (
    model_id INT PRIMARY KEY,
    model_name VARCHAR(255),
    first_production_year INT
);

CREATE TABLE Vehicle (
    vehicle_id INT PRIMARY KEY,
    fk_make_id INT,
    fk_model_id INT,
    year INT,
    FOREIGN KEY (fk_make_id) REFERENCES Make(make_id),
    FOREIGN KEY (fk_model_id) REFERENCES Model(model_id)
);


CREATE TABLE Vehicle_Incentive (
    fk_vehicle_id INT,
    fk_incentive_id INT,
    valid_till DATE,
    PRIMARY KEY (fk_vehicle_id, fk_incentive_id),
    FOREIGN KEY (fk_vehicle_id) REFERENCES Vehicle(vehicle_id),
    FOREIGN KEY (fk_incentive_id) REFERENCES Incentive(incentive_id)
);

CREATE TABLE Make (
    make_id INT PRIMARY KEY,
    make_name VARCHAR(255),
    country VARCHAR(255)
);


CREATE TABLE Inventory (
    inventory_id INT PRIMARY KEY,
    fk_vehicle_id INT,
    fk_color_id INT,
    price DECIMAL(10, 2),
    FOREIGN KEY (fk_vehicle_id) REFERENCES Vehicle(vehicle_id),
    FOREIGN KEY (fk_color_id) REFERENCES Color(color_id)
);


CREATE TABLE Incentive (
    incentive_id INT PRIMARY KEY,
    type VARCHAR(255),
    amount DECIMAL(10, 2),
    conditions VARCHAR(255)
);



CREATE TABLE Color (
    color_id INT PRIMARY KEY,
    name VARCHAR(255),
    code VARCHAR(10)
);

-- 1. Write a query to fetch all the vehicle model name whose production started in 2022. 

SELECT model_name
FROM Model
WHERE first_production_year = 2022;

-- 2. Write a query to fetch all the brand names for Germany. 
SELECT make_name
FROM Make
WHERE country = 'Germany';

-- 3. Write a query to find out which country has more than 2 brands. 
SELECT country, COUNT(make_id) AS brand_count
FROM Make
GROUP BY country
HAVING COUNT(make_id) > 2;

-- 4. Write a query to find out the total price of all the vehicles which are white in color.
SELECT SUM(price) AS total_price
FROM Inventory
JOIN Color ON Inventory.fk_color_id = Color.color_id
WHERE Color.name = 'white';

 -- 5. Write a query to find the highest price of a vehicle. 
SELECT MAX(price) AS highest_price
FROM Inventory;


-- 6. Write a query to find the distinct types of Incentives. 
SELECT DISTINCT type
FROM Incentive;

-- 7. Write a query to idenify the model that has an incentive valid till 2027.
 SELECT Model.model_name
FROM Model
JOIN Vehicle ON Model.model_id = Vehicle.fk_model_id
JOIN Vehicle_Incentive ON Vehicle.vehicle_id = Vehicle_Incentive.fk_vehicle_id
WHERE Vehicle_Incentive.valid_till <= '2027-12-31';

-- 8. Write a query to find the price of each model. 
SELECT Model.model_name, Inventory.price
FROM Inventory
JOIN Model ON Inventory.fk_vehicle_id = Model.model_id;

-- 9. Write a query to find out all the brands, their country, and their incentives irrespective if they have incentives or not. 
SELECT Make.make_name, Make.country, Incentive.type, Incentive.amount, Incentive.conditions
FROM Make
LEFT JOIN Incentive ON Make.make_id = Incentive.make_id;

-- 10. Write a query to identify which color doesn’t have any inventory yet. 
SELECT Color.name
FROM Color
WHERE NOT EXISTS (
    SELECT 1
    FROM Inventory
    WHERE Inventory.fk_color_id = Color.color_id
);


-- 11. Write a query to select each country and the number of models they have. 
SELECT Make.country, COUNT(Model.model_id) AS model_count
FROM Make
JOIN Model ON Make.make_id = Model.make_id
GROUP BY Make.country;

-- 12. Write a query to find which vehicle has the highest price. 
SELECT Model.model_name, MAX(Inventory.price) AS highest_price
FROM Inventory
JOIN Model ON Inventory.fk_vehicle_id = Model.model_id;

-- 13. Write a query to indentify which incentive type has the lowest incentive amount.
SELECT type, MIN(amount) AS lowest_amount
FROM Incentive
GROUP BY type;

 -- 14. Write a query to find which year and number of models were launched showcasing the year having max models at the top. 
SELECT first_production_year, COUNT(model_id) AS model_count
FROM Model
GROUP BY first_production_year
ORDER BY model_count DESC;

-- 15. Write a stored procedure named sp_color to select the model and color of each model. 
DELIMITER //
 
CREATE PROCEDURE sp_color()
BEGIN
    SELECT Model.model_name, Color.name AS model_color
    FROM Inventory
    JOIN Model ON Inventory.fk_vehicle_id = Model.model_id
    JOIN Color ON Inventory.fk_color_id = Color.color_id;
END //
 
DELIMITER ;


-- 16. Write a query to execute the sp_color stored procedure.
CALL sp_color();

