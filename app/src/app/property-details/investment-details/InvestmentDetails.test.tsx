import { screen, render } from "tests";

import { InvestmentDetails } from "./InvestmentDetails";

describe("InvestmentDetails", () => {
  it("renders children correctly", () => {
    render(<InvestmentDetails>InvestmentDetails</InvestmentDetails>);

    const element = screen.getByText("InvestmentDetails");

    expect(element).toBeInTheDocument();
  });
});
