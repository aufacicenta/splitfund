import { screen, render } from "tests";

import { PropertyHeader } from "./PropertyHeader";

describe("PropertyHeader", () => {
  it("renders children correctly", () => {
    render(<PropertyHeader>PropertyHeader</PropertyHeader>);

    const element = screen.getByText("PropertyHeader");

    expect(element).toBeInTheDocument();
  });
});
