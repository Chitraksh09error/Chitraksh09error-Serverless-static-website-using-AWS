# Serverless ATM Web App

![AWS](https://img.shields.io/badge/AWS-serverless-orange)
![Serverless](https://img.shields.io/badge/Architecture-Serverless-blue)
![HTML/CSS/JS](https://img.shields.io/badge/Frontend-HTML,CSS,JS-yellowgreen)
![CloudFront](https://img.shields.io/badge/CDN-CloudFront-lightblue)
![License](https://img.shields.io/badge/License-MIT-green)

A **serverless web-based ATM simulation** using AWS (S3, Lambda, API Gateway, DynamoDB, SNS, CloudFront) with modern UI, real-time transaction receipts, and secured public access.

---

## Overview

This project is a **fully functional ATM simulation** built using **AWS serverless technologies**. Users can:

* **Create an account** with name, email, phone, and PIN
* **Login** securely using account ID and PIN
* **Check balance** in real-time
* **Deposit and withdraw funds**
* Receive **dynamic ATM-style receipts** on the webpage
* Get **transaction alerts via SMS and email** using **AWS SNS**
* Access the frontend securely via **CloudFront** with controlled public access

---

## Features

* **Serverless architecture**: No servers to manage; uses AWS Lambda + API Gateway  
* **DynamoDB integration**: Accounts and transactions stored in **NoSQL DynamoDB tables**  
* **Modern, responsive UI**: Includes **ATM-style receipt printing**  
* **Realistic transaction alerts**: Notifications sent to users via **AWS SNS**  
* **UTF-8 support**: Proper display of the **₹ currency symbol**  
* **Secure and fast hosting**: Frontend delivered via **AWS CloudFront** with restricted public access, caching, and HTTPS  

---

## Tech Stack

* **Frontend**: HTML, CSS, JavaScript  
* **Backend**: AWS Lambda (Python)  
* **Storage**: Amazon DynamoDB  
* **API**: Amazon API Gateway  
* **Hosting**: Amazon S3 + CloudFront  
* **Notifications**: AWS SNS for email/SMS alerts  
* **Security & Performance**: AWS CloudFront CDN to protect S3 bucket, provide HTTPS, and speed up content delivery  

---

## How It Works

1. User interacts with the **web interface** hosted on S3 and delivered via **CloudFront**  
2. All requests (create, login, deposit, withdraw, balance) are sent to **Lambda via API Gateway**  
3. Lambda updates **DynamoDB** and sends back JSON responses  
4. The frontend **parses the responses** and prints **ATM-style receipts** dynamically  
5. For deposits/withdrawals, AWS SNS **sends SMS/email notifications** in real-time  
6. CloudFront ensures **secure access**, HTTPS delivery, and optional access restrictions  

---

## Setup Instructions

1. Deploy **accounts** and **transactions** tables in DynamoDB  
2. Create **Lambda function** with full access to DynamoDB and SNS  
3. Configure **API Gateway** with POST `/atm` endpoint connected to Lambda  
4. Host frontend in **S3 static website** and set up **CloudFront** distribution  
5. Update API URL in JS to use **CloudFront domain**  
6. Subscribe an email/phone number in **SNS topic** to receive transaction alerts  
7. Optionally restrict CloudFront access using **signed URLs or OAI** (Origin Access Identity) to protect the S3 bucket  

---

## Screenshots

![1](Images/1.png)
![2](Images/2.png)
![3](Images/3.png)
![4](Images/4.png)
![5](Images/5.png)
![6](Images/6.png)
![7](Images/7.png)
![8](Images/8.png)
![9](Images/9.png)
![10](Images/10.png)
![11](Images/11.png)
![12](Images/12.png)
![13](Images/13.png)
![14](Images/14.jpg.jpeg)

---

**Author:** Chitraksh Chavan