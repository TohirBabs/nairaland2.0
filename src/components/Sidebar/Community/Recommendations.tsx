import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Image,
  Skeleton,
  SkeletonCircle,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
  TagLeftIcon,
  Text,
} from "@chakra-ui/react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaReddit } from "react-icons/fa";
import { Community } from "../../../atoms/communitiesAtom";
import { firestore } from "../../../firebase/clientApp";
import useCommunityData from "../../../hooks/useCommunityData";
import SearchInput from "../SearchInput";

type RecommendationsProps = {};

const Recommendations: React.FC<RecommendationsProps> = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(false);
  const { communityStateValue, onJoinLeaveCommunity } = useCommunityData();

  const getCommunityRecommendations = async () => {
    setLoading(true);
    try {
      const communityQuery = query(
        collection(firestore, "communities"),
        orderBy("numberOfMembers", "desc"),
        limit(5)
      );
      const communityDocs = await getDocs(communityQuery);
      const communities = communityDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Community[];
      console.log("HERE ARE COMS", communities);

      setCommunities(communities);
    } catch (error: any) {
      console.log("getCommunityRecommendations error", error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getCommunityRecommendations();
  }, []);

  return (
    <Flex
      direction="column"
      bg="grey.600"
      color={"white"}
      borderRadius={23}
      overflow="hidden"
      cursor="pointer"
      border="1px solid"
      borderColor="gray.500"
      w={"full"}
      p={1}
    >
      <SearchInput />
      <Flex direction="column">
        {loading ? (
          <Stack mt={2} p={3}>
            <Flex justify="space-between" align="center">
              <SkeletonCircle size="10" />
              <Skeleton height="10px" width="70%" />
            </Flex>
            <Flex justify="space-between" align="center">
              <SkeletonCircle size="10" />
              <Skeleton height="10px" width="70%" />
            </Flex>
            <Flex justify="space-between" align="center">
              <SkeletonCircle size="10" />
              <Skeleton height="10px" width="70%" />
            </Flex>
          </Stack>
        ) : (
          <Flex
            flexWrap={"wrap"}
            justifyContent="center"
            width="full"
            py={2}
            gap={2}
          >
            {communities.map((item, index) => {
              const isJoined = !!communityStateValue.mySnippets.find(
                (snippet) => snippet.communityId === item.id
              );
              return (
                // <Link key={item.id} href={`/r/${item.id}`}>
                // <Flex
                //   position="relative"
                //   align="center"
                //   fontSize="10pt"
                //   // borderBottom="1px solid"
                //   borderColor="gray.200"
                //   p={1}
                //   fontWeight={600}
                // >
                //   <Flex width="80%" align="center">
                //     {/* <Flex width="15%">
                //       <Text mr={2}>{index + 1}</Text>
                //     </Flex> */}
                //     <Flex align="center" width="80%">
                //       {item.imageURL ? (
                //         <Image
                //           borderRadius="full"
                //           boxSize="28px"
                //           src={item.imageURL}
                //           mr={2}
                //         />
                //       ) : (
                //         <Icon
                //           as={FaReddit}
                //           fontSize={30}
                //           color="brand.100"
                //           mr={2}
                //         />
                //       )}
                //       <span
                //         style={{
                //           whiteSpace: "nowrap",
                //           overflow: "hidden",
                //           textOverflow: "ellipsis",
                //         }}
                //       >{`r/${item.id}`}</span>
                //     </Flex>
                //   </Flex>
                //   <Box position="absolute" right="0px">
                //     <IconButton
                //       height="25px"
                //       borderRadius={20}
                //       fontSize="1rem"
                //       px={3}
                //       onClick={(event) => {
                //         event.stopPropagation();
                //         onJoinLeaveCommunity(item, isJoined);
                //       }}
                //       aria-label="Add to friends"
                //       icon={isJoined ? <MinusIcon /> : <AddIcon />}
                //       variant={isJoined ? "outline" : "solid"}
                //     />
                //   </Box>
                // </Flex>
                <Tag
                  key={item.id}
                  size="sm"
                  border="1px solid"
                  p={3}
                  height="max-content"
                  colorScheme="cyan"
                  borderRadius="full"
                  borderColor={"gray.400"}
                >
                  {!isJoined && <TagLeftIcon boxSize="12px" as={AddIcon} />}
                  🔬
                  <TagLabel ml={1}>{item.id}</TagLabel>
                  {isJoined && <TagCloseButton />}
                </Tag>
                // </Link>
              );
            })}
            <Tag
              size="sm"
              border="1px solid"
              p={3}
              height="max-content"
              colorScheme="cyan"
              borderRadius="full"
              borderColor={"gray.400"}
            >
              🔬
              <TagLabel ml={1}>explore</TagLabel>
            </Tag>
            <Tag
              size="sm"
              border="1px solid"
              px={3}
              py={3}
              height="max-content"
              colorScheme="red"
              borderRadius="full"
              borderColor={"gray.400"}
            >
              <TagLeftIcon boxSize="12px" as={AddIcon} />
              🎧
              <TagLabel ml={1}>music</TagLabel>
            </Tag>
            <Tag
              size="sm"
              p={3}
              height="max-content"
              border="1px solid"
              borderColor={"gray.400"}
              colorScheme="messenger"
              borderRadius="full"
            >
              🚀
              <TagLabel ml={1}>technology</TagLabel>
            </Tag>
            <Tag
              size="sm"
              p={3}
              height="max-content"
              border="1px solid"
              borderColor={"gray.400"}
              colorScheme="whiteAlpha"
              borderRadius="full"
            >
              😹
              <TagLabel ml={1}>laughs</TagLabel>
            </Tag>
            <Tag
              size="sm"
              p={3}
              height="max-content"
              border="1px solid"
              borderColor={"gray.400"}
              colorScheme="yellow"
              borderRadius="full"
            >
              <TagLeftIcon boxSize="12px" as={AddIcon} />
              🔥
              <TagLabel ml={1}>amazing</TagLabel>
            </Tag>
            {/* <Box p="10px 20px">
              <Button height="30px" width="100%">
                View All
              </Button>
            </Box> */}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};
export default Recommendations;
