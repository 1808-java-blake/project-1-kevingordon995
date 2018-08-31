export class ErsUsers {
    id = 0;
    username = '';
    password = '';
    firstName = '';
    lastName = '';
    email = '';
    roleId = 0;

    constructor(id?: number, username?: string, password?: string, firstName?: string, lastName?: string, email?: string, roleId?: number) {
        id && (this.id = id);
        username && (this.username = username);
        password && (this.password = password);
        firstName && (this.firstName = firstName);
        lastName && (this.lastName = lastName);
        email && (this.email = email);
        roleId && (this.roleId = roleId)
      }
}