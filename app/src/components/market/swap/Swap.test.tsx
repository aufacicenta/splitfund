import { screen, render } from "tests";

import { Swap } from "./Swap";

describe("Swap", () => {
  it("renders children correctly", () => {
    render(<Swap>Swap</Swap>);

    const element = screen.getByText("Swap");

    expect(element).toBeInTheDocument();
  });
});
