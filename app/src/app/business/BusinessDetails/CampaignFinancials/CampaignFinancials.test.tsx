import { screen, render } from "tests";

import { CampaignFinancials } from "./CampaignFinancials";

describe("CampaignFinancials", () => {
  it("renders children correctly", () => {
    render(<CampaignFinancials>CampaignFinancials</CampaignFinancials>);

    const element = screen.getByText("CampaignFinancials");

    expect(element).toBeInTheDocument();
  });
});
