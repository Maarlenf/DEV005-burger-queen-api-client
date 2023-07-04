import Timer from "./Timer";

import { render, waitFor, act } from "@testing-library/react";
jest.useFakeTimers();
describe("timer", () => {
  it("test timer renders", () => {
    render(<Timer time={new Date()} />);
  });

  it("should display the time correctly", async () => {
    const mockTime = "2023-07-02T12:00:00.000Z";

    const { getAllByText } = render(<Timer time={mockTime} />);

    act(() => jest.advanceTimersByTime(1000));

    await waitFor(() => {
      const elapsedTimeElements = getAllByText((content, element) => {
        const timeRegex = /\d+ dias, \d+:\d+:\d+ hrs./;
        const elementText = element.textContent || "";
        return timeRegex.test(elementText);
      });

      expect(elapsedTimeElements.length).toBeGreaterThan(0);
    });
  });
});