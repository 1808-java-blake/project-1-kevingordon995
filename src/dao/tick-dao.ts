import { connectionPool } from "../util/connection-util";
import { ErsReimbursementType } from "../model/ers-reimbursement-type";
import { ErsReimbursementStatus } from "../model/ers-reimbursement-status";
import { ErsReimbursement } from "../model/ers-reimbursement";
import { ersReimbursementConverter } from "../util/ers-reimbursement-converter";

export async function findByIdOrAll(id: number, roleId: number): Promise<ErsReimbursement[]> {
  const client = await connectionPool.connect();
  try {
    if (roleId === 1){
      const resp = await client.query('SELECT * FROM ers.ers_reimbursement WHERE reimb_author = $1', [id]);//reimb_id -> reimb_author  
      return resp.rows.map(ersReimbursementConverter);
    } else {
      const resp = await client.query('SELECT * FROM ers.ers_reimbursement');
      return resp.rows.map(ersReimbursementConverter);
    }
  } finally {
    client.release();
  }
}
export async function findAll(): Promise<ErsReimbursement[]> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query('SELECT * FROM ers.ers_reimbursement');
    return resp.rows.map(ersReimbursementConverter);
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