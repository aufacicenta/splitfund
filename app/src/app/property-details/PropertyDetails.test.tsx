import { screen, render } from "tests";

import { PropertyDetails2 } from "./PropertyDetails2";

describe("PropertyDetails2", () => {
  it("renders children correctly", () => {
    render(<PropertyDetails2>PropertyDetails2</PropertyDetails2>);

    const element = screen.getByText("PropertyDetails2");

    expect(element).toBeInTheDocument();
  });
});
