import React, { useState } from "react";
import {
  Avatar,
  Flex,
  Icon,
  Image,
  Skeleton,
  Spinner,
  Stack,
  Tag,
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
    event: React.MouseEvent<SVGElement, MouseEvent>,
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
      bg="white"
      w={"full"}
      minWidth="300px"
      maxWidth={"98vw"}
      overflow="hidden"
      borderColor={singlePostView ? "white" : "gray.300"}
      borderRadius={singlePostView ? "20px 20px 0px 0px" : 12}
      cursor={singlePostView ? "unset" : "pointer"}
      _hover={{ borderColor: singlePostView ? "none" : "gray.500" }}
      onClick={() => onSelectPost && post && onSelectPost(post, postIdx!)}
    >
      <Flex
        direction="column"
        align="center"
        justifyContent="space-between"
        bg={singlePostView ? "none" : "gray.100"}
        p={2}
        gap={2}
        width="40px"
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
      </Flex>
      <Flex direction="column" width="100%">
        <Stack spacing={2} p="8px" w="full">
          {post.createdAt && (
            <Stack
              direction="row"
              align="center"
              justifyContent={"space-between"}
              fontSize="14px"
              w="full"
            >
              <Stack
                direction="row"
                spacing={0.6}
                align="center"
                fontSize="14px"
              >
                {homePage && (
                  <>
                    {/* {post.communityImageURL ? (
                    <Image
                      borderRadius="full"
                      boxSize="18px"
                      src={post.communityImageURL}
                      mr={2}
                      alt=""
                    />
                  ) : (
                    <Icon as={FaReddit} fontSize={18} mr={1} color="blue.500" />
                  )} */}

                    <Link href={`tag/${post.communityId}`}>
                      <Tag size="lg" colorScheme="gray" borderRadius="lg">
                        <Avatar
                          // src="https://bit.ly/sage-adebayo"
                          size="xs"
                          name="#"
                          ml={-2}
                          mr={1}
                          borderRadius={"md"}
                          bg="green.400"
                        />
                        <TagLabel
                          fontWeight={700}
                          color="green.400"
                        >{`${post.communityId}`}</TagLabel>
                      </Tag>
                    </Link>

                    <Icon as={BsDot} color="gray.500" fontSize={8} />
                  </>
                )}

                <Text color="gray.500">
                  {!homePage && post.userDisplayText}
                  {moment(new Date(post.createdAt.seconds * 1000)).fromNow(
                    true
                  )}
                </Text>
              </Stack>
              <Icon
                color="gray.500"
                justifySelf="right"
                fontSize={22}
                as={HiShare}
                mr={2}
              />
            </Stack>
          )}
          <Text fontSize="12pt" fontWeight={600}>
            {post.title}
          </Text>
          {post.imageURL && (
            <Flex justify="center" align="center">
              {loadingImage && (
                <Skeleton height="200px" width="100%" borderRadius={4} />
              )}
              <Image
                // width="80%"
                // maxWidth="500px"
                // maxHeight="460px"
                borderRadius={"10px"}
                src={post.imageURL}
                display={loadingImage ? "none" : "unset"}
                onLoad={() => setLoadingImage(false)}
                alt="Post Image"
              />
            </Flex>
          )}
          <Text fontSize="10pt">{post.body}</Text>
        </Stack>
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
