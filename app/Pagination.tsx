"use client";

import { Button } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { FC } from "react";

interface Values {
  id: string;
  name: string;
  email: string;
  role: string;
}
interface PaginationControlsProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
const PaginationControls: FC<PaginationControlsProps> = (
  { hasNextPage, hasPrevPage},
) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  

  const page = searchParams.get("page") ?? "1";
  const per_page = searchParams.get("per_page") ?? "10";

  return (
    <div className="flex gap-2 align-bottom pt-2">
      <Button
        variant="soft"
        className="bg-blue-500 text-white p-1"
        disabled={!hasPrevPage}
        onClick={() => {
          router.push(`/?page=${Number(page) - 1}&per_page=${per_page}`);
        }}
      >
        prev page
      </Button>
      <div>
        {page} / {Math.ceil(( 46) / Number(10))}
      </div>

      <Button
        variant="soft"
        className="bg-blue-500 text-white p-1"
        disabled={!hasNextPage}
        onClick={() => {
          router.push(`/?page=${Number(page) + 1}&per_page=${per_page}`);
        }}
      >
        next page
      </Button>
    </div>
  );
};

export default PaginationControls;
