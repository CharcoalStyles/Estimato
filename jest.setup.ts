import jestFetchMock from "jest-fetch-mock";
import { useRouter as navRouter } from "next/navigation";
import { useRouter } from "next/router";

jestFetchMock.enableMocks();

console.warn = (message: string) => {
  if (message.startsWith("Detected multiple Jotai instances")) {
    return;
  }
  console.log("WARNING", message);
};

jest.mock("next/navigation");
const mockUseNavRouter = navRouter as jest.MockedFunction<typeof navRouter>;
const mockPush = jest.fn();
mockUseNavRouter.mockImplementation(() => {
  return {
    push: mockPush,
    back: jest.fn(),
    prefetch: jest.fn(),
    reload: jest.fn(),
    replace: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  };
});

