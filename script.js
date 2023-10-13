let totalIncome = 0;
let totalExpense = 0;
let incomeItemCounter = 0;

function calculateIncome() {
  const startingBankBal = $('#startingBankBal').val();
  let newAmt = Number(startingBankBal) + Number(totalIncome);

  //   UPDATE INCOME TOTAL INCOME
  $('#totalIncomeAmt').text(newAmt);

  //   UPDATE SUMMARY TOTAL INCOME
  $('#totalIncome').text(newAmt);
}

function removeIncome(amt, index) {
  // remove from total income
  totalIncome -= Number(amt);

  // remove from ui
  // grab all income li elements
  const listItems = document.querySelectorAll('.incomeItem');
  // loop through array and remove li with corresponding id
  console.log(`listItems before:`, listItems);
  for (const item of listItems) {
    console.log(`checking item: ${item}`);
    if (Number(item.dataset.incomeItemId) === index) {
      console.log('found item');
      // console.log(`index of item: ${listItems.indexOf(item)}`);
      // listItems.splice(item.dataset.incomeItemId, 1);
      // listItems.remove(item);
      item.remove();
    }
  }
  console.log(`listItems after:`, listItems);

  // replace ui with new list
  // const incomeList = document.getElementById('incomeList');
  // incomeList.innerHTML = '';
  // for (const item of listItems) {
  //   incomeList.append(item);
  // }

  // recalculate income
  calculateIncome();
}

$('#startingBankBal').on('input', function () {
  const startingBankBal = $('#startingBankBal').val();
  console.log(startingBankBal);
  calculateIncome();
});

$('#addIncomeBtn').on('click', function (e) {
  e.preventDefault();
  const incomeName = $('#incomeName').val();
  const incomeAmt = $('#incomeAmount').val();
  const newStr = `
  <li class="incomeItem" data-income-item-id="${incomeItemCounter}">
    <p><span>${incomeName}:</span> $${Number(incomeAmt)}</p>
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

  calculateIncome();
});
