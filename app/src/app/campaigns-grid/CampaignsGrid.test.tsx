import { screen, render } from "tests";

import { CampaignsGrid } from "./CampaignsGrid";

describe("CampaignsGrid", () => {
  it("renders children correctly", () => {
    render(<CampaignsGrid>CampaignsGrid</CampaignsGrid>);

    const element = screen.getByText("CampaignsGrid");

    expect(element).toBeInTheDocument();
  });
});
