# Real-Time Event Ticketing System

A comprehensive multi-threaded ticketing system built with **React**, **Spring Boot**, and **CLI** that simulates real-world event ticketing scenarios using advanced Producer-Consumer patterns and concurrent programming.

## 🎯 Project Overview

This system demonstrates a real-time event ticketing platform where multiple vendors (producers) can release tickets concurrently while customers (consumers) purchase them simultaneously. The application ensures data integrity and thread safety in a high-concurrency environment.

### Key Features

- **Multi-threaded Architecture**: Concurrent ticket release and purchase operations
- **Producer-Consumer Pattern**: Efficient resource management with vendors as producers and customers as consumers
- **Real-time Synchronization**: Thread-safe operations preventing race conditions and deadlocks
- **Configurable System Parameters**: Customizable ticket release rates, customer retrieval rates, and capacity limits
- **Multiple Interfaces**: Web UI (React), REST API (Spring Boot), and CLI support
- **Comprehensive Logging**: Detailed system activity tracking and error handling
- **Data Persistence**: Configuration and transaction logging

## 🛠️ Technology Stack

### Frontend
- **React.js** - Interactive web interface
- **JavaScript/TypeScript** - Frontend logic
- **CSS3** - Styling and responsive design

### Backend
- **Spring Boot** - RESTful API and business logic
- **Java** - Core programming language
- **Multi-threading** - Concurrent processing
- **Maven** - Dependency management

### CLI
- **Java** - Command-line interface implementation
- **Scanner** - User input handling

## 📋 System Requirements

### Prerequisites
- **Java**: Version 11 or higher
- **Node.js**: Version 14.x or higher
- **npm**: Version 6.x or higher
- **Maven**: Version 3.6 or higher
- **Git**: For version control

### Development Tools (Recommended)
- IntelliJ IDEA or Eclipse (Java development)
- Visual Studio Code (React development)
- Postman (API testing)

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/event-ticketing-system.git
cd event-ticketing-system
```

### 2. Backend Setup (Spring Boot)
```bash
# Navigate to backend directory
cd backend

# Install dependencies and build
mvn clean install

# Run the Spring Boot application
mvn spring-boot:run
```

The backend server will start on `http://localhost:8080`

### 3. Frontend Setup (React)
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

The frontend application will start on `http://localhost:3000`

### 4. CLI Setup
```bash
# Navigate to CLI directory
cd cli

# Compile Java files
javac -cp . *.java

# Run the CLI application
java TicketingSystemCLI
```

## ⚙️ Configuration

### System Parameters

The system can be configured with the following parameters:

| Parameter | Description | Default Value |
|-----------|-------------|---------------|
| `totalTickets` | Total number of tickets available | 100 |
| `ticketReleaseRate` | Rate at which vendors release tickets (ms) | 1000 |
| `customerRetrievalRate` | Rate at which customers attempt purchases (ms) | 1500 |
| `maxTicketCapacity` | Maximum ticket pool capacity | 50 |
| `numberOfVendors` | Number of concurrent vendor threads | 3 |
| `numberOfCustomers` | Number of concurrent customer threads | 5 |

### Configuration Methods

1. **Web Interface**: Use the configuration form in the React frontend
2. **CLI**: Follow the prompts when starting the CLI application
3. **Configuration File**: Modify `config.json` in the resources directory

```json
{
  "totalTickets": 100,
  "ticketReleaseRate": 1000,
  "customerRetrievalRate": 1500,
  "maxTicketCapacity": 50,
  "numberOfVendors": 3,
  "numberOfCustomers": 5
}
```

## 🎮 Usage

### Web Interface (React)

1. Navigate to `http://localhost:3000`
2. Configure system parameters using the settings panel
3. Click "Start System" to begin simulation
4. Monitor real-time ticket availability and transaction logs
5. Use "Stop System" to halt all operations

### CLI Interface

1. Run the CLI application: `java TicketingSystemCLI`
2. Enter configuration parameters when prompted
3. Choose from menu options:
   - Start ticket simulation
   - View current status
   - Stop system
   - Exit application

### REST API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/config` | Get current configuration |
| POST | `/api/config` | Update system configuration |
| POST | `/api/system/start` | Start the ticketing system |
| POST | `/api/system/stop` | Stop the ticketing system |
| GET | `/api/tickets/status` | Get current ticket pool status |
| GET | `/api/logs` | Retrieve system logs |

### Example API Usage

```bash
# Start the system
curl -X POST http://localhost:8080/api/system/start

# Check ticket status
curl -X GET http://localhost:8080/api/tickets/status

# Update configuration
curl -X POST http://localhost:8080/api/config \
  -H "Content-Type: application/json" \
  -d '{"totalTickets": 200, "ticketReleaseRate": 800}'
```

## 🏗️ Architecture

### Class Structure

- **`TicketPool`**: Thread-safe ticket management with synchronized operations
- **`Vendor`**: Producer threads that release tickets at configured intervals
- **`Customer`**: Consumer threads that attempt ticket purchases
- **`Configuration`**: System parameter management and persistence
- **`TicketingController`**: REST API endpoints and request handling
- **`LoggingService`**: Comprehensive activity logging and error tracking

### Design Patterns

- **Producer-Consumer Pattern**: Core architecture for ticket management
- **Singleton Pattern**: Configuration and logging services
- **Observer Pattern**: Real-time UI updates
- **Factory Pattern**: Thread creation and management

### Thread Safety

- **Synchronized Methods**: Critical sections protected with synchronization
- **Concurrent Collections**: Thread-safe data structures for ticket pool
- **Atomic Operations**: Ensuring data consistency across threads
- **Deadlock Prevention**: Careful resource acquisition ordering

## 📊 System Monitoring

### Real-time Metrics

- Current ticket availability
- Active vendor and customer threads
- Transaction success/failure rates
- System performance statistics

### Logging

- All ticket releases and purchases logged with timestamps
- Error tracking and exception handling
- Performance metrics and system health indicators
- Configurable log levels (INFO, DEBUG, ERROR)

## 🧪 Testing

### Running Tests

```bash
# Backend tests
cd backend
mvn test

# Frontend tests
cd frontend
npm test

# CLI tests
cd cli
java -cp junit.jar:. TestRunner
```

### Test Coverage

- Unit tests for core classes (Vendor, Customer, TicketPool)
- Integration tests for API endpoints
- Concurrency tests for thread safety verification
- Performance tests for high-load scenarios

## 🔧 Advanced Features

### Optional Enhancements

- **Priority Customers**: VIP customer queue implementation
- **Dynamic Thread Management**: Runtime vendor/customer adjustment
- **Real-time Analytics**: Live performance dashboards
- **Database Integration**: Persistent ticket and transaction storage
- **Load Balancing**: Multiple server instance support

## 🐛 Troubleshooting

### Common Issues

1. **Port Conflicts**
   - Change server ports in `application.properties`
   - Check for running processes on ports 3000 and 8080

2. **Thread Synchronization Issues**
   - Monitor logs for deadlock warnings
   - Adjust thread counts if performance degrades

3. **Memory Issues**
   - Increase JVM heap size: `-Xmx2g`
   - Monitor thread creation and cleanup

## 📝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a Pull Request

### Development Guidelines

- Follow Java coding standards and best practices
- Write comprehensive unit tests for new features
- Update documentation for API changes
- Ensure thread safety in concurrent operations

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- Course instructors and teaching assistants
- Java concurrency documentation and best practices
- Spring Boot and React.js communities
- Open source contributors and learning resources

## 📞 Support

For questions, issues, or contributions:
- Create an issue in the GitHub repository
- Contact: your.email@example.com
- Documentation: [Wiki](https://github.com/yourusername/event-ticketing-system/wiki)

---

⭐ **Star this repository if you found it helpful!** ⭐
