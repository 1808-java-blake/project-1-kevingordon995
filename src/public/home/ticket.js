function addTicketToTable(ticket) {
    const tbody = document.getElementById('reimb-table-body');
    tbody.innerHTML += `
    <tr>
      <th scope="row">${ticket.id}</th>
      <td>${ticket.amount}</td>
      <td>${ticket.submitted}</td>
      <td>${ticket.resolved}</td>
      <td>${ticket.description}</td>
    </tr>
    `
  }
  
  fetch('http://localhost:3000/data/tickets')
    .then(res => res.json())
    .then(res => {
      res.forEach(ticket => {
        addTicketToTable(ticket);
      })
    })
    .catch(err => {
      console.log(err);
    })
    function createCertifTicket(event) {
        event.preventDefault();
        let today = new Date();
        let day = today.getDate();
        let month = today.getMonth();
        let year = today.getFullYear();
        if(day < 10) {
            day = '0' + day;
        } 
        
        if(month < 10) {
            month = '0' + month;
        }
        const amount = document.getElementById('reimb-amount').value;
        const description = document.getElementById('description').value;
        const submitted = year + '-' + month + '-' + day;
      
        const ticket = {
            amount,
            description,
            submitted,
        }
        
        fetch('http://localhost:3000/data/tickets', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(movie)
        })
        .then(resp => resp.json())
        .then(resp => {
          window.location = 'http://localhost:3000/home/employee-home.html';
        })
        .catch(err => {
          console.log(err);
        });
      }
      function createMedicalTicket(event) {
        event.preventDefault();
        let today = new Date();
        let day = today.getDate();
        let month = today.getMonth();
        let year = today.getFullYear();
        if(day < 10) {
            day = '0' + day;
        } 
        
        if(month < 10) {
            month = '0' + month;
        }
        const amount = document.getElementById('reimb-amount').value;
        const description = document.getElementById('description').value;
        const submitted = year + '-' + month + '-' + day;
      
        const ticket = {
          amount,
          description,
          submitted,
        }
        
        fetch('http://localhost:3000/data/tickets', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(movie)
        })
        .then(resp => resp.json())
        .then(resp => {
          window.location = 'http://localhost:3000/home/employee-home.html';
        })
        .catch(err => {
          console.log(err);
        });
      }
      function createTravelTicket(event) {
        event.preventDefault();
        let today = new Date();
        let day = today.getDate();
        let month = today.getMonth();
        let year = today.getFullYear();
        if(day < 10) {
            day = '0' + day;
        } 
        
        if(month < 10) {
            month = '0' + month;
        }
        const amount = document.getElementById('reimb-amount').value;
        const description = document.getElementById('description').value;
        const submitted = year + '-' + month + '-' + day;
      
        const ticket = {
          amount,
          description,
          submitted,
        }
        
        fetch('http://localhost:3000/data/tickets', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(movie)
        })
        .then(resp => resp.json())
        .then(resp => {
          window.location = 'http://localhost:3000/home/employee-home.html';
        })
        .catch(err => {
          console.log(err);
        });
      }