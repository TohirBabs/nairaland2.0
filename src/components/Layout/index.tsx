import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/clientApp";
import useAuth from "../../hooks/useAuth";
import Navbar from "../Navbar";
import { BsBarChart } from "react-icons/bs";
import { BiMap, BiChalkboard } from "react-icons/bi";
import { GoHome } from "react-icons/go";
import { FiSettings, FiMenu } from "react-icons/fi";
import { GrNotification } from "react-icons/gr";
import AuthModal from "../Modal/Auth";
import { Container, IconButton } from "@chakra-ui/react";
import { SidenavItem } from "../sidenav/sidenav-items/SidenavItems";
import SidenavProvider, { useSidenav } from "../sidenav/SidenavContext";
import SidenavContainer from "../sidenav/SidenavContainer";
import Sidenav from "../sidenav/Sidenav";
import OneTapComponent from "./oneTapComponent";
import { SessionProvider } from "next-auth/react";

type Props = {
  children?: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  // useAuth(); // will implement later at end of tutorial
  const navItems: SidenavItem[] = [
    { icon: GoHome, label: "Home", to: "/" },
    { icon: BiChalkboard, label: "Forecast", to: "forecast" },
    { icon: GrNotification, label: "notification", to: "/" },
    { icon: FiSettings, label: "Settings", to: "settings" },
  ];
  const { onOpen } = useSidenav();
  return (
    <Container px={1} maxW="full">
      <SidenavProvider>
        <SidenavContainer sidenav={<Sidenav navItems={navItems} />}>
          <Navbar onOpen={onOpen} />
          {children}
        </SidenavContainer>
      </SidenavProvider>
    </Container>
  );
};

export default Layout;
