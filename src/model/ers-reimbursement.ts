export class ErsReimbursement {
    id = 0;
    amount = 0;
    submitted = '';
    description = ''

    constructor(id?: number, amount?: number, submitted?: string, description?: string) {
        id && (this.id = id);
        amount && (this.amount = amount);
        submitted && (this.submitted = submitted);
        description && (this.description = description);
      }

}