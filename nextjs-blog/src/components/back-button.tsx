"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export default function BackButton({
  text = "返回",
  className,
}: {
  text?: string;
  className?: string;
}) {
  const router = useRouter();
  return (
    <Button
      className={cn(className, "cursor-pointer")}
      onClick={() => router.back()}
    >
      {text}
    </Button>
  );
}
