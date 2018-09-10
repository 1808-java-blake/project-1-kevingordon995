import { connectionPool } from "../util/connection-util";
import { ErsUsers } from "../model/ers-users";
import { ersUsersConverter } from "../util/ers-users-converter";
import { ersReimbursementConverter } from "../util/ers-reimbursement-converter";

export async function findAll(): Promise<ErsUsers[]> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `SELECT * FROM ers.ers_users e
        LEFT JOIN ers.ers_reimbursement r
        ON e.ers_users_id = r.reimb_author`);

    
    const users = [];
    resp.rows.forEach((user_ticket_result) => {
      const ticket = ersReimbursementConverter(user_ticket_result);
      const exists = users.some(existingUser => {
        if(user_ticket_result.ers_users_id === existingUser.id) {
          ticket.id && existingUser.tickets.push(ticket);
          return true;
        }
      })
      if (!exists) {
        const newUser = ersUsersConverter(user_ticket_result);
        ticket.id && newUser.tickets.push(ticket);
        users.push(newUser);
      }
    })
    return users;
  } finally {
    client.release();
  }
}
export async function findById(id: number): Promise<ErsUsers> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `SELECT * FROM ers.ers_users e
        LEFT JOIN ers.ers_reimbursement r
        ON e.ers_users_id = r.reimb_author
        WHERE e.ers_users_id = $1`, [id]);
        const user = ersUsersConverter(resp.rows[0]); // get the user data from first row
        resp.rows.forEach((ticket) => {
          ticket.reimb_id && user.tickets.push(ersReimbursementConverter(ticket));
        })
        return user;
  } finally {
    client.release();
  }
}
export async function findByUsernameAndPassword(username: string, password: string): Promise<ErsUsers> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `SELECT * FROM ers.ers_users e
        WHERE e.ers_username = $1
        AND e.ers_password = $2`, [username, password]);
        if(resp.rows.length !== 0) {
          return ersUsersConverter(resp.rows[0]); // get the user data from first row
        }
        return null;
  } finally {
    client.release();
  }
}
  // create employee
export async function createEmployee(ersUser: ErsUsers): Promise<number> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `INSERT INTO ers.ers_users
      (ers_username, ers_password, user_first_name, user_last_name, user_email, user_role_id)
      VALUES ($1, $2, $3, $4, $5, 1)
      RETURNING ers_users_id`, [ersUser.username, ersUser.password, ersUser.firstName, ersUser.lastName, ersUser.email]
    )
    return resp.rows[0].ers_users_id;
  } finally {
      client.release();
  }
}
//create tickets
export async function createLodgingTicket(ticket, author: number): Promise<number> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `INSERT INTO ers.ers_reimbursement
        (reimb_amount, reimb_submitted, reimb_resolved, reimb_description, reimb_author, reimb_resolver, reimb_status_id, reimb_type_id)
        VALUES ($1, $2::timestamp(0), null, $3, $4, $5, 1, 1)
        RETURNING reimb_id`, [ticket.amount, ticket.submitted, ticket.description, author, ticket.resolver]);
    return resp.rows[0].reimb_id;
  } finally {
    client.release();
  }
}
export async function createTravelTicket(ticket, author: number): Promise<number> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `INSERT INTO ers.ers_reimbursement
        (reimb_amount, reimb_submitted, reimb_resolved, reimb_description, reimb_author, reimb_resolver, reimb_status_id, reimb_type_id)
        VALUES ($1, $2, null, $3, $4, $5, 1, 2)
        RETURNING reimb_id`, [ticket.amount, ticket.submitted, ticket.description, author, ticket.resolver]);
    return resp.rows[0].reimb_id;
  } finally {
    client.release();
  }
}
export async function createFoodTicket(ticket, author: number): Promise<number> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `INSERT INTO ers.ers_reimbursement
        (reimb_amount, reimb_submitted, reimb_resolved, reimb_description, reimb_author, reimb_resolver, reimb_status_id, reimb_type_id)
        VALUES ($1, $2, null, $3, $4, $5, 1, 3)
        RETURNING reimb_id`, [ticket.amount, ticket.submitted, ticket.description, author, ticket.resolver]);
    return resp.rows[0].reimb_id;
  } finally {
    client.release();
  }
}
export async function createOtherTicket(ticket, author: number): Promise<number> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `INSERT INTO ers.ers_reimbursement
        (reimb_amount, reimb_submitted, reimb_resolved, reimb_description, reimb_author, reimb_resolver, reimb_status_id, reimb_type_id)
        VALUES ($1, $2, null, $3, $4, $5, 1, 4)
        RETURNING reimb_id`, [ticket.amount, ticket.submitted, ticket.description, author, ticket.resolver]);
    return resp.rows[0].reimb_id;
  } finally {
    client.release();
  }
}