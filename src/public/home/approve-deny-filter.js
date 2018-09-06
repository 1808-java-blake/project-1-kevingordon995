function filterTable() {
    // Declare variables 
    let input, filter, table, tr, td, i;
    input = document.getElementById("filter-id");
    filter = input.value.toUpperCase();
    table = document.getElementById("ticket-table");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[5];
      if (td) {
        if (td.innerHTML.toUpperCase().indexOf(filter) > - 1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      } 
    }
  }
function approvedTicket(event) {
    event.preventDefault();

    const receipt = document.getElementById('approve-id').value;
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDay() + 2;
    let hour = today.getHours();
    let min = today.getMinutes();
    if (month < 10) {
        month = '0' + month;
    }
    if (day < 10) {
        day = '0' + day;
    }
    if (min < 10) {
        min = '0' + min;
    }
    let submitted = year + '-' + day + '-' + month + ' ' + hour + ':' + min;

    const resolved = {
        receipt,
        submitted
    }
    fetch(`http://localhost:3000/managers/approved`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(resolved)
    })
        .then(resp => resp.json())
        .then(resp => {
            window.location = 'http://localhost:3000/home/approve-deny.html';
        })
        .catch(err => {
            console.log(err);
        });
}
function deniedTicket(event) {
    event.preventDefault();

    const receipt = document.getElementById('deny-id').value;
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDay() + 2;
    let hour = today.getHours();
    let min = today.getMinutes();
    if (month < 10) {
        month = '0' + month;
    }
    if (day < 10) {
        day = '0' + day;
    }
    if (min < 10) {
        min = '0' + min;
    }
    let submitted = year + '-' + day + '-' + month + ' ' + hour + ':' + min;

    const resolved = {
        receipt,
        submitted
    }
    fetch(`http://localhost:3000/managers/denied`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(resolved)
    })
        .then(resp => resp.json())
        .then(resp => {
            window.location = 'http://localhost:3000/home/approve-deny.html';
        })
        .catch(err => {
            console.log(err);
        });
}