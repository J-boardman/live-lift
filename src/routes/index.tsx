import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "convex-helpers/react/cache";
import { api } from "../../convex/_generated/api";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const tasks = useQuery(api.tasks.get);
  return (
    <div>{tasks?.map((task) => <div key={task._id}>{task.text}</div>)}</div>
  );
}
