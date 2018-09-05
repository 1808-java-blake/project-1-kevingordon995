function filterTable(event) {
    event.preventDefault();
    const column = document.getElementById('filter-col').value;
}
function approvedTicket(event) {
    event.preventDefault();

    const receipt = document.getElementById('approve-id').value;
    const resolver = 17;
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
        resolver,
        submitted
    }
    fetch(`http://localhost:3000/tickets/approved`, {
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
    const resolver = 17;
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
        resolver,
        submitted
    }
    fetch(`http://localhost:3000/tickets/denied`, {
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