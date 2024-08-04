# ORM-Ecommerce

## Description
This project is a back-end application for an e-commerce site, developed using **Express.js** and **Sequelize** to interact with a **PostgreSQL** database. It provides a RESTful API for managing products, categories, and tags, allowing for efficient data handling in an online retail environment.

## Features
- CRUD (Create, Read, Update, Delete) operations for categories, products, and tags.
- Associations between products, categories, and tags for better data organization.
- User-friendly API endpoints to facilitate interaction with the database.

## Technologies Used
- Node.js
- Express.js
- Sequelize
- PostgreSQL
- Insomnia/Postman for API testing

## Installation

1. Clone the repository
2. Install Dependencies
3. Set up your database: Create a PostgreSQL database and configure the .env file in the root directory with your database credentials
4. Run the schema.sql file in the db folder to create the database structure.
5. Seed the database with test data

## Usage

Start the server

API Endpoints:
Categories
- GET /api/categories - Retrieve all categories
- GET /api/categories/:id - Retrieve a category by ID
- POST /api/categories - Create a new category
- PUT /api/categories/:id - Update a category by ID
- DELETE /api/categories/:id - Delete a category by ID

Products
- GET /api/products - Retrieve all products
- GET /api/products/:id - Retrieve a product by ID
- POST /api/products - Create a new product
- PUT /api/products/:id - Update a product by ID
- DELETE /api/products/:id - Delete a product by ID
Tags
- GET /api/tags - Retrieve all tags
- GET /api/tags/:id - Retrieve a tag by ID
- POST /api/tags - Create a new tag
- PUT /api/tags/:id - Update a tag by ID
- DELETE /api/tags/:id - Delete a tag by ID

## Video Walkthrough

https://drive.google.com/file/d/17l6DWWQsvVXYCG50u4M9cyqld_Rt1bft/view
