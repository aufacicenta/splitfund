import { screen, render } from "tests";

import { ContractDepositForm } from "./ContractDepositForm";

describe("ContractDepositForm", () => {
  it("renders children correctly", () => {
    render(<ContractDepositForm>ContractDepositForm</ContractDepositForm>);

    const element = screen.getByText("ContractDepositForm");

    expect(element).toBeInTheDocument();
  });
});
