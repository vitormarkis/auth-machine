import { ExternalDepsPage } from "~/pages/external-deps/page"
import { ChangeRolePage } from "./pages/change-role/page"
import { GithubProfilePage } from "./pages/github-profile/page"
import { MemoryGamePage } from "./pages/memory-game/page"
import { ZustandLikePage } from "./pages/zustand-like/page"
import { TransitionsShowcasePage } from "~/pages/transitions-showcase/page"
import { PokemonPage } from "~/pages/PokemonPage"

export const myRoutesManifest = [
  // {
  //   path: "/github-profile",
  //   element: <GithubProfilePage />,
  // },
  // {
  //   path: "/change-role",
  //   element: <ChangeRolePage />,
  // },
  // {
  //   path: "/zustand-like",
  //   element: <ZustandLikePage />,
  // },
  // {
  //   path: "/memory-game",
  //   element: <MemoryGamePage />,
  // },
  // {
  //   path: "/external-deps",
  //   element: <ExternalDepsPage />,
  // },
  // {
  //   path: "/transitions-showcase",
  //   element: <TransitionsShowcasePage />,
  // },
  {
    path: "/pokemon",
    element: <PokemonPage />,
  },
]
