Detailed Description / README Overview:

Serverless ATM Web Application

This project is a fully functional ATM simulation built using AWS serverless technologies. Users can:

Create an account with name, email, phone, and PIN

Login securely using account ID and PIN

Check balance in real-time

Deposit and withdraw funds

Receive dynamic ATM-style receipts on the webpage

Get transaction alerts via SMS and email using AWS SNS

Features:

Serverless architecture: No servers to manage; uses AWS Lambda + API Gateway.

DynamoDB integration: Accounts and transactions stored in NoSQL DynamoDB tables.

Modern, responsive UI: Includes ATM-style receipt printing on the right side.

Realistic transaction alerts: Notifications sent to users via AWS SNS.

UTF-8 support: Proper display of the ₹ currency symbol.

Tech Stack:

Frontend: HTML, CSS, JavaScript

Backend: AWS Lambda (Python)

Storage: Amazon DynamoDB

API: Amazon API Gateway

Hosting: Amazon S3 (static web hosting)

Notifications: AWS SNS for email/SMS alerts

How It Works:

User interacts with the web interface hosted on S3.

All requests (create, login, deposit, withdraw, balance) are sent to Lambda via API Gateway.

Lambda updates DynamoDB and sends back JSON responses.

The frontend parses the responses and prints ATM-style receipts dynamically.

For deposits/withdrawals, AWS SNS sends SMS/email notifications in real-time.

Screenshots:

[Screenshot of account creation]

[Screenshot of login + balance]

[Screenshot of ATM receipt]

Setup Instructions:

Deploy accounts and transactions tables in DynamoDB.

Create Lambda function with full access to DynamoDB and SNS.

Configure API Gateway with POST /atm endpoint connected to Lambda.

Host frontend in S3 static website and update API URL in JS.

Subscribe an email/phone number in SNS topic to receive transaction alerts.
