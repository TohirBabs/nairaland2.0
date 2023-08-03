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
          overflow="hidden"
          overflowY={"scroll"}
          position={{ base: "relative", md: "fixed" }}
          height={{ base: windowSize, md: "100vh" }}
          transition="all 0.3s"
          width={{ base: menuOpen ? "320px" : "0", md: "350px" }}
        >
          <Sidebar open={menuOpen} toggleMenu={setMenuOpen} />
        </Box>
        <Box
          height={{ base: windowSize, md: "100vh" }}
          pl={{ base: "0", md: "370px" }}
          minWidth={{ base: "100vw" }}
          transition="all 0.3s"
          overflowY={menuOpen ? "hidden" : "auto"}
          position="relative"
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
              backgroundColor: `gray.400`,
            },
            "&::-webkit-scrollbar-track": {
              marginTop: "48px",
              marginBottom: "1rem",
            },
          }}
        >
          {menuOpen && (
            <Box
              position={"absolute"}
              backgroundColor={"rgba(0,0,0,0.5)"}
              height={{ base: menuOpen ? "100vh" : "auto" }}
              width="full"
            />
          )}

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
