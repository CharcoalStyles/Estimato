import { Loader } from "@/components";
import {Text } from "@/components/ui";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const App = () => {
const router = useRouter();

useEffect(() => {
  router.push("/app/dashboard");
}, []);

  return (
    <Loader />
  );
};

export default App;