import { SqlErsUsers } from "../dto/sql-ers-users";
import { ErsUsers } from "../model/ers-users";

export function ersUsersConverter (ersUsers: SqlErsUsers){
    return new ErsUsers(ersUsers.ers_users_id, ersUsers.ers_username, undefined, ersUsers.user_first_name, ersUsers.user_last_name, ersUsers.user_email, ersUsers.user_role_id);
}