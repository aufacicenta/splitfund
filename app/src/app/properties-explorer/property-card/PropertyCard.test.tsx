import { screen, render } from "tests";

import { PropertyCard } from "./PropertyCard";

describe("PropertyCard", () => {
  it("renders children correctly", () => {
    render(<PropertyCard>PropertyCard</PropertyCard>);

    const element = screen.getByText("PropertyCard");

    expect(element).toBeInTheDocument();
  });
});
