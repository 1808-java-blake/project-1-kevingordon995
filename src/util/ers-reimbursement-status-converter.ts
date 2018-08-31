import { SqlReimbursementStatus } from "../dto/sql-reimbursement-status";
import { ErsReimbursementStatus } from "../model/ers-reimbursement-status";

export function ersReimbursementStatusConverter (ersReimbStatus: SqlReimbursementStatus){
    return new ErsReimbursementStatus(ersReimbStatus.reimb_status_id, ersReimbStatus.reimb_status);
}