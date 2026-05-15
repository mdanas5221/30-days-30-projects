// ADD TRANSACTION BOX ELEMENTS
const balance = document.querySelector("#balance");
const totalIncome = document.querySelector("#total-income");
const totalExpense = document.querySelector("#total-expense");
const form = document.querySelector(".add-transaction-box")
const select = document.querySelector("#select");
const description = document.querySelector("#description");
const amount = document.querySelector("#amount");
const btn = document.querySelector("#add-btn");
const table = document.querySelector(".table");

// TRANSACTIONS ARRAY
let transaction = [];

// PUSH DATA INTO TRANSACTION ARRAY - FUNCTION
function pushData(id) {
  transaction.push({
    id: id,
    type: select.value,
    desc: description.value,
    amt: Number(amount.value),
  });
}

// CALCULATE TRANSACTIONS AND SHOW ON DISPLAY - FUNCTION
function calculateAmt() {
  let income = 0;
  let expense = 0;
  for (let i = 0; i < transaction.length; i++) {
    if (transaction[i].type === "Income") {
      income += transaction[i].amt;
    } else if (transaction[i].type === "Expense") {
      expense += transaction[i].amt;
    }
  }
  totalIncome.textContent = `$${income}.00`;
  totalExpense.textContent = `$${expense}.00`;
  balance.textContent = `$${income - expense}.00`;
}

// BUTTON LISTENER & CALL ADDTRANSACTION FUNCTION
btn.addEventListener("click", addTransaction);

// ADDTRANSACTION FUNCTION
function addTransaction() {
  if (
    select.value === "Select Type" ||
    !isNaN(description.value) ||
    isNaN(amount.value)
  ) {
    alert("Please add transaction first");
    return;
  }

  let id = Date.now()

  if (select.value === "Income") {
    pushData(id);
    calculateAmt();

    let box = document.createElement("div");
    box.classList.add("table-data", "row");
    box.setAttribute("data-id", id)
    box.innerHTML = `
              <p>${new Date().toLocaleDateString()}</p>
              <div class="income-badge">
                <p>${select.value}</p>
              </div>
              <p>${description.value}</p>
              <p>$${amount.value}.00</p>
              <p><i class="fa-solid fa-trash delete"></i></p>
              `;
    console.log(table.appendChild(box));
    select.value = "Select Type";
    description.value = "";
    amount.value = "";
  } else {
    pushData(id);
    calculateAmt();

    let box = document.createElement("div");
    box.classList.add("table-data", "row");
    box.setAttribute("data-id", id);
    box.innerHTML = `
              <p>${new Date().toLocaleDateString()}</p>
              <div class="expense-badge">
                <p>${select.value}</p>
              </div>
              <p>${description.value}</p>
              <p>$${amount.value}.00</p>
              <p><i class="fa-solid fa-trash delete"></i></p>
              `;
    console.log(table.appendChild(box));
    select.value = "Select Type";
    description.value = "";
    amount.value = "";
  }
}

// DELETE TRANSACTION FUNCTION & EVENTLISTENER
table.addEventListener("click", function(e){
  if(e.target.classList.contains("delete")){
    let deleteId = e.target.closest(".table-data").dataset.id;
    transaction = transaction.filter((item) => {
     return item.id !=  deleteId
    })
    calculateAmt()
    e.target.closest(".table-data").remove()
  }
})

// ENTER KEY EVENTLISTENER
form.addEventListener("keydown", function(e){
  if(e.key === "Enter"){
    addTransaction()
  }
})