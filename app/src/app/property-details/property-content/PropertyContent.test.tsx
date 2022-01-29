import { screen, render } from "tests";

import { PropertyContent } from "./PropertyContent";

describe("PropertyContent", () => {
  it("renders children correctly", () => {
    render(<PropertyContent>PropertyContent</PropertyContent>);

    const element = screen.getByText("PropertyContent");

    expect(element).toBeInTheDocument();
  });
});
