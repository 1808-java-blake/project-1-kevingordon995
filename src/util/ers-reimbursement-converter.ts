import { SqlReimbursement } from "../dto/sql-ers-reimbursement";
import { ErsReimbursement } from "../model/ers-reimbursement";

export function ersReimbursementConverter (ersReimb: SqlReimbursement){
    return new ErsReimbursement(ersReimb.reimb_id, ersReimb.reimb_amount, ersReimb.reimb_submitted, ersReimb.reimb_resolved, ersReimb.reimb_description, ersReimb.reimb_author, ersReimb.reimb_resolver, ersReimb.reimb_status_id, ersReimb.reimb_type_id);
}