import { screen, render } from "tests";

import { SubmitProperty } from "./SubmitProperty";

describe("SubmitProperty", () => {
  it("renders children correctly", () => {
    render(<SubmitProperty>SubmitProperty</SubmitProperty>);

    const element = screen.getByText("SubmitProperty");

    expect(element).toBeInTheDocument();
  });
});
