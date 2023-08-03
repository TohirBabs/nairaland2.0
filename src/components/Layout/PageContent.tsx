import React from "react";
import { Box, Flex } from "@chakra-ui/react";

interface PageContentLayoutProps {
  children: React.ReactNode;
  maxWidth?: string;
}

// Assumes array of two children are passed
const PageContentLayout: React.FC<PageContentLayoutProps> = ({
  children,
  maxWidth,
}) => {
  return (
    <Flex justify="center" p="5px 0px">
      <Flex width={"full"} justify="center">
        <Flex direction="column" mr={{ base: 0, md: 2 }} pt="60px" flexGrow={1}>
          {children && children[0 as keyof typeof children]}
        </Flex>
        {/* Right Content */}
        {/* <Box
          display={{ base: "none", md: "flex" }}
          flexDirection="column"
          minWidth="250px"
        >
          {children && children[1 as keyof typeof children]}
        </Box> */}
      </Flex>
    </Flex>
  );
};

export default PageContentLayout;
