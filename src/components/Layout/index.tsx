import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/clientApp";
import useAuth from "../../hooks/useAuth";
import Navbar from "../Navbar";
import { BsBarChart } from "react-icons/bs";
import { BiMap, BiChalkboard } from "react-icons/bi";
import { FiSettings, FiMenu } from "react-icons/fi";
import AuthModal from "../Modal/Auth";
import { Container, IconButton } from "@chakra-ui/react";
import { SidenavItem } from "../sidenav/sidenav-items/SidenavItems";
import SidenavProvider, { useSidenav } from "../sidenav/SidenavContext";
import SidenavContainer from "../sidenav/SidenavContainer";
import Sidenav from "../sidenav/Sidenav";

type Props = {
  children?: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  // useAuth(); // will implement later at end of tutorial
  const navItems: SidenavItem[] = [
    { icon: BsBarChart, label: "Dashboard", to: "" },
    { icon: BiChalkboard, label: "Forecast", to: "forecast" },
    { icon: BiMap, label: "Location", to: "location" },
    { icon: FiSettings, label: "Settings", to: "settings" },
  ];
  const { onOpen } = useSidenav();
  return (
    <>
      <Container px={1} maxW="full">
        <SidenavProvider>
          <SidenavContainer sidenav={<Sidenav navItems={navItems} />}>
            <Navbar />
            {children}
            <IconButton
              aria-label="menu"
              display={{ base: "flex", md: "none" }}
              onClick={onOpen}
              icon={<FiMenu />}
            />
          </SidenavContainer>
        </SidenavProvider>
      </Container>
    </>
  );
};

export default Layout;
