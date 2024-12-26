import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "../../convex/_generated/api";
import { useQuery } from "convex-helpers/react/cache";
import { Link } from "@tanstack/react-router";
import { PlanTypeBadge } from "./competitions/PlanBadge";
import { CompetitionTypeBadge } from "./competitions/CompetitionTypeBadge";
import { formatTimestamp } from "@/lib/utils";

export function CompetitionTable() {
  const competitions = useQuery(api.competitions.get);
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-muted/50">
          <TableHead className="font-semibold">Name</TableHead>
          <TableHead className="font-semibold">Date</TableHead>
          <TableHead className="font-semibold">Competition Type</TableHead>
          <TableHead className="font-semibold">Plan Type</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {competitions?.map((competition) => (
          <TableRow key={competition._id} className="hover:bg-muted/50">
            <TableCell>
              <Link
                to="/competitions/$id"
                params={{ id: competition._id }}
                className="text-primary"
              >
                {competition.name}
              </Link>
            </TableCell>
            <TableCell>{formatTimestamp(competition.date)}</TableCell>
            <TableCell>
              <CompetitionTypeBadge
                competitionType={competition.competitionType}
              />
            </TableCell>
            <TableCell>
              <PlanTypeBadge plan={competition.planType} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
