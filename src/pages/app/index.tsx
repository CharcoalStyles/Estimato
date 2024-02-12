import {Text } from "@/components/ui";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const App = () => {
const router = useRouter();

useEffect(() => {
  router.push("/app/dashboard");
}, []);

  return (
    <div>
      <Text fontType="heading" fontSize="2xl">Loading...</Text>
    </div>
  );
};

export default App;