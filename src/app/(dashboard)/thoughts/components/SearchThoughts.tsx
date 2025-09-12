"use client";

import { Input } from "@/components";

import { Search } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export const SearchThoughts = ({searchValue, setSearchValue} : { searchValue: string; setSearchValue: Dispatch<SetStateAction<string>>
}) => {

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />

      <Input
        type="text"
        placeholder="Search thoughts"
        className="bg-primary-main
         font-extralight border-primary-main outline-none text-neutral-main"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
};
