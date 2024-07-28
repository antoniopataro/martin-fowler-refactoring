import invoices from "./invoices.json";
import plays from "./plays.json";

import { statement } from "./index";

const input = [invoices[0], plays];

const output = `Statement for BigCo
 Hamlet: $650.00 (55 seats)
 As You Like It: $580.00 (35 seats)
 Othello: $500.00 (40 seats)
Amount owed is $1,730.00
You earned 47 credits
`;

describe("statement", () => {
  it("should return a statement for the given invoice and plays", () => {
    const result = statement(...input);

    expect(result).toEqual(output);
  });
});
