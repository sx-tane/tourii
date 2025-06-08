import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import AdminStories from "./page";

vi.mock("@/hooks/stories/getSagas", () => ({
  getSagas: () => ({
    sagas: [
      {
        sagaId: "1",
        sagaName: "Test Saga",
        sagaDesc: "",
      },
    ],
    isLoadingSagas: false,
    isErrorSagas: undefined,
    mutateSagas: vi.fn(),
  }),
}));

describe("AdminStories page", () => {
  it("renders saga list returned from hook", () => {
    render(<AdminStories />);
    expect(screen.getByRole("heading", { name: /stories/i })).toBeInTheDocument();
    expect(screen.getByText("Test Saga")).toBeInTheDocument();
  });
});
