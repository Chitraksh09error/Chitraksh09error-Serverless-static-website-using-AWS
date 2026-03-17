import json
import boto3
import uuid
import datetime
from decimal import Decimal

dynamodb = boto3.resource('dynamodb')
accounts = dynamodb.Table('accounts')
transactions = dynamodb.Table('transactions')
sns = boto3.client('sns')

TOPIC_ARN = "arn:aws:sns:us-east-1:833660969227:atm-alerts"

def decimal_default(obj):
    if isinstance(obj, Decimal):
        return float(obj)
    raise TypeError

def generate_account():
    return str(uuid.uuid4().int)[:10]

def send_alert(message):
    sns.publish(
        TopicArn=TOPIC_ARN,
        Message=message,
        Subject="ATM Transaction Alert"
    )

def lambda_handler(event, context):
    try:
        body = json.loads(event.get("body", "{}"))
        action = body.get("action")

        # CREATE ACCOUNT
        if action == "create":
            acc_id = generate_account()
            accounts.put_item(Item={
                "account_id": acc_id,
                "name": body["name"],
                "pin": body["pin"],
                "balance": Decimal("0"),
                "email": body["email"],
                "phone": body["phone"]
            })
            payload = {"message": "Account Created", "account_id": acc_id}

        # LOGIN
        elif action == "login":
            acc = accounts.get_item(Key={"account_id": body["account_id"]})
            if "Item" not in acc:
                payload = {"message": "Account not found"}
            elif acc["Item"]["pin"] != body["pin"]:
                payload = {"message": "Wrong PIN"}
            else:
                payload = {
                    "message": "Login Successful",
                    "name": acc["Item"]["name"],
                    "balance": float(acc["Item"]["balance"])
                }

        # BALANCE
        elif action == "balance":
            acc = accounts.get_item(Key={"account_id": body["account_id"]})["Item"]
            payload = {"balance": float(acc["balance"])}

        # DEPOSIT
        elif action == "deposit":
            amount = int(body["amount"])
            acc = accounts.get_item(Key={"account_id": body["account_id"]})["Item"]
            new_balance = acc["balance"] + amount
            accounts.update_item(
                Key={"account_id": body["account_id"]},
                UpdateExpression="set balance=:b",
                ExpressionAttributeValues={":b": new_balance}
            )
            tid = str(uuid.uuid4())
            transactions.put_item(Item={
                "transaction_id": tid,
                "account_id": body["account_id"],
                "type": "deposit",
                "amount": amount,
                "date": str(datetime.datetime.now())
            })
            send_alert(f"{acc['name']} deposited ₹{amount}. Balance ₹{new_balance}")
            payload = {"message": "Deposit successful", "balance": float(new_balance)}

        # WITHDRAW
        elif action == "withdraw":
            amount = int(body["amount"])
            acc = accounts.get_item(Key={"account_id": body["account_id"]})["Item"]
            if acc["balance"] < amount:
                payload = {"error": "Insufficient balance"}
            else:
                new_balance = acc["balance"] - amount
                accounts.update_item(
                    Key={"account_id": body["account_id"]},
                    UpdateExpression="set balance=:b",
                    ExpressionAttributeValues={":b": new_balance}
                )
                tid = str(uuid.uuid4())
                transactions.put_item(Item={
                    "transaction_id": tid,
                    "account_id": body["account_id"],
                    "type": "withdraw",
                    "amount": amount,
                    "date": str(datetime.datetime.now())
                })
                send_alert(f"{acc['name']} withdrew ₹{amount}. Balance ₹{new_balance}")
                payload = {"message": "Withdraw successful", "balance": float(new_balance)}

        else:
            payload = {"error": "Invalid action"}

        return {
            "statusCode": 200,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps(payload)
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"error": str(e)})
        }