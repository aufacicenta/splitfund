import { screen, render } from "tests";

import { PropertiesExplorer } from "./PropertiesExplorer";

describe("PropertiesExplorer", () => {
  it("renders children correctly", () => {
    render(<PropertiesExplorer>PropertiesExplorer</PropertiesExplorer>);

    const element = screen.getByText("PropertiesExplorer");

    expect(element).toBeInTheDocument();
  });
});
