# Distributed Transaction System with NestJS, Kafka, and Docker

This repository implements a distributed transaction system using **NestJS**, **Kafka**, and **Docker**. It simulates a system where multiple databases (Bank A and Bank B) manage balances, and a **Transaction Coordinator** handles distributed transactions using the Two-Phase Commit Protocol (2PC).

## Features

- **Distributed Transactions**: Ensures consistency across multiple services.
- **Two-Phase Commit Protocol (2PC)**: Guarantees atomicity of transactions.
- **Kafka Integration**: Manages inter-service communication.
- **Simulated Databases**: Represents bank balances in memory.
- **Dockerized Setup**: Runs services and Kafka locally using Docker.

---

## System Architecture

### Components

1. **Transaction Coordinator**: Orchestrates distributed transactions using Kafka.
2. **Bank A Service**: Manages account balances for Bank A.
3. **Bank B Service**: Manages account balances for Bank B.
4. **Kafka**: Handles message passing between the services.

### Transaction Flow

1. **Prepare Phase**:
   - The Transaction Coordinator sends a `prepare` message to Bank A and Bank B.
   - Each bank validates if the operation can be performed and responds with `YES` or `NO`.
2. **Commit/Abort Phase**:
   - If all services respond with `YES`, the Transaction Coordinator sends a `commit` message.
   - If any service responds with `NO`, the Transaction Coordinator sends an `abort` message.

---

## Setup Instructions

### Prerequisites

- **Node.js** and **npm**
- **Docker** and **Docker Compose**

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/distributed-transaction-system.git
   cd distributed-transaction-system
   ```

2. Install dependencies for all services:

   ```bash
   cd transaction-coordinator && npm install
   cd ../bank-a && npm install
   cd ../bank-b && npm install
   ```

### Running the System

1. Start Kafka and services using Docker Compose:

   ```bash
   docker-compose up --build
   ```will run:
   - **Transaction Coordinator**: `http://localhost:3001`
   - **Bank A Service**: `http://localhost:3002`
   - **Bank B Service**: `http://localhost:3003`

---

## Usage

### Simulating a Transaction

Send a POST request to the **Transaction Coordinator** to initiate a transaction:

```bash
POST http://localhost:3001/transaction
Content-Type: application/json

{
  "transactionId": "12345",
  "bankA": {
    "account": "account1",
    "amount": 100
  },
  "bankB": {
    "account": "account1",
    "amount": 100
  }
}
```

### Observing Logs

1. The following services

Check the logs in the console to observe the transaction flow:

- **Prepare Phase**: Banks validate the transaction.
- **Commit/Abort Phase**: Coordinator decides based on bank responses.

---

## Repository Structure

```text
.
├── transaction-coordinator/
│   ├── src/
│   ├── Dockerfile
│   └── ...
├── bank-a/
│   ├── src/
│   ├── Dockerfile
│   └── ...
├── bank-b/
│   ├── src/
│   ├── Dockerfile
│   └── ...
├── docker-compose.yml
└── README.md
```

---

## Extending the System

- Add more services to simulate additional banks or systems.
- Implement persistent storage (e.g., PostgreSQL) for balances instead of in-memory data.
- Enhance error handling and logging.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
