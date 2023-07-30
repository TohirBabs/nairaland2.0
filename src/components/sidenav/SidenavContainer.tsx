import { Box, Grid, GridItem } from "@chakra-ui/react";
import { ReactNode, ReactElement } from "react";

export interface SidenavContainerProps {
  children: ReactNode;
  sidenav: ReactElement;
}
export function SidenavContainer({ children, sidenav }: SidenavContainerProps) {
  return (
    <Grid templateAreas={`'sidebar main'`} templateColumns="auto 1fr">
      <GridItem area="sidebar" as="aside" w="full" p={0}>
        <Box
          position="sticky"
          top="70px"
          w={{ base: 0, md: "72px" }}
          p={{ base: 0, md: 2 }}
          paddingTop={8}
          height={"calc(100vh - 60px)"}
          overflow="auto"
          css={{
            "&::-webkit-scrollbar": {
              height: "var(--chakra-sizes-1)",
              width: "var(--chakra-sizes-1)",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "var(--chakra-colors-gray-400)",
            },
          }}
        >
          {sidenav}
        </Box>
      </GridItem>
      <GridItem as="main" area="main">
        {children}
      </GridItem>
    </Grid>
  );
}

export default SidenavContainer;
