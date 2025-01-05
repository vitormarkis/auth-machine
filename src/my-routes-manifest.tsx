import { ChangeRolePage } from "./pages/change-role/page"
import { GithubProfilePage } from "./pages/github-profile/page"
import { ZustandLikePage } from "./pages/zustand-like/page"

export const myRoutesManifest = [
  {
    path: "/github-profile",
    element: <GithubProfilePage />,
  },
  {
    path: "/change-role",
    element: <ChangeRolePage />,
  },
  {
    path: "/zustand-like",
    element: <ZustandLikePage />,
  },
]
