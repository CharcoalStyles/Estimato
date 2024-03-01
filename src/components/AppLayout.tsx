import Link from "next/link";
import { Text } from "@/components/ui";
import { PropsWithChildren } from "react";
import { MiniUserBadge, UserBadge } from ".";

type AppLayoutProps = {
  openSidebarItem: SidebarItem["appPath"];
  pageTitle: string;
  subtitle?: string;
};

type SidebarItem = {
  title: string;
  appPath: "dashboard" | "projects";
};

const links: Array<SidebarItem> = [
  {
    title: "Dashboard",
    appPath: "dashboard",
  },
  {
    title: "Projects",
    appPath: "projects",
  },
];

export const AppLayout = ({
  children,
  openSidebarItem,
  pageTitle,
  subtitle,
}: PropsWithChildren<AppLayoutProps>) => (
  <main className="w-screen h-screen bg-right bg-cover pb-14">
    <div className="flex flex-row h-screen">
      <div
        data-testid="sidebar"
        className="flex flex-col place-content-between px-6 py-4 border-r-2 border-primary">
        <div>
          <Text fontSize="3xl" fontType="heading" tag="h1" variant="primary">
            Estomato
          </Text>
          {links.map(({ appPath, title }) => (
            <div key={appPath} className="">
              <Link href={`/app/${appPath}`}>
                <Text
                  onHover
                  fontSize="xl"
                  fontType="heading"
                  variant={openSidebarItem === appPath ? "accent" : "base"}>
                  {title}
                </Text>
              </Link>
            </div>
          ))}
        </div>
        <div>
          <MiniUserBadge />
        </div>
      </div>
      <div data-testid="main" className="flex-grow p-4">
        <div className="flex flex-col">
          <div data-testid={`content-heading`} className="mt-2">
            <Text
              data-testid="layout-title"
              fontSize="3xl"
              fontType="heading"
              variant="base">
              {pageTitle}
            </Text>
            <Text
              data-testid="layout-subtitle"
              fontSize="xl"
              fontType="body"
              variant="base">
              {subtitle}
            </Text>
          </div>
          <div className="mt-4">{children}</div>
        </div>
      </div>
    </div>
  </main>
);
