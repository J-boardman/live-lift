import { CompetitionTable } from "@/components/CompetitionTable";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/competitions/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <CompetitionTable />
    </div>
  );
}
