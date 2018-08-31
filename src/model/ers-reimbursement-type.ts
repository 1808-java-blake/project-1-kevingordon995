export class ErsReimbursementType {
    id = 0;
    type = '';

    constructor(id?: number, type?: string) {
        id && (this.id = id);
        type && (this.type = type);
      }
}