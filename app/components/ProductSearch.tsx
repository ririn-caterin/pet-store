"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const ProductSearch = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [inputValue, setInputValue] = useState(searchParams.get("query") || "");

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);

    if (inputValue) {
      params.set("query", inputValue);
    } else {
      params.delete("query");
    }
    router.push(`${pathname}?${params.toString()}`);
    console.log("Component rendered!");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search product here..."
        className="border px-4 py-2 w-[300px] rounded-md"
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default ProductSearch;
