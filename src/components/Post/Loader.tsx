import React from "react";
import { Stack, Box, SkeletonText, Skeleton, Flex } from "@chakra-ui/react";

const PostLoader: React.FC = () => {
  return (
    <Flex direction={{ base: "column", md: "row" }} gap={1}>
      <Stack spacing={2} w="full">
        <Box padding="10px 10px" boxShadow="lg" bg="white" borderRadius={4}>
          <SkeletonText mt="4" noOfLines={1} width="40%" spacing="4" />
          <SkeletonText mt="4" noOfLines={4} spacing="4" />
          <Skeleton mt="4" height="200px" />
        </Box>
        <Box padding="10px 10px" boxShadow="lg" bg="white" borderRadius={4}>
          <SkeletonText mt="4" noOfLines={1} width="40%" spacing="4" />
          <SkeletonText mt="4" noOfLines={4} spacing="4" />
          <Skeleton mt="4" height="200px" />
        </Box>
      </Stack>
      <Stack spacing={2} w="full">
        <Box padding="10px 10px" boxShadow="lg" bg="white" borderRadius={4}>
          <SkeletonText mt="4" noOfLines={1} width="40%" spacing="4" />
          {/* <SkeletonText mt="4" noOfLines={4} spacing="4" /> */}
          <Skeleton mt="4" height="500px" />
        </Box>
        <Box padding="10px 10px" boxShadow="lg" bg="white" borderRadius={4}>
          <SkeletonText mt="4" noOfLines={1} width="40%" spacing="4" />
          <SkeletonText mt="4" noOfLines={4} spacing="4" />
          <Skeleton mt="4" height="200px" />
        </Box>
      </Stack>
    </Flex>
  );
};
export default PostLoader;
