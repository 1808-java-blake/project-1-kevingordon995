function filterTable() {
    // Declare variables 
    let input = document.getElementById("filter-id");
    let filter = input.value.toUpperCase();
    let table = document.getElementById("ticket-table");
    let tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (let i = 0; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName("td")[5];
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
    if (month < 10) {
        month = '0' + month;
    }
    if (day < 10) {
        day = '0' + day;
    }
    let submitted = year + '-' + day + '-' + month;

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
        .then(resp => {
            if (resp.status === 403) {
                $('#error-modal').modal('show');
            } else {
                return resp.json();
            }
            throw 'Unauthorized Access';
        })
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
    if (month < 10) {
        month = '0' + month;
    }
    if (day < 10) {
        day = '0' + day;
    }
    let submitted = year + '-' + day + '-' + month;

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
        .then(resp => {
            if (resp.status === 403) {
                $('#error-modal').modal('toggle');
            } else {
                return resp.json();
            }
            throw 'Unauthorized Access';
        })
        .then(resp => {
            window.location = 'http://localhost:3000/home/approve-deny.html';
        })
        .catch(err => {
            console.log(err);
        });
}