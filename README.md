# Contact Management Backend

This is the backend for the Contact Management application. It provides APIs for managing user authentication, contacts, and token validation.

## Features

- User registration and login
- JWT-based authentication
- CRUD operations for contacts
- Token validation and refresh

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/contact-management-backend.git
   ```
2. Navigate to the project directory:
   ```bash
   cd contact-management-backend
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Configuration

1. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ACCESS_TOKEN_SECRET=your_access_token_secret
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   ```

### Running the Application

1. Start the server:
   ```bash
   npm start
   ```

2. The server will be running on `http://localhost:5000`.

## API Endpoints

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login a user
- `POST /api/users/logout` - Logout a user
- `GET /api/users/current` - Get current user information
- `GET /api/contacts` - Get all contacts
- `POST /api/contacts` - Create a new contact
- `PUT /api/contacts/:id` - Update a contact
- `DELETE /api/contacts/:id` - Delete a contact

## License

This project is licensed under the MIT License.