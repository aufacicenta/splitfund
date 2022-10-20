import { screen, render } from "tests";

import { TotalValueLockedWidget } from "./TotalValueLockedWidget";

describe("TotalValueLockedWidget", () => {
  it("renders children correctly", () => {
    render(<TotalValueLockedWidget>TotalValueLockedWidget</TotalValueLockedWidget>);

    const element = screen.getByText("TotalValueLockedWidget");

    expect(element).toBeInTheDocument();
  });
});
