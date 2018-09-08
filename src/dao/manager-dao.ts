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

    // extract the users and their movies from the result set
    const users = [];
    resp.rows.forEach((user_ticket_result) => {
      const ticket = ersReimbursementConverter(user_ticket_result);
      const exists = users.some(existingUser => {
        if (user_ticket_result.ers_users_id === existingUser.id) {
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
export async function approvedTicket(resolved, resolver: number): Promise<any> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `UPDATE ers.ers_reimbursement
          SET reimb_resolved = $1, reimb_resolver = $2, reimb_status_id = 2
          WHERE reimb_id = $3
          RETURNING reimb_id`, [resolved.submitted, resolver, +resolved.receipt]);
    return resp.rows[0].reimb_id;
  } finally {
    client.release();
  }
}
export async function deniedTicket(resolved, resolver: number): Promise<any> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `UPDATE ers.ers_reimbursement
          SET reimb_resolved = $1, reimb_resolver = $2, reimb_status_id = 3
          WHERE reimb_id = $3
          RETURNING reimb_id`, [resolved.submitted, resolver, +resolved.receipt]);
    return resp.rows[0].reimb_id;
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
    if (resp.rows.length !== 0) {
      return ersUsersConverter(resp.rows[0]); // get the user data from first row
    }
    return null;
  } finally {
    client.release();
  }
}
export async function createManager(ersUser: ErsUsers): Promise<number> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `INSERT INTO ers.ers_users
       (ers_username, ers_password, user_first_name, user_last_name, user_email, user_role_id)
       VALUES ($1, $2, $3, $4, $5, 2)
       RETURNING ers_users_id`, [ersUser.username, ersUser.password, ersUser.firstName, ersUser.lastName, ersUser.email]
    )
    return resp.rows[0].ers_users_id;
  } finally {
    client.release();
  }
}