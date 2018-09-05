import { connectionPool } from "../util/connection-util";
import { ErsReimbursementType } from "../model/ers-reimbursement-type";
import { ErsReimbursementStatus } from "../model/ers-reimbursement-status";
import { ErsReimbursement } from "../model/ers-reimbursement";
import { ersReimbursementConverter } from "../util/ers-reimbursement-converter";
import { SqlReimbursement } from "../dto/sql-ers-reimbursement";

export async function findAll(): Promise<ErsReimbursement[]> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query('SELECT * FROM ers.ers_reimbursement');
    return resp.rows.map(ersReimbursementConverter);
  } finally {
    client.release();
  }
}

/**
 * Retreive a movie by its id
 * @param id 
 */
export async function findById(id: number): Promise<ErsReimbursement> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query('SELECT * FROM ers.ers_reimbursement WHERE reimb_id = $1', [id]);
    let ticket: SqlReimbursement = resp.rows[0];
    if (ticket !== undefined) {
      return ersReimbursementConverter(ticket);
    } else {
      return undefined;
    }
  } finally {
    client.release();
  }
}
export async function approvedTicket(resolved): Promise<any>{
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `UPDATE ers.ers_reimbursement
        SET reimb_resolved = $1, reimb_resolver = $2, reimb_status_id = 2
        WHERE reimb_id = $3
        RETURNING reimb_id`, [resolved.submitted, resolved.resolver, +resolved.receipt]);
    return resp.rows[0].reimb_id;
  } finally {
    client.release();
  }
}
export async function deniedTicket(resolved): Promise<any>{
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `UPDATE ers.ers_reimbursement
        SET reimb_resolved = $1, reimb_resolver = $2, reimb_status_id = 3
        WHERE reimb_id = $3
        RETURNING reimb_id`, [resolved.submitted, resolved.resolver, +resolved.receipt]);
    return resp.rows[0].reimb_id;
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