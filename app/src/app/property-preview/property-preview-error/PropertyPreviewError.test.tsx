import { screen, render } from "tests";

import { PropertyPreviewError } from "./PropertyPreviewError";

describe("PropertyPreviewError", () => {
  it("renders children correctly", () => {
    render(<PropertyPreviewError>PropertyPreviewError</PropertyPreviewError>);

    const element = screen.getByText("PropertyPreviewError");

    expect(element).toBeInTheDocument();
  });
});
