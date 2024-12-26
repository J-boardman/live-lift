import { Globe, TvMinimalPlay } from "lucide-react";

import { HomeIcon } from "lucide-react";
import { Badge } from "../ui/badge";

export function PlanTypeBadge({
  plan,
}: {
  plan: "free" | "premium" | "enterprise";
}) {
  const icon =
    plan === "free" ? (
      <HomeIcon className="w-4 h-4" />
    ) : plan === "premium" ? (
      <Globe className="w-4 h-4" />
    ) : (
      <TvMinimalPlay className="w-4 h-4" />
    );
  return (
    <Badge
      className="flex items-center gap-2 w-min capitalize"
      variant={"outline"}
    >
      {icon}
      {plan}
    </Badge>
  );
}
