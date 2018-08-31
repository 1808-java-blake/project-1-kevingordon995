import { ErsUserRoles } from "../model/ers-user-roles";
import { SqlErsUserRoles } from "../dto/sql-ers-user-roles";

export function ersUserRolesConverter (ersUserRoles: SqlErsUserRoles){
    return new ErsUserRoles(ersUserRoles.ers_user_role_id, ersUserRoles.user_role);
}