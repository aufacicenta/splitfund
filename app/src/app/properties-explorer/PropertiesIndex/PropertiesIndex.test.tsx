import { screen, render } from "tests";

import { PropertiesIndex } from "./PropertiesIndex";

describe("PropertiesIndex", () => {
  it("renders children correctly", () => {
    render(<PropertiesIndex>PropertiesIndex</PropertiesIndex>);

    const element = screen.getByText("PropertiesIndex");

    expect(element).toBeInTheDocument();
  });
});
