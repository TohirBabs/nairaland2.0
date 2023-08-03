import { Box, Flex, Image, Stack } from "@chakra-ui/react";
import React, { useRef } from "react";

import Sidebar from "../Sidebar";

type Props = {
  children?: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [windowSize, setwindowSize] = React.useState(0);
  React.useEffect(() => {
    setwindowSize(window.innerHeight);
  }, []);
  return (
    <Flex
      width={"100vw"}
      height={{ base: windowSize, md: "100vh" }}
      overflow="hidden"
    >
      <Flex width={"max-content"} height="max-content">
        <Box
          overflowY={"scroll"}
          sx={{
            "&::-webkit-scrollbar": {
              width: "1rem",
              borderRadius: "3px",

              backgroundColor: `rgba(0, 0, 0, 0)`,
            },
            "&::-webkit-scrollbar-thumb": {
              border: "4px solid rgba(0, 0, 0, 0)",
              backgroundClip: "padding-box",
              borderRadius: "0.5rem",
              width: "0.5rem",
              backgroundColor: `green.300`,
            },
          }}
          position={{ base: "relative", md: "fixed" }}
          height={{ base: windowSize, md: "100vh" }}
          transition="all 0.3s"
          width={{ base: menuOpen ? "300px" : "0", md: "max-content" }}
        >
          <Sidebar open={menuOpen} />
        </Box>
        <Box
          height={{ base: windowSize, md: "100vh" }}
          pl={{ base: "0", md: "360px" }}
          minWidth={{ base: "100vw" }}
          transition="all 0.3s"
          overflowY={"scroll"}
          sx={{
            "&::-webkit-scrollbar": {
              width: "1rem",
              borderRadius: "0.5rem",

              backgroundColor: `transparent`,
            },
            "&::-webkit-scrollbar-thumb": {
              border: "4px solid rgba(0, 0, 0, 0)",
              backgroundClip: "padding-box",
              borderRadius: "0.5rem",
              width: "0.5rem",
              backgroundColor: `green.300`,
            },
          }}
        >
          <Flex
            align="center"
            gap={1}
            cursor="pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            p={1}
            alignItems="center"
            ml={3}
          >
            <Image src="/images/Logo.svg" height="2.5rem" alt="" />
            <Image
              alt=""
              display={{ base: "none", md: "unset" }}
              src="/images/nairalandText.svg"
              height="30px"
            />
          </Flex>
          {children}
        </Box>
      </Flex>
    </Flex>
  );
};

export default Layout;
