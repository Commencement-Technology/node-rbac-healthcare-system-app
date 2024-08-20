# Role Based Access Control (RBAC) Healthcare System
The "rbac-healthcare-system" repository is a Node.js project that implements Role-Based Access Control (RBAC) for healthcare, defining roles like admin, doctor, and patient with specific permissions. It features JWT authentication, MongoDB integration, and a modular architecture with controllers, routes, and models. Unit tests are included to ensure reliability.

## Features
<img width="1454" alt="Screenshot 2024-08-20 at 16 03 56" src="https://github.com/user-attachments/assets/b77ff948-428d-45f8-9faf-de8def2ef349">

## Technologies Used

- ***Node.js:*** Backend runtime environment.
- ***express.js:*** Web framework for Node.js.
- ***MongoDB:*** NoSQL database for storing user data.
- ***mongoose:*** ODM for MongoDB.
- ***express-validator:*** Server side validation for input fields
- ***bcrypt:*** Library for hashing passwords.
- ***JSON Web Tokens (JWT):*** Standard for creating secure access tokens.
- ***jest:*** Testing framework for JavaScript, used to write and run unit tests.
- ***supertest:*** Library for testing HTTP endpoints in Node.js applications.
- ***swagger-ui-express:*** Middleware to serve auto-generated Swagger API documentation in Express.js applications.
- ***swagger-jsdoc:*** Library to generate Swagger API documentation from JSDoc comments in your code.


 ## Installation
  1. Clone the repository
  
  ```bash
    git clone https://github.com/carpodok/rbac-healthcare-system
  ```
  
  2. Navigate to the project directory:
  
   ```bash
    cd rbac-healthcare-system
   ```

  3. Install required dependencies
  
  ```bash
   npm install
  ```
<br>

## Configuration

1. Creat a `.env` file on the root of the project and add the following environment variables

```
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

<br>

## Running the Application

1. To start the server, run the following command on the root of the project path;

```
npm start
```

For the development purpose;
```
npm run dev
```

2. The application will be running on  `http://localhost:3000`

<br>



## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or suggestions.


## License
This project is licensed under the MIT License.
