// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
  // hide results
  document.getElementById('results').style.display = 'none';
  // show loader
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 1000);


  e.preventDefault();
});
console.log('working');

// clculate results 
 function calculateResults() {
  console.log('calculating');
  // ui vars
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');

  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');


  const principal = parseFloat(amount.value);
  const calcInterest = parseFloat(interest.value) / 100 / 12;
  const calcPayments = parseFloat(years.value) * 12;

  //compute monthly payment
  const x = Math.pow(1 + calcInterest, calcPayments);
  const monthly = (principal * x * calcInterest) / (x - 1);
  
  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calcPayments).toFixed(2);
    totalInterest.value = ((monthly * calcPayments) - principal).toFixed(2);

    document.getElementById('results').style.display = 'block';
    document.getElementById('loading').style.display = 'none';
  } else {
    
    showError('please check numbers');
    document.getElementById('results').style.display = 'none';
    document.getElementById('loading').style.display = 'none';
  }
}

// show error
 function showError(err) {
   // create div
  const errDiv = document.createElement('div');
  // get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  // add class
  errDiv.className = 'alert alert-danger';
  // create text node and append
  errDiv.appendChild(document.createTextNode(err));
  // insert erro above heading
  card.insertBefore(errDiv, heading);

  //clear error after 3 secs
  setTimeout(clearErr, 3000);
 }

 // clear err
 function clearErr() {
   document.querySelector('.alert').remove();
 }
