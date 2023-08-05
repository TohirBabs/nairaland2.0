import React, { useState } from "react";
import {
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Skeleton,
  Spinner,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
} from "@chakra-ui/react";
import moment from "moment";
import { NextRouter } from "next/router";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineComment,
  AiOutlineDelete,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";
import { BsChat, BsDot } from "react-icons/bs";
import { FaReddit } from "react-icons/fa";
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
  IoBookmarkOutline,
} from "react-icons/io5";
import { Post } from "../../../atoms/postsAtom";
import Link from "next/link";
import { HiShare } from "react-icons/hi";

export type PostItemContentProps = {
  post: Post;
  onVote: (
    // event: React.MouseEvent<SVGElement, MouseEvent>,
    post: Post,
    vote: number,
    communityId: string,
    postIdx?: number
  ) => void;
  onDeletePost: (post: Post) => Promise<boolean>;
  userIsCreator: boolean;
  onSelectPost?: (value: Post, postIdx: number) => void;
  router?: NextRouter;
  postIdx?: number;
  userVoteValue?: number;
  homePage?: boolean;
};

const PostItem: React.FC<PostItemContentProps> = ({
  post,
  postIdx,
  onVote,
  onSelectPost,
  router,
  onDeletePost,
  userVoteValue,
  userIsCreator,
  homePage,
}) => {
  const [loadingImage, setLoadingImage] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const singlePostView = !onSelectPost; // function not passed to [pid]

  const handleDelete = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setLoadingDelete(true);
    try {
      const success = await onDeletePost(post);
      if (!success) throw new Error("Failed to delete post");

      console.log("Post successfully deleted");

      // Could proably move this logic to onDeletePost function
      if (router) router.back();
    } catch (error: any) {
      console.log("Error deleting post", error.message);
      /**
       * Don't need to setLoading false if no error
       * as item will be removed from DOM
       */
      setLoadingDelete(false);
      // setError
    }
  };

  return (
    <Flex
      border="1px solid"
      backgroundColor="gray.100"
      w={"full"}
      minWidth="300px"
      maxWidth={"98vw"}
      overflow="hidden"
      borderColor={singlePostView ? "white" : "gray.300"}
      borderRadius={singlePostView ? "20px 20px 0px 0px" : 20}
      cursor={singlePostView ? "unset" : "pointer"}
      _hover={{ borderColor: singlePostView ? "none" : "gray.500" }}
      onClick={() => onSelectPost && post && onSelectPost(post, postIdx!)}
    >
      {/* <Flex
        direction="column"
        align="center"
        justifyContent="space-between"
        bg={singlePostView ? "none" : "gray.100"}
        p={2}
        gap={2}
        width="50px"
        borderRadius={singlePostView ? "0" : "3px 0px 0px 3px"}
      >
        <Flex direction="column" align="center">
          <Icon
            as={userVoteValue === 1 ? AiFillLike : AiOutlineLike}
            color={userVoteValue === 1 ? "brand.100" : "gray.400"}
            fontSize={21}
            cursor="pointer"
            onClick={(event) => onVote(event, post, 1, post.communityId)}
          />
          <Text fontSize="9pt">{post.voteStatus}</Text>
          <Icon
            as={userVoteValue === -1 ? AiFillDislike : AiOutlineDislike}
            color={userVoteValue === -1 ? "#4379FF" : "gray.400"}
            fontSize={21}
            cursor="pointer"
            onClick={(event) => onVote(event, post, -1, post.communityId)}
          />
        </Flex>
        <Flex
          direction="column"
          align="center"
          borderRadius={4}
          _hover={{ bg: "gray.200" }}
          cursor="pointer"
        >
          <Icon as={AiOutlineComment} fontSize={21} color="gray.400" />
          <Text fontSize="9pt">{post.numberOfComments}</Text>
        </Flex>
      </Flex> */}
      <Flex direction="column" width="100%" bg={"white"} borderRadius={"10px"}>
        <Stack spacing={2} p={1} w="full">
          {post.createdAt && (
            <Flex>
              {/* <Image src={"/images/spaceship.png"} width="35px" /> */}

              <Flex gap={1} flexWrap="wrap">
                <Tag
                  size="sm"
                  border="1px solid"
                  p={2}
                  height="max-content"
                  colorScheme="cyan"
                  borderRadius="full"
                  borderColor={"gray.300"}
                >
                  🔬
                  <TagLabel ml={1}>{`${post.communityId}`}</TagLabel>
                </Tag>

                <Tag
                  size="sm"
                  p={2}
                  height="max-content"
                  border="1px solid"
                  borderColor={"gray.300"}
                  colorScheme="messenger"
                  borderRadius="full"
                >
                  🚀
                  <TagLabel ml={1}>technology</TagLabel>
                </Tag>

                <Tag
                  size="sm"
                  p={2}
                  height="max-content"
                  border="1px solid"
                  borderColor={"gray.300"}
                  colorScheme="yellow"
                  borderRadius="full"
                >
                  🔥
                  <TagLabel ml={1}>amazing</TagLabel>
                </Tag>
              </Flex>
              {/* <Text fontSize="sm">{post.userDisplayText}</Text> */}
            </Flex>
          )}
          <Text px={2} fontSize="1.2rem" fontWeight={600}>
            {post.title}
          </Text>
          {post.imageURL && (
            <Flex px={2} justify="center" align="center">
              {loadingImage && (
                <Skeleton height="200px" width="100%" borderRadius={4} />
              )}
              <Image
                // width="80%"
                // maxWidth="500px"
                // maxHeight="460px"
                border="1px solid"
                borderColor="gray.300"
                borderRadius={"10px"}
                src={post.imageURL}
                display={loadingImage ? "none" : "unset"}
                onLoad={() => setLoadingImage(false)}
                alt="Post Image"
              />
            </Flex>
          )}

          <Text px={2} fontSize="0.8rem">
            {post.body}
          </Text>
        </Stack>
        <Flex p={1} justifyContent="space-between" alignItems={"center"}>
          <AvatarGroup size="md" max={3} spacing={"-15px"}>
            <Avatar
              name="Ryan Florence"
              src="/images/avt1.jpg"
              // borderRadius={17}
            />
            <Avatar
              // borderRadius={17}
              name="Segun Adebayo"
              src="/images/avt2.jpg"
            />
            <Avatar
              // borderRadius={17}
              name="Kent Dodds"
              src="/images/avt3.jpg"
            />
            <Avatar
              // borderRadius={17}
              name="Prosper Otemuyiwa"
              src="/images/avt2.jpg"
            />
            <Avatar
              // borderRadius={17}
              name="Christian Nwamba"
              src="/images/avt1.jpg"
            />
            <Avatar
              // borderRadius={17}
              name="Christian Nwamba"
              src="/images/avt1.jpg"
            />
            <Avatar
              // borderRadius={17}
              name="Christian Nwamba"
              src="/images/avt1.jpg"
            />
          </AvatarGroup>
          <Flex
            align="center"
            gap={2}
            border="1px solid"
            borderColor={"gray.300"}
            borderRadius="2rem"
            backgroundColor={"gray.200"}
          >
            {/* <Icon
              as={userVoteValue === 1 ? "👍" : AiOutlineLike}
              color={userVoteValue === 1 ? "brand.100" : "gray.400"}
              fontSize={21}
              cursor="pointer"
              onClick={(event) => onVote(event, post, 1, post.communityId)}
            /> */}
            <Button
              margin={"2px"}
              p={1}
              fontSize={"0.8rem"}
              backgroundColor={userVoteValue === 1 ? "green.300" : "gray.300"}
              onClick={(event) => onVote(post, 1, post.communityId)}
            >
              👍
            </Button>
            <Text fontSize="9pt">{post.voteStatus}</Text>
            <Button
              margin={"2px"}
              p={0}
              fontSize={"0.8rem"}
              backgroundColor={userVoteValue === -1 ? "red.300" : "gray.300"}
              onClick={(event) => onVote(post, -1, post.communityId)}
            >
              👎
            </Button>
            {/* <Icon
              as={userVoteValue === -1 ? AiFillDislike : AiOutlineDislike}
              color={userVoteValue === -1 ? "#4379FF" : "gray.400"}
              fontSize={21}
              cursor="pointer"
              onClick={(event) => onVote(event, post, -1, post.communityId)}
            /> */}
          </Flex>
        </Flex>

        {/* <Flex ml={1} mb={0.5} color="gray.500" fontWeight={600}>
          <Flex`
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
          >
            <Icon as={BsChat} mr={2} />
            <Text fontSize="9pt">{post.numberOfComments}</Text>
          </Flex>
          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
          >
            <Icon as={IoArrowRedoOutline} mr={2} />
            <Text fontSize="9pt">Share</Text>
          </Flex>
          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
          >
            <Icon as={IoBookmarkOutline} mr={2} />
            <Text fontSize="9pt">Save</Text>
          </Flex>
          {userIsCreator && (
            <Flex
              align="center"
              p="8px 10px"
              borderRadius={4}
              _hover={{ bg: "gray.200" }}
              cursor="pointer"
              onClick={handleDelete}
            >
              {loadingDelete ? (
                <Spinner size="sm" />
              ) : (
                <>
                  <Icon as={AiOutlineDelete} mr={2} />
                  <Text fontSize="9pt">Delete</Text>
                </>
              )}
            </Flex>
          )}
        </Flex> */}
      </Flex>
    </Flex>
  );
};

export default PostItem;
