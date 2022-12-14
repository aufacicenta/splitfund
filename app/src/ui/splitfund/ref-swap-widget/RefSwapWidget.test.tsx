import { screen, render } from "tests";

import { RefSwapWidget } from "./RefSwapWidget";

describe("RefSwapWidget", () => {
  it("renders children correctly", () => {
    render(<RefSwapWidget>RefSwapWidget</RefSwapWidget>);

    const element = screen.getByText("RefSwapWidget");

    expect(element).toBeInTheDocument();
  });
});
