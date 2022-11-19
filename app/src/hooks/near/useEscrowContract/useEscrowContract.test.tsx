import { renderHook } from "tests";

import { useEscrowContract } from "./useEscrowContract";

describe("useEscrowContract", () => {
  it("returns a value", async () => {
    const { result } = renderHook(() => useEscrowContract());

    expect(result.current).toEqual("1");
  });
});
