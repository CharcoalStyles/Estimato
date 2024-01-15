import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";

export const Header = () => {
  return (
    <div className="flex flex-row p-4">
      <div className="w-full flex items-center justify-between">
        <a
          className="flex items-center text-indigo-400 no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
          href="#">
          <Text fontSize="5xl" fontType="heading" tag="h1" variant="primary">
            Estomato
          </Text>
        </a>

        <div className="flex w-1/2 justify-end content-center">
          <Button variant="primary" label="Login" size="large" />
        </div>
      </div>
    </div>
  );
};
