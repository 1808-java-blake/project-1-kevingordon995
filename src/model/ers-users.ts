import { ErsReimbursement } from "./ers-reimbursement";

export class ErsUsers {
    id = 0;
    username = '';
    password = '';
    firstName = '';
    lastName = '';
    email = '';
    roleId = 0;
    tickets: ErsReimbursement[] = []

    constructor(id?: number, username?: string, password?: string, firstName?: string, lastName?: string, email?: string, roleId?: number, tickets?: ErsReimbursement[]) {
        id && (this.id = id);
        username && (this.username = username);
        password && (this.password = password);
        firstName && (this.firstName = firstName);
        lastName && (this.lastName = lastName);
        email && (this.email = email);
        roleId && (this.roleId = roleId)
        tickets && (this.tickets = tickets)
      }
}