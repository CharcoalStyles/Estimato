import { useTech } from "@/hooks/useTech";
import { useDebounce } from "use-debounce";
import { useState } from "react";
import { Input } from "./ui";
import { TechIcon } from "./TechIcon";
import { Text } from "./ui";
import { Loader } from ".";

type TechSearchProps = {
  selectedTech: number[];
  onSelect: (id: number) => void;
};

export const TechSearch = ({ onSelect, selectedTech }: TechSearchProps) => {
  const { tech, error, isLoading } = useTech();

  return (
    <div>
    
      <div className="flex flex-row flex-wrap max-h-52 overflow-y-auto">
        {isLoading && <Loader />}
        {error && <Text variant="danger">Error loading tech</Text>}
        {tech && tech.length === 0 && (
          <Text>No tech found with '{}'</Text>
        )}
        {tech &&
          tech.map((t) => (
            <div
              onClick={() => {
                onSelect(t.id);
              }}
              className="flex flex-col items-center border border-white rounded-md px-2 py-1 m-2"
            >
              <Text>{t.name}</Text>
            </div>
          ))}
      </div>
    </div>
  );
};
