import { PropsWithChildren, useEffect, useState } from "react"
import { capitalize } from "./lib/utils"
import { cn } from "./lib/cn"
import { myRoutesManifest } from "./my-routes-manifest"
import { NavLink } from "react-router-dom"
import { TextChart } from "./components/text-chart"

type RootLayoutWrapperProps = {} & PropsWithChildren

const routes = ["/", ...myRoutesManifest.map(route => route.path)]

export function RootLayoutWrapper({ children }: RootLayoutWrapperProps) {
  const [isSidebarVisible, setIsSidebarVisible] = useState(
    !(import.meta.env.VITE_SIDEBAR_VISIBLE === "false")
  )

  useEffect(() => {
    Object.assign(window, {
      toggleSidebar: () => setIsSidebarVisible(s => !s),
    })
  }, [])

  return (
    <div className="container-1 flex gap-4 h-screen p-4 ">
      <div
        className={cn(
          "flex flex-col text-sm basis-[250px]",
          !isSidebarVisible && "hidden"
        )}
      >
        <div className="border border-dashed container-2 h-full flex flex-col px-4 py-6 text-sm rounded-md ">
          <h3 className="font-bold text-normal leading-7">Examples:</h3>
          <TextChart.Wrapper className="px-2 py-1">
            <TextChart.Text className="text-xs">
              Explore <TextChart.Strong>Saphyra</TextChart.Strong> and how it
              helps solve many common challenges you face when building a
              feature.
            </TextChart.Text>
          </TextChart.Wrapper>
          <nav className="flex flex-col py-6 gap-1">
            {routes.map(route => (
              <NavLink
                to={route}
                key={route}
                className={({ isActive }) =>
                  cn(
                    "hover:bg-gray-100 dark:hover:bg-gray-900 dark:hover:text-white w-full py-1 px-2 rounded-sm",
                    isActive &&
                      "bg-blue-500 text-white hover:bg-blue-500 hover:text-white"
                  )
                }
              >
                {route === "/"
                  ? "Home"
                  : capitalize(route?.replace("/", "").replaceAll("-", " "))}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
      <div className="flex-1 flex flex-col text-sm min-w-[250px]">
        <div className="border border-dashed container-2 h-full flex flex-col px-4 py-6 text-sm rounded-md @container overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  )
}
