import { Box, Flex, Image, Stack } from "@chakra-ui/react";
import React, { useRef } from "react";
import MenuWrapper from "../Navbar/RightContent/ProfileMenu/MenuWrapper";

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
      position={"relative"}
    >
      {menuOpen && (
        <Box
          position={"fixed"}
          left={"0"}
          zIndex={100}
          backgroundColor={"rgba(0,0,0,0.5)"}
          height={{ base: menuOpen ? "100vh" : "auto" }}
          width={{ base: "full", md: "0" }}
        />
      )}
      <Flex width={"max-content"} height="max-content">
        <Box
          zIndex={1000}
          overflowY={"auto"}
          position={{ base: "relative", md: "fixed" }}
          height={{ base: windowSize, md: "100vh" }}
          transition="all 0.3s"
          width={{ base: menuOpen ? "330px" : "0", md: "370px" }}
        >
          <Sidebar open={menuOpen} toggleMenu={setMenuOpen} />
        </Box>

        <Box
          height={{ base: windowSize, md: "100vh" }}
          px={1}
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
              marginTop: "64px",
              marginBottom: "1rem",
            },
          }}
        >
          <Flex
            as={"header"}
            zIndex={1}
            position={{ base: "sticky", md: "relative" }}
            right={0}
            top={0}
            width="100%"
            backgroundColor={{
              base: "rgba(226, 232, 240, 0.3)",
              md: "transparent",
            }}
            backdropFilter="saturate(180%) blur(5px)"
            justifyContent={"space-between"}
            p={2}
          >
            <Image
              onClick={() => setMenuOpen(!menuOpen)}
              display={{ base: menuOpen ? "none" : "flex", md: "none" }}
              src="/images/Logo.svg"
              height="2.5rem"
              alt=""
            />

            <Flex
              align="center"
              gap={1}
              cursor="pointer"
              p={1}
              alignItems="center"
              ml={3}
              fontSize="1.6rem"
              fontWeight={700}
            >
              <Image
                src="/images/spaceship.png"
                height="2.5rem"
                alt=""
                mr={1}
                p={1}
              />
              <h1>explore</h1>
            </Flex>
            <MenuWrapper />
          </Flex>
          {/* <Box height="64px" width="full" /> */}

          {children}
        </Box>
      </Flex>
    </Flex>
  );
};

export default Layout;
