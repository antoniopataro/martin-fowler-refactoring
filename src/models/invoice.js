export class Invoice {
  constructor(invoice) {
    this.invoice = invoice;
  }

  getCustomer() {
    return this.invoice.customer;
  }

  getPerformances() {
    return this.invoice.performances;
  }
}
