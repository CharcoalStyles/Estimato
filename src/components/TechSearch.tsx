import { useTech } from "@/hooks/useTech";
import { Input, Text } from "@/components/ui";
import { Loader } from ".";
import { Database } from "@/util/schema";
import clsx from "clsx";
import { useState } from "react";

type TechSearchProps = {
  selectedTech: Database["public"]["Tables"]["tech"]["Row"][];
  onSelect: (id: Database["public"]["Tables"]["tech"]["Row"]) => void;
};

export const TechSearch = ({ onSelect, selectedTech }: TechSearchProps) => {
  const { tech, error, isLoading } = useTech();
  const [search, setSearch] = useState("");

  const orderedTech = [
    ...selectedTech,
    ...tech.filter((t) => !selectedTech.find((st) => st.id === t.id)),
  ];

  return (
    <div>
      <div className="flex flex-col">
        {isLoading && <Loader />}
        {error && <Text variant="danger">Error loading tech</Text>}
        {tech && tech.length === 0 && <Text>No tech found with '{}'</Text>}
        {tech && (
          <>
            <Input
              label="Tech"
              placeholder="Search"
              value={search}
              onChange={(s) => {
                setSearch(s);
              }}
            />
            <div className="flex flex-row flex-wrap max-h-96overflow-y-scroll">
              {orderedTech
                .filter(({ name }) => name.includes(search))
                .map((t) => {
                  const isSelected = selectedTech.includes(t);
                  return (
                    <div
                    key={t.id}
                      onClick={() => {
                        onSelect(t);
                      }}
                      className={clsx(
                        "flex flex-col items-center rounded-md px-2 py-1 m-2",
                        isSelected
                          ? "border border-primary text-primary"
                          : "border border-white text-white"
                      )}>
                      <Text variant={isSelected ? "primary" : "base"}>
                        {t.name}
                      </Text>
                    </div>
                  );
                })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
