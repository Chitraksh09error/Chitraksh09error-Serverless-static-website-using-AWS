const API = "https://4998z1bzwe.execute-api.us-east-1.amazonaws.com/Production/atm";

let accountId = localStorage.getItem("accountId") || "";
let userName = "";

/* ---------------- PAGE NAVIGATION ---------------- */
function showCreate() { hideAll(); document.getElementById("create").classList.remove("hidden"); }
function showLogin() { hideAll(); document.getElementById("login").classList.remove("hidden"); }
function backHome() { hideAll(); document.getElementById("landing").classList.remove("hidden"); }
function hideAll() {
    ["landing","create","login","atm"].forEach(id => document.getElementById(id).classList.add("hidden"));
}

/* ---------------- CREATE ACCOUNT ---------------- */
function createAccount() {
    const name = document.getElementById("createName").value;
    const email = document.getElementById("createEmail").value;
    const phone = document.getElementById("createPhone").value;
    const pin = document.getElementById("createPin").value;
    if (!name || !email || !phone || !pin) { alert("Please fill all fields."); return; }

    fetch(API, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({action:"create", name, email, phone, pin})
    })
    .then(r => r.json())
    .then(data => {
        accountId = data.account_id;
        userName = name;
        localStorage.setItem("accountId", accountId);
        alert("Account Created!\nYour Account ID: " + accountId);
        enterATM();
    })
    .catch(err => console.error(err));
}

/* ---------------- LOGIN ---------------- */
function login() {
    const id = document.getElementById("loginAccount").value;
    const pin = document.getElementById("loginPin").value;
    if (!id || !pin) { alert("Enter Account ID and PIN."); return; }

    fetch(API, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({action:"login", account_id:id, pin})
    })
    .then(r => r.json())
    .then(payload => {
        if (payload.message === "Login Successful") {
            accountId = id;
            userName = payload.name;
            localStorage.setItem("accountId", accountId);
            enterATM();
        } else {
            alert(payload.message || payload.error);
        }
    })
    .catch(err => console.error(err));
}

/* ---------------- ENTER ATM DASHBOARD ---------------- */
function enterATM() {
    hideAll();
    document.getElementById("atm").classList.remove("hidden");
    document.getElementById("atmName").innerText = userName;
    document.getElementById("atmId").innerText = accountId;
    document.getElementById("amount").value = "";
}

/* ---------------- BALANCE ---------------- */
function balance() {
    if (!accountId) { alert("Login first."); return; }
    fetch(API, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({action:"balance", account_id:accountId})
    })
    .then(r => r.json())
    .then(payload => printBill("BALANCE", 0, payload.balance))
    .catch(err => console.error(err));
}

/* ---------------- DEPOSIT ---------------- */
function deposit() {
    const amount = document.getElementById("amount").value;
    if (!amount || isNaN(amount) || amount <= 0) { alert("Enter valid amount."); return; }

    fetch(API, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({action:"deposit", account_id:accountId, amount})
    })
    .then(r => r.json())
    .then(payload => {
        printBill("DEPOSIT", amount, payload.balance);
        document.getElementById("amount").value = "";
    })
    .catch(err => console.error(err));
}

/* ---------------- WITHDRAW ---------------- */
function withdraw() {
    const amount = document.getElementById("amount").value;
    if (!amount || isNaN(amount) || amount <= 0) { alert("Enter valid amount."); return; }

    fetch(API, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({action:"withdraw", account_id:accountId, amount})
    })
    .then(r => r.json())
    .then(payload => {
        if (payload.error) { alert(payload.error); return; }
        printBill("WITHDRAW", amount, payload.balance);
        document.getElementById("amount").value = "";
    })
    .catch(err => console.error(err));
}

/* ---------------- RECEIPT ---------------- */
function printBill(type, amount, balance) {
    document.getElementById("bill").innerText =
`-----------------------------
        ATOM FINANCE
          ATM RECEIPT
-----------------------------

Transaction : ${type}
Account ID  : ${accountId}
Amount      : ₹${amount}
Balance     : ₹${balance}

Date        : ${new Date().toLocaleString()}

-----------------------------
   Thank you for banking
        with ATOM
-----------------------------`;
}