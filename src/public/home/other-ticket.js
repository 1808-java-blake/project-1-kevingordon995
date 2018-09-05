function createOtherTicket(event) {
  event.preventDefault();

  const amount = document.getElementById('reimb-amount4').value;
  const description = document.getElementById('description4').value;
  const resolver = 13;
  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDay();
  let hour = today.getHours();
  let min = today.getMinutes();
  if (month < 10){
      month = '0' + month;
  }
  if (day < 10){
    day = '0' + day;
  }
  if (min < 10){
    min = '0' + min;
  }
  let submitted = year + '-' + day + '-' + month + ' ' + hour + ':' + min;

  const ticket = {
    amount,
    description,
    submitted,
    resolver
  }

  fetch(`http://localhost:3000/employees/tickets/other`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(ticket)
  })
  .then(resp => resp.json())
  .then(resp => {
    window.location = 'http://localhost:3000/home/employee-home.html';
  })
  .catch(err => {
    console.log(err);
  });
}