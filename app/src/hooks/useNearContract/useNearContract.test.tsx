import { renderHook } from "tests";

import { useNearContract } from "./useNearContract";

describe("useNearContract", () => {
  it("returns a value", async () => {
    const { result } = renderHook(() => useNearContract());

    expect(result.current).toEqual("1");
  });
});
