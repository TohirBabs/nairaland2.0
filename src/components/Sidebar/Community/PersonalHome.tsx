"use client";
import React, { useEffect } from "react";
import { Button, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { FaReddit } from "react-icons/fa";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/dist/client/router";
import { useRecoilValue } from "recoil";
import useCommunityData from "../../../hooks/useCommunityData";
import { auth } from "../../../firebase/clientApp";
import { communityState } from "../../../atoms/communitiesAtom";
import NewPostForm from "../NewPostForm";

const PersonalHome: React.FC = () => {
  const [user, loadingUser, error] = useAuthState(auth);
  const router = useRouter();
  const { community } = router.query;
  // const visitedCommunities = useRecoilValue(communityState).visitedCommunities;
  const communityStateValue = useRecoilValue(communityState);
  const { loading } = useCommunityData();

  /**
   * Not sure why not working
   * Attempting to redirect user if not authenticated
   */
  useEffect(() => {
    if (!user && !loadingUser && communityStateValue.currentCommunity.id) {
      router.push(`/r/${communityStateValue.currentCommunity.id}`);
    }
  }, [user, loadingUser, communityStateValue.currentCommunity]);

  return (
    <Flex
      direction="column"
      bg="gray.800"
      color={"white"}
      borderRadius={20}
      overflow="hidden"
      cursor="pointer"
      border="1px solid"
      borderColor="gray.500"
      width={"full"}
    >
      <Flex direction="column" p={1}>
        {user && (
          <NewPostForm
            communityId={communityStateValue.currentCommunity.id}
            communityImageURL={communityStateValue.currentCommunity.imageURL}
            user={user}
          />
        )}
      </Flex>
    </Flex>
  );
};
export default PersonalHome;
