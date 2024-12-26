import { createFileRoute } from "@tanstack/react-router";
import { api } from "@/../convex/_generated/api";
import { Id } from "@/../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { PlanTypeBadge } from "@/components/competitions/PlanBadge";
import { CompetitionTypeBadge } from "@/components/competitions/CompetitionTypeBadge";
import { CalendarIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatTimestamp } from "@/lib/utils";

export const Route = createFileRoute("/competitions/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const competition = useQuery(api.competitions.getById, {
    id: Route.useParams().id as Id<"competitions">,
  });
  return (
    <main className="p-4">
      <hgroup>
        <h1 className="font-bold text-2xl">{competition?.name}</h1>
        <div className="flex items-center gap-2 mt-2">
          <CompetitionTypeBadge
            competitionType={competition?.competitionType ?? "powerlifting"}
          />
          <Badge variant={"outline"} className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4" />
            {formatTimestamp(competition?.date ?? 0)}
          </Badge>
          <PlanTypeBadge plan={competition?.planType ?? "free"} />
        </div>
      </hgroup>
    </main>
  );
}
