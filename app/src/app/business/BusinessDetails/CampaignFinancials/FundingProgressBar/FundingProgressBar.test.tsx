import { screen, render } from "tests";

import { FundingProgressBar } from "./FundingProgressBar";

describe("FundingProgressBar", () => {
  it("renders children correctly", () => {
    render(<FundingProgressBar>FundingProgressBar</FundingProgressBar>);

    const element = screen.getByText("FundingProgressBar");

    expect(element).toBeInTheDocument();
  });
});
