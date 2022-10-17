import { screen, render } from "tests";

import { BusinessCampaignCardProps } from "./BusinessCampaign.types";
import { BusinessCampaignCard } from "./BusinessCampaignCard";

describe("BusinessCard", () => {
  it("renders children correctly", () => {
    const props: BusinessCampaignCardProps = {
      content: {
        name: "Business #1",
        description: "Business #1",
        city: "Guatemala",
        country: "GT",
        coverUrl: "",
        expiresAt: 2,
        investors: 40,
        investmentMultiple: "1.5",
        totalSatsInvested: 35e6,
      },
      onClick: () => null,
      className: "",
    };

    render(<BusinessCampaignCard {...props} />);

    const element = screen.getByText("BusinessCard");

    expect(element).toBeInTheDocument();
  });
});
