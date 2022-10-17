import { screen, render } from "tests";

import { CampaignsGroup } from "./CampaignsGroup";

describe("CampaignsGroup", () => {
  it("renders children correctly", () => {
    render(<CampaignsGroup>CampaignsGroup</CampaignsGroup>);

    const element = screen.getByText("CampaignsGroup");

    expect(element).toBeInTheDocument();
  });
});
