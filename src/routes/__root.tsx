import { AddCompetitionDialog } from "@/components/competitions/AddCompetitionDialog";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: RootHeader,
});

function RootHeader() {
  return (
    <>
      <div className="p-2 flex items-center gap-2 w-full">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{" "}
        <Link to="/competitions" className="[&.active]:font-bold">
          Competitions
        </Link>
        <div className="ml-auto">
          <AddCompetitionDialog />
        </div>
      </div>
      <hr />
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </>
  );
}
