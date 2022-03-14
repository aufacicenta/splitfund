import { screen, render } from "tests";

import { MyProperties } from "./MyProperties";

describe("MyProperties", () => {
  it("renders children correctly", () => {
    render(<MyProperties>MyProperties</MyProperties>);

    const element = screen.getByText("MyProperties");

    expect(element).toBeInTheDocument();
  });
});
