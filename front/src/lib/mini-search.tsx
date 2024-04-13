import { useQuery } from "@apollo/client";
import { miniSearch as MiniSearche } from "./client";
import { SearchIcon } from "lucide-react";
import { MINI_SEARCH } from "../components/queries/locals";

export const MiniSearch = () => {
  const {
    data: { mini_search },
  } = useQuery(MINI_SEARCH);

  return (
    <div className="w-full border-2 mb-1 p-2 flex justify-between">
      <div className="relative">
        <input
          className="border w-full max-w-80 py-[1px] placeholder:text-gray-400 text-lg pr-4 pl-7 rounded-full"
          type="text"
          name="search"
          value={mini_search || ""}
          placeholder="search..."
          onChange={(e) => {
            MiniSearche((e.target as HTMLInputElement)?.value);
          }}
        />
        <SearchIcon className="absolute ml-1 top-1 pt-1 left-0 text-gray-400" />
      </div>
    </div>
  );
};
