import { screen, render } from "tests";

import { MediaCarousel } from "./MediaCarousel";

describe("MediaCarousel", () => {
  it("renders children correctly", () => {
    render(<MediaCarousel>MediaCarousel</MediaCarousel>);

    const element = screen.getByText("MediaCarousel");

    expect(element).toBeInTheDocument();
  });
});
