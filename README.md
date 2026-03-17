# Serverless ATM Web App

![AWS](https://img.shields.io/badge/AWS-serverless-orange)
![Serverless](https://img.shields.io/badge/Architecture-Serverless-blue)
![HTML/CSS/JS](https://img.shields.io/badge/Frontend-HTML,CSS,JS-yellowgreen)
![License](https://img.shields.io/badge/License-MIT-green)

A **serverless web-based ATM simulation** using AWS (S3, Lambda, API Gateway, DynamoDB, SNS) with modern UI and real-time transaction receipts.

---

## Overview

This project is a **fully functional ATM simulation** built using **AWS serverless technologies**. Users can:

* **Create an account** with name, email, phone, and PIN
* **Login** securely using account ID and PIN
* **Check balance** in real-time
* **Deposit and withdraw funds**
* Receive **dynamic ATM-style receipts** on the webpage
* Get **transaction alerts via SMS and email** using **AWS SNS**

---

## Features

* **Serverless architecture**: No servers to manage; uses AWS Lambda + API Gateway  
* **DynamoDB integration**: Accounts and transactions stored in **NoSQL DynamoDB tables**  
* **Modern, responsive UI**: Includes **ATM-style receipt printing**  
* **Realistic transaction alerts**: Notifications sent to users via **AWS SNS**  
* **UTF-8 support**: Proper display of the **₹ currency symbol**

---

## Tech Stack

* **Frontend**: HTML, CSS, JavaScript  
* **Backend**: AWS Lambda (Python)  
* **Storage**: Amazon DynamoDB  
* **API**: Amazon API Gateway  
* **Hosting**: Amazon S3 (static web hosting)  
* **Notifications**: AWS SNS for email/SMS alerts

---

## How It Works

1. User interacts with the **web interface** hosted on S3  
2. All requests (create, login, deposit, withdraw, balance) are sent to **Lambda via API Gateway**  
3. Lambda updates **DynamoDB** and sends back JSON responses  
4. The frontend **parses the responses** and prints **ATM-style receipts** dynamically  
5. For deposits/withdrawals, AWS SNS **sends SMS/email notifications** in real-time

---

## Setup Instructions

1. Deploy **accounts** and **transactions** tables in DynamoDB  
2. Create **Lambda function** with full access to DynamoDB and SNS  
3. Configure **API Gateway** with POST `/atm` endpoint connected to Lambda  
4. Host frontend in **S3 static website** and update API URL in JS  
5. Subscribe an email/phone number in **SNS topic** to receive transaction alerts

---

## Screenshots

### Account Creation
![Account Creation](Images/1.png)

### Login & Balance
![Login & Balance](Images/2.png)

### Deposit & Withdrawal
![Deposit & Withdrawal](Images/3.png)

### ATM Receipt Display
![ATM Receipt Display](Images/4.png)

### Transaction Alerts (SNS)
![Transaction Alerts](Images/5.png)

### Responsive UI
![Responsive UI](Images/6.png)

---

**Author:** Chitraksh Chavan
