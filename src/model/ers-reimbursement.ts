export class ErsReimbursement {
    id = 0;
    amount = 0;
    submitted = '';
    resolved = '';
    description = '';
    author = 0;
    resolver = 0;
    statusId = 0;
    typeId = 0

    constructor(id?: number, amount?: number, submitted?: string, resolved?: string, description?: string, author?: number, resolver?: number, statusId?: number, typeId?: number) {
        id && (this.id = id);
        amount && (this.amount = amount);
        submitted && (this.submitted = submitted);
        resolved && (this.resolved = resolved);
        description && (this.description = description);
        author && (this.author = author);
        resolver && (this.resolver = resolver)
        statusId && (this.statusId = statusId);
        typeId && (this.typeId = typeId);
      }

}