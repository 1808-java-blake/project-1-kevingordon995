import { connectionPool } from "../util/connection-util";
import { ErsUsers } from "../model/ers-users";
import { ErsUserRoles } from "../model/ers-user-roles";
import { ErsReimbursementStatus } from "../model/ers-reimbursement-status";
import { ErsReimbursementType } from "../model/ers-reimbursement-type";
import { ersUsersConverter } from "../util/ers-users-converter";

//create new certification ticket
export async function createCertifTicket(user): Promise<number> {
    const client = await connectionPool.connect();
    const userId = user.ersUser.userId;
    try {
      const resp = await client.query(
        `INSERT INTO ers.ers-reimbursement
          (reimb_amount, reimb_submitted, reimb_resolved, reimb_description, reimb_author, reimb_resolver, reimb_status_id, reimb_type_id)
          VALUES ($1, $2, $3, $4, $5, null, 1, 1) 
          RETURNING reimb_id`, [user.amount, user.submitted, user.resolved, user.description, userId]);
      return resp.rows[0].reimb_id;
    } finally {
      client.release();
    }
  }
//create new travel ticket
export async function createTravelTicket(user): Promise<number> { // pass in current session user
  const client = await connectionPool.connect();
  const userId = user.ersUser.userId;
  try {
    const resp = await client.query(
      `INSERT INTO ers.ers-reimbursement
        (reimb_amount, reimb_submitted, reimb_resolved, reimb_description, reimb_author, reimb_resolver, reimb_status_id, reimb_type_id)
        VALUES ($1, $2, $3, $4, $5, null, 1, 2) 
        RETURNING reimb_id`, [user.amount, user.submitted, user.resolved, user.description, userId]);
    return resp.rows[0].reimb_id;
  } finally {
    client.release();
  }
}
export async function createMedicalTicket(user): Promise<number> {//from ticket
  const client = await connectionPool.connect();
  const userId = user.ersUser.userId;
  try {
    const resp = await client.query(
      `INSERT INTO ers.ers-reimbursement
        (reimb_amount, reimb_submitted, reimb_resolved, reimb_description, reimb_author, reimb_resolver, reimb_status_id, reimb_type_id)
        VALUES ($1, $2, $3, $4, $5, null, 1, 3) 
        RETURNING reimb_id`, [user.amount, user.submitted, user.resolved, user.description, userId]);
    return resp.rows[0].reimb_id;
  } finally {
    client.release();
  }
}
  //show all tickets to user
export async function showEmployeeTickets(){
  
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
  // create user roles
export async function createUserRoles(ersUserRoles: ErsUserRoles): Promise<number> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `INSERT INTO ers.ers_user_roles
      (user_role)
      VALUES ($1)
      RETURNING ers_user_role_id`, [ersUserRoles.role]
    )
    return resp.rows[0];
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
export async function createStatus(ersReimbStatus: ErsReimbursementStatus): Promise<number> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `INSERT INTO ers.ers_reimbursement_status
      (reimb_status) VALUES ($1)
      RETURNING reimb_status_id`, [ersReimbStatus.status]
    )
    return resp.rows[0].reimb_status_id;
  } finally {
    client.release();
  }
}
export async function createTypes(ersReimbType: ErsReimbursementType): Promise<number> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `INSERT INTO ers.ers_reimbursement_type
      (reimb_type) VALUES ($1)
      RETURNING reimb_type_id`, [ersReimbType.type]
    )
    return resp.rows[0].reimb_type_id;
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