"use-client";
import { useDisclosure } from "@chakra-ui/react";
import { createContext, useContext } from "react";

const SidenavContext = createContext<ReturnType<typeof useDisclosure> | null>(
  null
);

export function useSidenav() {
  const sidebar = useContext(SidenavContext);
  console.log(sidebar);

  // if (!sidebar) {
  //   throw new Error("Cannot use `sidebar context` outside SidebarProvider");
  // }
  return { ...(sidebar as ReturnType<typeof useDisclosure>) };
}

export function SidenavProvider({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  const disclosure = useDisclosure();
  return (
    <SidenavContext.Provider value={{ ...disclosure }} {...props}>
      {children}
    </SidenavContext.Provider>
  );
}

export default SidenavProvider;
