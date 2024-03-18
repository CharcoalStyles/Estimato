import { Loader } from "@/components";
import { TechIcon } from "@/components/TechIcon";
import { Database } from "@/util/schema";
import { supabaseAtom } from "@/util/supabase";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

type Tech = Database["public"]["Tables"]["tech"]["Row"];

const TechTestPage: React.FC = () => {
  const [supabase] = useAtom(supabaseAtom);
  const [techs, setTechs] = useState<Array<Tech>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTech = async () => {
      const { data, error } = await supabase.from("tech").select("*");

      if (error) {
        console.error(error);
        return;
      }

      setTechs(data);
      setLoading(false);
    };

    fetchTech();
  }, []);

  return (
    <div className="p-4 flex flex-col w-screen">
      <h1 className="text-3xl font-bold text-white">Tech Test Page</h1>
      {loading && <Loader />}
      <div className="flex flex-row flex-wrap">
        {techs.map((tech) => {
          const {
            link
          } = tech;
          return (
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className="text-white"
            >
              <TechIcon tech={tech} />
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default TechTestPage;
