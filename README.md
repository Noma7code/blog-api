# 📝 Blog API with Authentication and Authorization

A powerful and secure **Node.js + Express.js** API for managing blog posts.  
This project allows users to **create, update, publish, and manage** their blogs with full authentication and authorization using **JWT tokens**.

Built with **MongoDB Atlas**, **Express**, and **JWT authentication**, this API provides robust CRUD functionality with state-based publishing control (`draft` and `published`).

---

## 🚀 Features

### 🔐 Authentication & Authorization

- **User signup, login, and logout**
- JWT-based authentication with cookies
- Secure route protection using middleware (`isAuth`)
- Token expiry and cookie-based session management

### 📰 Blog Management

- Create, update, and delete blogs
- Save blogs as **drafts** or mark as **published**
- View **all published blogs**
- View **only your own blogs (including drafts)**
- Retrieve single blog posts by ID
- Track blog read count
- Store tags for better categorization

### ⚙️ Additional Features

- Error handling for unauthorized access
- MongoDB Atlas integration for cloud-based data storage
- Environment-based configuration for security (`.env`)
- Clean and modular code structure (controllers, routes, middlewares)

---

## 🧱 Project Structure

<details>
<summary><strong>Project Structure</strong></summary>

<ul>
   <li><a href="controllers/">controllers/</a>
      <ul>
         <li><a href="controllers/auth.controller.js">auth.controller.js</a> – Handles user signup, signin, logout, delete</li>
         <li><a href="controllers/blog.controller.js">blog.controller.js</a> – Handles blog CRUD and publication logic</li>
      </ul>
   </li>
   <li><a href="middlewares/">middlewares/</a>
      <ul>
         <li><a href="middlewares/auth.middleware.js">auth.middleware.js</a> – JWT token validation and authorization logic</li>
      </ul>
   </li>
   <li><a href="routes/">routes/</a>
      <ul>
         <li><a href="routes/auth.route.js">auth.route.js</a> – Authentication routes</li>
         <li><a href="routes/blog.route.js">blog.route.js</a> – Blog-related routes</li>
      </ul>
   </li>
   <li><a href="models/">models/</a>
      <ul>
         <li><a href="models/user.model.js">user.model.js</a> – User schema</li>
         <li><a href="models/blog.model.js">blog.model.js</a> – Blog schema</li>
      </ul>
   </li>
   <li><a href="utils/">utils/</a>
      <ul>
         <li><a href="utils/sendToken.js">sendToken.js</a> – Helper to send signed JWT as cookie</li>
      </ul>
   </li>
   <li><a href="server.js">server.js</a> – App entry point</li>
   <li><a href=".env">.env</a> – Environment variables</li>
   <li><a href="package.json">package.json</a></li>
</ul>
</details>

---

## 🧩 Tech Stack

| Technology        | Purpose                         |
| ----------------- | ------------------------------- |
| **Node.js**       | JavaScript runtime              |
| **Express.js**    | Server framework                |
| **MongoDB**       | NoSQL database                  |
| **Mongoose**      | MongoDB ORM                     |
| **JWT**           | Authentication token management |
| **Cookie-parser** | Cookie handling middleware      |
| **Dotenv**        | Environment configuration       |

---

## 🔐 API Endpoints

### **Auth Routes**

| Method   | Endpoint           | Description            |
| -------- | ------------------ | ---------------------- |
| `POST`   | `/api/auth/signup` | Register a new user    |
| `POST`   | `/api/auth/signin` | Login and get token    |
| `POST`   | `/api/auth/logout` | Logout and clear token |
| `DELETE` | `/api/auth/delete` | Delete user account    |

---

### **Blog Routes**

| Method   | Endpoint                     | Access         | Description                                        |
| -------- | ---------------------------- | -------------- | -------------------------------------------------- |
| `GET`    | `/api/blogs/`                | Public         | Get all published blogs                            |
| `GET`    | `/api/blogs/get-blog/:id`    | Public / Owner | Get single blog post                               |
| `GET`    | `/api/blogs/myblogs`         | Authenticated  | Get all blogs of logged-in user (including drafts) |
| `POST`   | `/api/blogs/create-blog`     | Authenticated  | Create a new blog post                             |
| `PUT`    | `/api/blogs/update-blog/:id` | Authenticated  | Update your own blog post                          |
| `DELETE` | `/api/blogs/delete-blog/:id` | Authenticated  | Delete your own blog post                          |

---

## 🧠 Blog States

- **`draft`** – Blog is visible **only to the owner**.
- **`published`** – Blog is visible **to everyone** via `/api/blogs/`.

Example logic for restricted access:

```javascript
// Allow only the owner to view drafts
if (blog.state !== "published" && blog.author._id.toString() !== req.userId) {
  return res.status(404).json({ success: false, message: "Blog not found" });
}
```

---

## ⚙️ Installation & Setup

1. **Clone Repository**

   ```bash
   git clone https://github.com/yourusername/blog-api.git
   cd blog-api
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Create a `.env` File**

   Create a `.env` file in the root directory and add the following:

   ```env
   PORT=8000
   MONGO_URI=your_mongodb_atlas_uri
   JWT_SECRET=your_secret_key
   NODE_ENV=development
   ```

4. **Run the Server**

   ```bash
   npm run dev
   ```

   The server will run on:

   👉 [http://localhost:8000](http://localhost:8000)

## 🧪 Testing API with Postman

1. **Register a User**

   - **Endpoint**: `POST /api/auth/signup`
   - **Description**: Creates a new user account.

2. **Login**

   - **Endpoint**: `POST /api/auth/signin`
   - **Description**: Authenticates a user and returns a cookie token.

3. **Protected Routes**

   Use the token from login to access protected routes, such as:

   - **Create Blog**: `POST /api/blogs/create-blog`
   - **View My Blogs**: `GET /api/blogs/myblogs`

## 🔒 Security Considerations

- **Token Storage**: Tokens are stored as HTTP-only cookies.
- **CSRF Protection**: `sameSite: "Strict"` is used to mitigate CSRF attacks.
- **Password Security**: Passwords are hashed using bcrypt.
- **Environment Variables**: All sensitive data is stored in environment variables.
- **Token Expiry**: Tokens expire after 1 hour.

## 📝 Example Blog Document

```json
{
  "_id": "68e13eaa016be52b1349990c",
  "title": "Beginner’s Guide to Docker",
  "description": "Understanding Docker containers and why they are essential for modern development.",
  "author": "68e13ce9016be52b13499905",
  "state": "published",
  "read_count": 10,
  "tags": ["docker", "devops", "containers"],
  "body": "Docker allows developers to package applications into containers...",
  "timestamp": "2025-10-04T10:30:00Z",
  "reading_time": 1
}
```

## 👨‍💻 Author

**Henry Anomah Yeboah**

## 🏁 License

This project is licensed under the MIT License – feel free to use, modify, and distribute.
