import jestFetchMock from "jest-fetch-mock";

jestFetchMock.enableMocks();

console.warn = (message: string) => {
  if (message.startsWith("Detected multiple Jotai instances")) {
    return;
  }
  console.log("WARNING", message);
};
