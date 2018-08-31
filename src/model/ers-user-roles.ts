export class ErsUserRoles{
    id = 0;
    role = '';

    constructor(id?: number, role?: string, roleId?: number) {
        id && (this.id = id);
        role && (this.role = role);
      }
}