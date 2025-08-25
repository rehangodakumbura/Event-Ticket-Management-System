# 🎟️ Real-Time Event Ticket Management System

## 📌 Overview
The **Event Ticket Management System** is a real-time ticketing application built using **React.js (frontend)**, **Spring Boot (backend)**, and a **Java CLI (configuration & logging)**.  
It implements the **Producer-Consumer pattern** with **multi-threading and synchronization** to simulate ticket vendors releasing tickets and customers purchasing them concurrently while maintaining **data integrity**.

This project was developed as part of a coursework assignment focused on **Object-Oriented Programming (OOP)**, **multi-threading**, and **system design**.

---

## 🚀 Features
- **Real-time Ticketing Simulation**  
  - Vendors (Producers) release tickets concurrently.  
  - Customers (Consumers) purchase tickets concurrently.  

- **Concurrency & Synchronization**  
  - Handles multiple threads safely using synchronized methods.  
  - Prevents race conditions and ensures data integrity.

- **Configurable Parameters (via CLI or UI)**  
  - Total number of tickets.  
  - Ticket release rate.  
  - Customer retrieval rate.  
  - Maximum ticket capacity.  

- **Logging**  
  - Activity logs (ticket releases, purchases, errors).  
  - File-based logging using `FileWriter` and console logs.  

- **Frontend (React.js)**  
  - Configure system parameters via UI.  
  - Display ticket availability in real time.  
  - Control panel for starting/stopping the system.  
  - Log viewer to monitor system activity.  

- **Backend (Spring Boot)**  
  - RESTful APIs for managing tickets, vendors, and customers.  
  - Thread-safe operations on the shared ticket pool.  

- **Command-Line Interface (CLI)**  
  - Configure parameters interactively.  
  - Start/stop simulation.  
  - View logs.  

---

## 🛠️ Tech Stack
- **Frontend:** React.js (JavaScript, Tailwind CSS)  
- **Backend:** Spring Boot (Java, REST APIs)  
- **Database:** MongoDB  
- **CLI:** Java (Gson for config, FileWriter for logging)  
- **Concurrency Model:** Producer-Consumer with Multi-threading  

---

## ⚙️ System Architecture
- **TicketPool** → Shared resource where tickets are added/removed.  
- **Vendors (Producers)** → Add tickets concurrently.  
- **Customers (Consumers)** → Retrieve tickets concurrently.  
- **Synchronization** → Ensures thread safety and prevents race conditions.  

**Key Classes:**  
- `TicketPool` → Manages available tickets.  
- `Vendor` → Releases tickets into the pool.  
- `Customer` → Purchases tickets from the pool.  
- `Configuration` → Handles system parameters.  
- `Logger` → Handles console & file-based logging.  

---

## 📂 Project Structure
event-ticket-system/
│── frontend/ (React.js app)
│ ├── src/
│ ├── components/
│ └── pages/
│
│── backend/ (Spring Boot app)
│ ├── src/main/java/com/ticketing/
│ └── resources/
│
│── cli/ (Java CLI application)
│ ├── src/
│ └── config/
│
└── README.md

yaml
Copy
Edit

---

## 🖥️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/event-ticket-system.git
cd event-ticket-system
2️⃣ Backend (Spring Boot)
Prerequisites: Java 17+, Maven

bash
Copy
Edit
cd backend
mvn spring-boot:run
Backend will run on: http://localhost:8080

3️⃣ Frontend (React.js)
Prerequisites: Node.js 18+, npm

bash
Copy
Edit
cd frontend
npm install
npm start
Frontend will run on: http://localhost:3000

4️⃣ CLI (Java)
Prerequisites: Java 17+

bash
Copy
Edit
cd cli
javac Main.java
java Main
📊 Usage
Configure system parameters (via CLI or UI):

Total tickets

Release rate

Retrieval rate

Max capacity

Start simulation:

Vendors add tickets to the pool.

Customers retrieve tickets concurrently.

Monitor activity:

Logs are displayed on the UI and saved in log files.

Ticket availability updates in real time.

📈 Optional Advanced Features
✅ Priority Customers (VIP handling with Priority Queue).

✅ Dynamic Vendor/Customer Management (add/remove threads at runtime).

✅ Real-Time Analytics Dashboard (ticket sales chart).

✅ Database Persistence (MongoDB for storing tickets & logs).

🧪 Testing
Unit tests for ticket pool synchronization.

Stress tests with multiple vendors/customers.

Integration tests for frontend-backend communication.

📷 Demonstration
 Add screenshots of UI

 Add demo video link

👨‍💻 Author
Rehan Godakumbura

🎓 Software Engineering Student

🌐 LinkedIn | GitHub

📜 License
This project is licensed under the MIT License – feel free to use, modify, and distribute.

