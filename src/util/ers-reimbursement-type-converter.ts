import { SqlReimbursementTypes } from "../dto/sql-ers-reimbursement-type";
import { ErsReimbursementType } from "../model/ers-reimbursement-type";

export function ersReimbursementTypeConverter (ersReimbType: SqlReimbursementTypes){
    return new ErsReimbursementType(ersReimbType.reimb_type_id, ersReimbType.reimb_type);
}