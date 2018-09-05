function addTicketToTable(ticket) {
    const tbody = document.getElementById('reimb-table-body');
    tbody.innerHTML += `
    <tr>
      <th scope="row">${ticket.id}</th>
      <td>${ticket.amount}</td>
      <td>${ticket.submitted}</td>
      <td>${ticket.resolved}</td>
      <td>${ticket.description}</td>
      <td>${ticket.resolver}</td>
      <td id = "filter-col">${ticket.statusId}</td>
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