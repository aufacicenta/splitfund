import { screen, render } from "tests";

import { TypeformButton } from "./TypeformButton";

describe("TypeformButton", () => {
  it("renders children correctly", () => {
    render(<TypeformButton>TypeformButton</TypeformButton>);

    const element = screen.getByText("TypeformButton");

    expect(element).toBeInTheDocument();
  });
});
