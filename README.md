Medical Store E-commerce Website

Project Overview

This project is a full-stack e-commerce website for a medical store, built using Node.js, Express.js, React.js, and MongoDB. The application allows users to register, login, view product information, add products to cart, and view order history.

Features

- User registration with email and password (password hashing using bcrypt)
- Login validation with email and password
- User profile page with editable information
- Unique email validation
- Product catalog with drug name, company name, price, and current stock
- Item detail page with price, stock, and mock add-to-cart functionality
- Order history page displaying past orders with product details and stock at the time of order
- Credit card input validation

Tech Stack

- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MongoDB
- Password Hashing: bcrypt

Database Collections

- Users: stores user information (email, password, name, etc.)
- Products: stores product information (drug name, company name, price, stock, etc.)
- Order History: stores user order history with product details and stock at the time of order

Functionality

- Users can register and login to their accounts
- Users can view and update their profile information
- Users can browse products and view item details
- Users can add products to cart (mock functionality)
- Users can view their order history

Installation and Setup

1. Clone the repository
2. Install dependencies using npm install
3. Start the backend server using node server.js
4. Start the frontend server using npm start
5. Access the application at http://localhost:3000


API Endpoints

- /api/register: user registration
- /api/login: user login
- /api/profile: user profile information
- /api/products: product catalog
- /api/orders: order history

Screencast Demo

A screencast demo of the application is available at: 
https://drive.google.com/drive/folders/1Rh4aiM_BTAt5fTn0dQ8xON_KzKl2-L3v?usp=drive_link


Future Enhancements

- Implement payment gateway integration
- Enhance security measures

Contributors

- Aswathi PV







