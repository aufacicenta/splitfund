import { screen, render } from "tests";

import { PropertyPreview } from "./PropertyPreview";

describe("PropertyPreview", () => {
  it("renders children correctly", () => {
    render(<PropertyPreview>PropertyPreview</PropertyPreview>);

    const element = screen.getByText("PropertyPreview");

    expect(element).toBeInTheDocument();
  });
});
