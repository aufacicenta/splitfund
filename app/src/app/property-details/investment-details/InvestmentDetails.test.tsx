import { screen, render } from "tests";

import { InvestmentDetails2 } from "./InvestmentDetails2";

describe("InvestmentDetails2", () => {
  it("renders children correctly", () => {
    render(<InvestmentDetails2 contractAddress="address">InvestmentDetails2</InvestmentDetails2>);

    const element = screen.getByText("InvestmentDetails2");

    expect(element).toBeInTheDocument();
  });
});
