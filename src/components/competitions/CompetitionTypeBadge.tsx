import { Badge } from "../ui/badge";
import { Dumbbell } from "lucide-react";

export function CompetitionTypeBadge({
  competitionType,
}: {
  competitionType: "powerlifting";
}) {
  const icon =
    competitionType === "powerlifting" ? (
      <Dumbbell className="w-4 h-4" />
    ) : null;
  return (
    <Badge
      variant={"outline"}
      className="flex items-center gap-2 w-min capitalize"
    >
      {icon}
      {competitionType}
    </Badge>
  );
}
