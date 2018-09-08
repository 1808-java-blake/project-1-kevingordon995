function addTicketToTable(ticket) {
  const tbody = document.getElementById('reimb-table-body');
  tbody.innerHTML += `
    <tr>
      <th scope="row">${ticket.id}</th>
      <td>$${ticket.amount}</td>
      <td>${ticket.submitted}</td>
      <td>${ticket.resolved}</td>
      <td>${ticket.description}</td>
      <td>${ticket.resolver}</td>
      <td>${ticket.statusId}</td>
      <td>${ticket.typeId}</td>
    </tr>
    `
}

fetch(`http://localhost:3000/tickets`)
  .then(res => res.json())
  .then(res => {
    res.forEach(ticket => {
      addTicketToTable(ticket);
    })
  })
  .catch(err => {
    console.log(err);
  })
function colorTable() {
  let table = document.getElementById("ticket-table");
  let tr = table.getElementsByTagName("tr");
  for (let i = 0; i < tr.length; i++) {
    let td = tr[i].getElementsByTagName("td")[5];
    if (td) {
      if (td.innerHTML === "1") {
        tr[i].setAttribute("class", "bg-primary");
      }
      else if (td.innerHTML === "2") {
        tr[i].setAttribute("class", "bg-success");
      }
      else if (td.innerHTML === "3") {
        tr[i].setAttribute("class", "bg-danger");
      }
    }
  }
}