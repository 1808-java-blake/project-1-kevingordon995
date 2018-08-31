import { SqlReimbursement } from "../dto/sql-ers-reimbursement";
import { ErsReimbursement } from "../model/ers-reimbursement";
import { SqlErsUsers } from "../dto/sql-ers-users";

export function ersReimbursementConverter (ersReimb: SqlReimbursement){
    return new ErsReimbursement(ersReimb.reimb_id, ersReimb.reimb_amount, ersReimb.reimb_submitted, ersReimb.reimb_resolved);
}