export class Play {
  constructor(play) {
    this.play = play;
  }

  calculateAmount(performance) {
    const type = this.#getType();

    switch (type) {
      case "comedy": {
        return ComedyCalculator.calculate(performance);
      }
      case "tragedy": {
        return TragedyCalculator.calculate(performance);
      }
      default: {
        throw new Error(`unknown type: ${this.play.type}`);
      }
    }
  }

  calculateVolumeCredits(performance) {
    const type = this.#getType();

    switch (type) {
      case "comedy": {
        return ComedyCalculator.calculateVolumeCredits(performance);
      }
      case "tragedy": {
        return TragedyCalculator.calculateVolumeCredits(performance);
      }
      default: {
        throw new Error(`unknown type: ${this.play.type}`);
      }
    }
  }

  getName() {
    return this.play.name;
  }

  #getType() {
    return this.play.type;
  }
}

class PlayCalculator {
  constructor() {}

  static calculate() {
    throw new Error("calculate not implemented");
  }

  static calculateVolumeCredits(performance) {
    throw new Error("calculateVolumeCredits not implemented");
  }

  static calculateVolumeCreditsDefault(performance) {
    let volumeCredits = 0;

    volumeCredits += Math.max(performance.audience - 30, 0);

    return volumeCredits;
  }
}

class ComedyCalculator extends PlayCalculator {
  static calculate(performance) {
    const audience = performance.audience;

    let amount = 300;

    if (audience > 20) {
      amount += 100 + 5 * (audience - 20);
    }

    amount += 3 * audience;

    return amount;
  }

  static calculateVolumeCredits(performance) {
    let volumeCredits = this.calculateVolumeCreditsDefault(performance);

    volumeCredits += Math.floor(performance.audience / 5);

    return volumeCredits;
  }
}

class TragedyCalculator extends PlayCalculator {
  static calculate(performance) {
    const audience = performance.audience;

    let amount = 400;

    if (audience > 30) {
      amount += 10 * (audience - 30);
    }

    return amount;
  }

  static calculateVolumeCredits(performance) {
    return this.calculateVolumeCreditsDefault(performance);
  }
}
