import { Play } from "./models/play";
import { formatCurrency } from "./utils/format-currency";

class StatementCalculator {
  constructor(invoice, plays) {
    this.invoice = invoice;
    this.plays = plays;
  }

  buildStatementString(totalAmount, volumeCredits) {
    let result = `Statement for ${this.invoice.customer}\n`;

    for (const performance of this.invoice.performances) {
      const play = new Play(this.#getPlayByPerformance(performance));

      const amount = play.calculateAmount(performance);

      result += ` ${play.getName()}: ${formatCurrency(amount)} (${
        performance.audience
      } seats)\n`;
    }

    result += `Amount owed is ${formatCurrency(totalAmount)}\n`;
    result += `You earned ${volumeCredits} credits\n`;

    return result;
  }

  calculateTotalAmount() {
    let totalAmount = 0;

    for (const performance of this.invoice.performances) {
      const play = new Play(this.#getPlayByPerformance(performance));

      totalAmount += play.calculateAmount(performance);
    }

    return totalAmount;
  }

  calculateVolumeCredits() {
    let volumeCredits = 0;

    for (const performance of this.invoice.performances) {
      const play = new Play(this.#getPlayByPerformance(performance));

      volumeCredits += play.calculateVolumeCredits(performance);
    }

    return volumeCredits;
  }

  #getPlayByPerformance(performance) {
    return this.plays[performance.playID];
  }
}

export function statement(invoice, plays) {
  const statementCalculator = new StatementCalculator(invoice, plays);

  const totalAmount = statementCalculator.calculateTotalAmount();
  const volumeCredits = statementCalculator.calculateVolumeCredits();

  const statementString = statementCalculator.buildStatementString(
    totalAmount,
    volumeCredits
  );

  return statementString;
}
