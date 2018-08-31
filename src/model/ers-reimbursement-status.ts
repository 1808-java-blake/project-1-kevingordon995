export class ErsReimbursementStatus {
    id = 0;
    status = '';

    constructor(id?: number, status?: string) {
        id && (this.id = id);
        status && (this.status = status);
      }
}