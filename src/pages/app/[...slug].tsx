import { Text } from "@/components/ui";
import Link from "next/link";
import { useRouter } from "next/router";
import { Dashboard } from "@/subPages/app";

type routes = "dashboard" | "projects";
type innerRoute = {
  route: routes;
  title: string;
};

const innerRoutes: Array<innerRoute> = [
  { route: "dashboard", title: "Dashboard" },
  { route: "projects", title: "Projects" },
];

export default function App() {
  const router = useRouter();
  const slug = router.query.slug || [];

  return (
    <main className="w-screen h-screen bg-right bg-cover pb-14">
      <div className="flex h-screen">
        <div data-testid="sidebar" className="px-6 py-4 border-r-2 border-primary">
          {innerRoutes.map(({ route, title }) => (
            <div key={route} className="">
              <Link href={`/app/${route}`}>
                <Text
                  onHover
                  fontSize="xl"
                  fontType="body"
                  variant={slug.includes(route) ? "primary" : "base"}
                >
                  {title}
                </Text>
              </Link>
            </div>
          ))}
        </div>
        <div data-testid="main" className="flex-grow p-4">
          <SubPage route={slugToRoute(slug[0])} />
        </div>
      </div>
    </main>
  );
}

const slugToRoute = (slug: string): routes => {
  switch (slug) {
    case "projects":
      return "projects";
    case "dashboard":
    default:
      return "dashboard";
  }
};
const SubPage = ({ route }: { route: routes }) => {
  switch (route) {
    case "dashboard":
      return <Dashboard />;
    case "projects":
      return (
        <Text fontSize="2xl" fontType="heading" tag="h1" variant="primary">
          Projects
        </Text>
      );
  }
};
