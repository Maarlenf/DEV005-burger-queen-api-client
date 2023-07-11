/**
 * @jest-environment jsdom
 */

import { render } from "@testing-library/react";
import Banner from "../Banner/Banner";

jest.mock("../../images.js", () => ({
  bannerBurger: "banner-opacity.png",
}));

describe("Banner component", () => {
  test("to be show image", () => {
    const mockHtml =
      '<div class="contain-banner"><img src="banner-opacity.png" class="banner" alt="Banner Burguer Queen"></div>';
    const { container } = render(<Banner />);
    expect(container.innerHTML).toBe(mockHtml);
  });
  const { getByAltText } = render(<Banner />);
  const bannerImage = getByAltText("Banner Burguer Queen");
  expect(bannerImage.src).toContain("banner-opacity.png");
});
