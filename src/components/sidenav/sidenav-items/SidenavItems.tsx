import { IconType } from "react-icons";

export interface SidenavItem {
  icon: IconType;
  label: string;
  to: string;
}

export interface SidenavItemsProps {
  navItems: SidenavItem[];
  mode?: "semi" | "over";
}

import {
  List,
  ListItem,
  Icon,
  Flex,
  Text,
  Link,
  Tooltip,
  IconButton,
} from "@chakra-ui/react";

export function SidenavItems({ navItems, mode = "semi" }: SidenavItemsProps) {
  const sidebarItemInSemiMode = (
    { icon: Icon, ...item }: SidenavItem,
    index: number
  ) => (
    <ListItem key={index}>
      <Tooltip label={item.label} placement="right">
        <IconButton
          key={index}
          as={Link}
          _focus={{ bg: "gray.100" }}
          _activeLink={{ boxShadow: "md", bg: "orange.500", color: "white" }}
          bg="transparent"
          aria-label={item.label}
          borderRadius="xl"
          icon={<Icon />}
          to={item.to}
          color="black"
        />
      </Tooltip>
    </ListItem>
  );
  const sidebarItemInOverMode = (item: SidenavItem, index: number) => (
    <ListItem key={index}>
      <Link
        display="block"
        as={Link}
        to={item.to}
        _focus={{ bg: "gray.100" }}
        _hover={{
          bg: "gray.200",
        }}
        _activeLink={{ bg: "orange.500", color: "white" }}
        w="full"
        borderRadius="md"
      >
        <Flex alignItems="center" p={2}>
          <Icon boxSize="5" as={item.icon} />
          <Text ml={2}>{item.label}</Text>
        </Flex>
      </Link>
    </ListItem>
  );
  return (
    <List spacing={3}>
      {navItems.map((item, index) => sidebarItemInSemiMode(item, index))}
    </List>
  );
}

export default SidenavItems;
