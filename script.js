let balance = 0 ;

const success = new Audio("success.mp3")
const fail = new Audio("fail.mp3")

const balanceElement = document.getElementById('balance');
const addFunds = document.getElementById('add-funds');
const makePayment = document.getElementById('make-payment');
const TransactionList = document.getElementById('Transaction-details-list');
const transactionHist = document.getElementById('transaction-list');

addFunds.addEventListener('click',()=>{
    const amount = parseFloat(prompt('Enter the amount you want to add::'));
    if(!isNaN(amount) && amount > 0)
    {
        balance += amount;
        updateBal();
    }
    else{
        alert('Amount entered is Invalid');
    }
})

function updateBal(){
    balanceElement.textContent = `${balance.toFixed(2)}`;
    console.log(balanceElement);
}

const performPay = (sendAmount) => {
    return new Promise((resolve,reject)=>{
        if(sendAmount <= 0){
            reject("Invalid Amount");
            fail.play();
        }else if(sendAmount > balance){
            reject("Transaction Failed! Insufficient balance.");
            fail.play();
        }else{
            setTimeout(()=>{
                balance -= sendAmount;
                resolve("Payment Successfull.");
                success.play();
            },1000);
        }
    })
}

makePayment.addEventListener('click',()=>{
    const sendAmount = parseFloat(prompt('Enter amount you want to transfer::'));
    if(!isNaN(sendAmount)){
        performPay(sendAmount)
        .then((message)=>{
            balanceElement.textContent = `${balance.toFixed(2)}`;
            TransactionList.textContent = message;

            const listItem =  document.createElement('li');
            listItem.innerHTML = `
            <span>Payment of $${sendAmount.toFixed(2)} on </span>
            <span>${new Date().toLocaleString()}</span>
            `;

            transactionHist.appendChild(listItem)
        }).catch((error)=>{
            TransactionList.textContent = error;
        })
    }else{
        fail.play();
        TransactionList.textContent = "Invalid Amount";
    }
})
