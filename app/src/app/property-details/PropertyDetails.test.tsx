import { screen, render } from "tests";

import { PropertyDetails } from "./PropertyDetails";

describe("PropertyDetails", () => {
  it("renders children correctly", () => {
    render(<PropertyDetails>PropertyDetails</PropertyDetails>);

    const element = screen.getByText("PropertyDetails");

    expect(element).toBeInTheDocument();
  });
});
