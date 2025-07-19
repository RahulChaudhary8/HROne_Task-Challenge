# 🧩 HROne Backend Task 

## 🔗 Live API Documentation (Swagger UI)

➡️ [https://hrone-task-challenge.onrender.com/docs](https://hrone-task-challenge.onrender.com/docs)

---

## 🧑‍💻 Tech Stack

- **Framework:** FastAPI
- **Database:** MongoDB (using Motor)
- **Server:** Uvicorn
- **Environment Handling:** Python-Dotenv
- **Language:** Python 3.13

---

## 🛠️ Features

- ➕ Add New Products
- 📃 Get a List of All Products
- 🛒 Place Order (User + Product IDs)
- 📦 Get Orders by User ID
- ⏱️ Timestamps for each order

---

## 🔌 API Endpoints

| Method | Endpoint                        | Description                    |
|--------|----------------------------------|--------------------------------|
| GET    | `/products`                     | Get all products               |
| POST   | `/products`                     | Create a new product           |
| POST   | `/orders`                       | Place a new order              |
| GET    | `/orders/{user_id}`             | Get orders by user ID          |

📄 Test all endpoints from: [Swagger Docs](https://hrone-task-challenge.onrender.com/docs)

---

## 📁 Folder Structure

backend_task/
├── database/
│ └── connection.py # MongoDB connection setup
├── models/
│ ├── product_model.py # Product Pydantic schema
│ └── order_model.py # Order Pydantic schema
├── routes/
│ ├── product_routes.py # Product API endpoints
│ └── order_routes.py # Order API endpoints
├── main.py # FastAPI app entry point
└── .env # Environment variables (NOT committed)


---

## ⚙️ Environment Variables

Create a `.env` file in the `backend_task/` directory with:



**Note:** `.env` file is excluded using `.gitignore` for security reasons.

---

## 📦 Local Setup Instructions

```bash
# 1. Clone the repo
git clone https://github.com/RahulChaudhary8/HROne_Task-Challenge.git

# 2. Navigate to the backend folder
cd HROne_Task-Challenge/backend_task

# 3. Create a virtual environment and activate
python -m venv .venv
# For Windows
.venv\Scripts\activate
# For Linux/Mac
source .venv/bin/activate

# 4. Install dependencies
pip install -r requirements.txt

# 5. Create a .env file with the Mongo URL
# (see .env section above)

# 6. Run the server
uvicorn main: app-- reload


🚀 Deployment
The backend is deployed on Render using the following settings:

Python Version: 3.13

Start Command: uvicorn main: app-- host 0.0.0.0-- port 10000

Environment Variables configured via the Render dashboard

🔐 Security Notice
.env file is not pushed to GitHub and is listed in .gitignore

Please ensure to never expose database credentials

🙋 Author
👤 Rahul Chaudhary
📍 Greater Noida, India
🌐 GitHub
