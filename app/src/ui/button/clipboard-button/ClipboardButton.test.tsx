import { screen, render } from "tests";

import { ClipboardButton } from "./ClipboardButton";

describe("ClipboardButton", () => {
  it("renders children correctly", () => {
    render(<ClipboardButton>ClipboardButton</ClipboardButton>);

    const element = screen.getByText("ClipboardButton");

    expect(element).toBeInTheDocument();
  });
});
