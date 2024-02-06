import jestFetchMock from "jest-fetch-mock";
import { useRouter } from "next/navigation";

jestFetchMock.enableMocks();

console.warn = (message: string) => {
  if (message.startsWith("Detected multiple Jotai instances")) {
    return;
  }
  console.log("WARNING", message);
};


jest.mock("next/navigation");
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockPush = jest.fn();
mockUseRouter.mockImplementation(() => {
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
