import { SearchIcon } from "lucide-react";
import { useChest } from "../app-chest";

type SearchProps = {
  onOpen?: () => void;
  hasBtn?: boolean;
  Calenda?: JSX.Element;
};

export const Search = ({ onOpen, hasBtn = true, Calenda }: SearchProps) => {
  const {
    data: { search },
    updateChest,
  } = useChest();

  return (
    <div className="w-full mx-auto flex justify-center">
      <div className="w-full border-2 mb-1 p-2 flex justify-between">
        <div className="relative">
          <input
            className="border py-[1px] placeholder:text-gray-400 text-lg pl-8 w-full rounded-full"
            type="text"
            name="search"
            value={search || ""}
            placeholder="search..."
            onChange={(e) => {
              updateChest({
                type: "search",
                data: (e.target as HTMLInputElement)?.value,
              });
            }}
          />
          <SearchIcon className="absolute ml-2 top-1 pt-1 left-0 text-gray-400" />
        </div>
        {hasBtn && (
          <button
            onClick={() => {
              updateChest({
                type: "store",
                data: { neu: true },
              });
              typeof onOpen === "function" && onOpen();
            }}
            className="border rounded-full px-6 py-0 text-lg outline-1 hover:bg-blue-200 bg-blue-100"
          >
            New
          </button>
        )}
        {Calenda}
      </div>
    </div>
  );
};
