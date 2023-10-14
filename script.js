let totalIncome = 0;
let totalExpense = 0;
let incomeItemCounter = 0;
let expenseItemCounter = 0;

function calculateFinances() {
  const startingBankBal = $('#startingBankBal').val();
  let newIncomeAmt = Number(startingBankBal) + Number(totalIncome);
  let netTotal = newIncomeAmt - Number(totalExpense);

  //  UPDATE INCOME TOTAL INCOME
  $('#totalIncomeAmt').text(newIncomeAmt);

  //  UPDATE SUMMARY TOTAL INCOME
  $('#totalIncome').text(newIncomeAmt);

  //  UPDATE EXPENSE TOTAL EXPENSE
  $('#totalExpenseAmt').text(totalExpense);

  //  UPDATE SUMMARY TOTAL EXPENSE
  $('#totalExpenses').text(totalExpense);

  //  UPDATE SUMMARY TOTAL NET
  $('#totalNet').text(netTotal);
}

function removeIncome(amt, index) {
  // remove from total income
  totalIncome -= Number(amt);

  // remove from ui
  // grab all income li elements
  const listItems = document.querySelectorAll('.incomeItem');
  // loop through array and remove li with corresponding id
  // console.log(`listItems before:`, listItems);
  for (const item of listItems) {
    console.log(`checking item: ${item}`);
    if (Number(item.dataset.incomeItemId) === index) {
      // console.log('found item');
      item.remove();
    }
  }
  // console.log(`listItems after:`, listItems);

  // recalculate income
  calculateFinances();
}

function removeExpense(amt, index) {
  // remove from total expense
  totalExpense -= Number(amt);

  // remove from ui
  // grab all expense li elements
  const listItems = document.querySelectorAll('.expenseItem');
  // loop through array and remove li with corresponding id
  // console.log(`listItems before:`, listItems);
  for (const item of listItems) {
    // console.log(`checking item: ${item}`);
    if (Number(item.dataset.expenseItemId) === index) {
      // console.log('found item');
      item.remove();
    }
  }
  // console.log(`listItems after:`, listItems);

  // recalculate income
  calculateFinances();
}

$('#startingBankBal').on('input', function () {
  const startingBankBal = $('#startingBankBal').val();
  console.log(startingBankBal);
  calculateFinances();
});

$('#addIncomeBtn').on('click', function (e) {
  e.preventDefault();
  const incomeName = $('#incomeName').val();
  const incomeAmt = $('#incomeAmount').val();
  const newStr = `
  <li class="incomeItem" data-income-item-id="${incomeItemCounter}">
    <p><span>${incomeName}:</span> + $${Number(incomeAmt)}</p>
    <button type="button" class="btn btn-info btn-sm" onclick="removeIncome(${Number(
      incomeAmt
    )}, ${incomeItemCounter});">Remove</button>
  </li>
  `;

  incomeItemCounter++;

  totalIncome += Number(incomeAmt);

  $('#incomeList').append(newStr);

  $('#incomeName').val('');
  $('#incomeAmount').val('');
  $('#incomeName').focus();

  calculateFinances();
});

$('#addExpenseBtn').on('click', function (e) {
  e.preventDefault();
  const expenseName = $('#expenseName').val();
  const expenseAmount = $('#expenseAmount').val();
  console.log(`${expenseName} - ${expenseAmount}`);
  const newStr = `
  <li class="expenseItem" data-expense-item-id="${expenseItemCounter}">
    <p><span>${expenseName}:</span> - $${Number(expenseAmount)}</p>
    <button type="button" class="btn btn-info btn-sm" onclick="removeExpense(${Number(
      expenseAmount
    )}, ${expenseItemCounter});">Remove</button>
  </li>
  `;

  expenseItemCounter++;

  totalExpense += Number(expenseAmount);

  $('#expenseList').append(newStr);

  $('#expenseName').val('');
  $('#expenseAmount').val('');
  $('#expenseName').focus();

  calculateFinances();
});
