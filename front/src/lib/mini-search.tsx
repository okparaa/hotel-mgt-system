import { SearchIcon } from "lucide-react";
import { useChest } from "../app-chest";

export const MiniSearch = () => {
  const {
    data: { miniSearch },
    updateChest,
  } = useChest();

  return (
    <div className="w-full border-2 mb-1 p-2 flex justify-between">
      <div className="relative">
        <input
          className="border w-full max-w-80 py-[1px] placeholder:text-gray-400 text-lg pr-4 pl-7 rounded-full"
          type="text"
          name="search"
          value={miniSearch || ""}
          placeholder="search..."
          onChange={(e) => {
            updateChest({
              type: "miniSearch",
              data: (e.target as HTMLInputElement)?.value,
            });
          }}
        />
        <SearchIcon className="absolute ml-1 top-1 pt-1 left-0 text-gray-400" />
      </div>
    </div>
  );
};
