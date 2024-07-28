export class Play {
  constructor(play) {
    this.play = play;
  }

  calculateAmount(performance) {
    const calculator = PlayCalculatorFactory.create(performance, this.play);

    return calculator.calculateAmount();
  }

  calculateVolumeCredits(performance) {
    const calculator = PlayCalculatorFactory.create(performance, this.play);

    return calculator.calculateVolumeCredits();
  }

  getName() {
    return this.play.name;
  }
}

class PlayCalculator {
  constructor(performance) {
    this.performance = performance;
  }

  calculateAmount() {
    throw new Error("calculate not implemented");
  }

  calculateVolumeCredits() {
    throw new Error("calculateVolumeCredits not implemented");
  }

  calculateVolumeCreditsDefault() {
    let volumeCredits = 0;

    volumeCredits += Math.max(this.performance.audience - 30, 0);

    return volumeCredits;
  }
}

class ComedyCalculator extends PlayCalculator {
  calculateAmount() {
    const audience = this.performance.audience;

    let amount = 300;

    if (audience > 20) {
      amount += 100 + 5 * (audience - 20);
    }

    amount += 3 * audience;

    return amount;
  }

  calculateVolumeCredits() {
    let volumeCredits = this.calculateVolumeCreditsDefault();

    volumeCredits += Math.floor(this.performance.audience / 5);

    return volumeCredits;
  }
}

class TragedyCalculator extends PlayCalculator {
  calculateAmount() {
    const audience = this.performance.audience;

    let amount = 400;

    if (audience > 30) {
      amount += 10 * (audience - 30);
    }

    return amount;
  }

  calculateVolumeCredits() {
    return this.calculateVolumeCreditsDefault();
  }
}

class PlayCalculatorFactory {
  constructor() {}

  static create(performance, play) {
    switch (play.type) {
      case "comedy": {
        return new ComedyCalculator(performance);
      }
      case "tragedy": {
        return new TragedyCalculator(performance);
      }
      default: {
        throw new Error(`unknown type: ${play.type}`);
      }
    }
  }
}
