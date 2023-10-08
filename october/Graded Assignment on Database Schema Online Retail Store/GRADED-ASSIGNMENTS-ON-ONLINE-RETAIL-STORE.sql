USE `online retail store`;

CREATE TABLE Orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    order_date DATE,
    total_amount DECIMAL(10, 2),
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);

CREATE TABLE Customers (
    customer_id INT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100)
);

CREATE TABLE Products (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(255),
    category_id INT,
    price DECIMAL(10, 2),
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
);


CREATE TABLE Categories (
    category_id INT PRIMARY KEY,
    category_name VARCHAR(100)
);

-- 1. Retrieve a list of all customers along with their email addresses.
SELECT first_name, last_name, email FROM Customers;

-- 2. Find the total number of orders placed by each customer.
SELECT customer_id, COUNT(*) AS total_orders FROM Orders GROUP BY customer_id;

-- 3. List all products along with their prices.
SELECT product_name, price FROM Products;

-- 4. Retrieve the category with the highest number of products.
SELECT category_id, COUNT(*) AS product_count FROM Products GROUP BY category_id ORDER BY product_count DESC LIMIT 1;

-- Intermediate Queries
-- 5. Find all customers who have not placed any orders.
SELECT c.customer_id, c.first_name, c.last_name, c.email
FROM Customers c
LEFT JOIN Orders o ON c.customer_id = o.customer_id
WHERE o.order_id IS NULL;

-- 6. List the products with the highest and lowest prices.
SELECT * FROM Products ORDER BY price DESC LIMIT 1;
SELECT * FROM Products ORDER BY price ASC LIMIT 1;

-- 7. Calculate the average order amount for each customer.
SELECT customer_id, AVG(total_amount) AS average_order_amount
FROM Orders
GROUP BY customer_id;

-- 8. Find the categories that do not have any products.
SELECT c.category_id, c.category_name
FROM Categories c
LEFT JOIN Products p ON c.category_id = p.category_id
WHERE p.product_id IS NULL;

-- Advanced Queries
-- 9. Retrieve a list of customers who have placed orders for products with a price higher than $100.
SELECT DISTINCT c.customer_id, c.first_name, c.last_name, c.email
FROM Customers c
JOIN Orders o ON c.customer_id = o.customer_id
JOIN Products p ON o.product_id = p.product_id
WHERE p.price > 100;

-- 10. List the customers who have placed orders for products from at least three different categories.
SELECT c.customer_id, c.first_name, c.last_name, c.email
FROM Customers c
JOIN Orders o ON c.customer_id = o.customer_id
JOIN Products p ON o.product_id = p.product_id
GROUP BY c.customer_id, c.first_name, c.last_name, c.email
HAVING COUNT(DISTINCT p.category_id) >= 3;

-- 11. Find the products with the highest and lowest average customer ratings (if a rating table is available).

-- 12. Calculate the total revenue generated from each category.
SELECT c.category_id, c.category_name, SUM(p.price) AS total_revenue
FROM Categories c
JOIN Products p ON c.category_id = p.category_id
GROUP BY c.category_id, c.category_name;