export class ErsUserRoles{
    id = 0;
    role = '';

    constructor(id?: number, role?: string) {
        id && (this.id = id);
        role && (this.role = role);
      }
}