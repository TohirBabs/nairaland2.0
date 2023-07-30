import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerOverlay,
  VStack,
  DrawerBody,
  Icon,
} from "@chakra-ui/react";
import { SiWwise } from "react-icons/si";
import SidenavItems, { SidenavItem } from "./sidenav-items/SidenavItems";
import { useSidenav } from "./SidenavContext";

export interface SidenavProps {
  navItems: SidenavItem[];
}

export function Sidenav({ navItems }: SidenavProps) {
  const { isOpen, onClose } = useSidenav();
  return (
    <React.Fragment>
      <VStack spacing="5" as="nav" display={{ base: "none", md: "flex" }}>
        <SidenavItems navItems={navItems} />
      </VStack>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Sidenav Header</DrawerHeader>
          <DrawerBody>
            <SidenavItems navItems={navItems} mode="over" />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </React.Fragment>
  );
}

export default Sidenav;
