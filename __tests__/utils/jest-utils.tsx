import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppRouterContext.Provider value={null}>
    <QueryClientProvider client={new QueryClient()}>
      {children}
    </QueryClientProvider>
    </AppRouterContext.Provider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
