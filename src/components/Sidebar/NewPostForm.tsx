import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  Stack,
  Textarea,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tag,
  TagLabel,
  TagLeftIcon,
  DarkMode,
  IconButton,
  TagCloseButton,
} from "@chakra-ui/react";
import { User } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import { AiFillCloseCircle } from "react-icons/ai";
import { useRecoilState, useSetRecoilState } from "recoil";
import { firestore, storage } from "../../firebase/clientApp";
// import TabItem from "./TabItem";
import { postState } from "../../atoms/postsAtom";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import TextInputs from "./TextInputs";
import ImageUpload from "./ImageUpload";
import {
  AddIcon,
  ChevronDownIcon,
  EditIcon,
  ExternalLinkIcon,
  HamburgerIcon,
  RepeatIcon,
} from "@chakra-ui/icons";
import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/react";

import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
  AutoCompleteTag,
} from "@choc-ui/chakra-autocomplete";
import { FaHashtag } from "react-icons/fa";

export type TabItemIcon = {
  title: string;
  icon: typeof Icon.arguments;
};

type NewPostFormProps = {
  communityId: string;
  communityImageURL?: string;
  user: User;
};

type Tag = { name: string; emoji: string };

const NewPostForm: React.FC<NewPostFormProps> = ({
  communityId,
  communityImageURL,
  user,
}) => {
  const hazhtags: Tag[] = [
    { name: "explore", emoji: "🔬" },
    { name: "music", emoji: "🎧" },
    { name: "technology", emoji: "🚀" },
    { name: "movie", emoji: "🎥" },
    { name: "education", emoji: "📚" },
    { name: "amazing", emoji: "🔥" },
    { name: "conversation", emoji: "💬" },
    { name: "games", emoji: "🎮" },
    { name: "fashion", emoji: "👠" },
    { name: "food", emoji: "🍔" },
  ];
  const [textInputs, setTextInputs] = useState({
    title: "",
    body: "",
  });
  const [selectedFile, setSelectedFile] = useState<string>();
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const selectFileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const setPostItems = useSetRecoilState(postState);

  const handleCreatePost = async () => {
    setLoading(true);
    const { title, body } = textInputs;
    try {
      const postDocRef = await addDoc(collection(firestore, "posts"), {
        communityId,
        communityImageURL: communityImageURL || "",
        creatorId: user.uid,
        userDisplayText: user.email!.split("@")[0],
        title,
        body,
        numberOfComments: 0,
        voteStatus: 0,
        createdAt: serverTimestamp(),
        editedAt: serverTimestamp(),
      });

      console.log("HERE IS NEW POST ID", postDocRef.id);

      // // check if selectedFile exists, if it does, do image processing
      if (selectedFile) {
        const imageRef = ref(storage, `posts/${postDocRef.id}/image`);
        await uploadString(imageRef, selectedFile, "data_url");
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(postDocRef, {
          imageURL: downloadURL,
        });
        console.log("HERE IS DOWNLOAD URL", downloadURL);
      }

      // Clear the cache to cause a refetch of the posts
      setPostItems((prev) => ({
        ...prev,
        postUpdateRequired: true,
      }));
      router.back();
    } catch (error) {
      console.log("createPost error", error);
      setError("Error creating post");
    }
    setLoading(false);
  };

  const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (event.target.files?.[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target?.result as string);
      }
    };
  };

  const onTextChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTextInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Flex direction="column" borderRadius={15} gap={1}>
      <Flex align={"center"} height="110px" gap={1}>
        <Flex
          flex="1"
          // align={"center"}
          justify="center"
          bg={"gray.700"}
          borderRadius={14}
          height="100%"
          position={"relative"}
        >
          <Flex direction="column" gap={1} width="full" height={"full"} m={1}>
            {selectedTags &&
              selectedTags.map((tag, index) => (
                <Tag
                  key={index}
                  size="sm"
                  border="1px solid"
                  p={1}
                  pl={0}
                  height="max-content"
                  width={"max-content"}
                  colorScheme="cyan"
                  borderRadius={12}
                  borderColor={"gray.400"}
                >
                  <TagCloseButton /> {tag.emoji}
                  <TagLabel>{tag.name}</TagLabel>
                </Tag>
              ))}
          </Flex>
          <DarkMode>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<FaHashtag fontSize={16} />}
                bgColor="green.400"
                variant=""
                disabled={selectedTags.length < 3 ? false : true}
                border="1px solid"
                position={"absolute"}
                borderRadius="0.7rem"
                bottom={1}
                right={1}
                p={1}
                borderColor="gray.400"
                _focus={
                  {
                    // border: "none",
                  }
                }
                _active={{
                  background: "green.300",
                  borderColor: "blue.500",
                }}
                _hover={{
                  backgroundColor: "green.300",
                  // border: "none",
                }}
              />
              <MenuList
                maxHeight={500}
                overflow="auto"
                borderRadius={15}
                borderColor="gray.600"
              >
                {hazhtags.map((tag: Tag, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => {
                      var i = selectedTags.findIndex((x) => x.name == tag.name);

                      i === -1 && selectedTags.length < 3
                        ? setSelectedTags([...selectedTags, tag])
                        : null;
                    }}
                    icon={<>{tag.emoji}</>}
                  >
                    {tag.name}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </DarkMode>
        </Flex>
        <ImageUpload
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          selectFileRef={selectFileRef}
          onSelectImage={onSelectImage}
        />
      </Flex>

      <TextInputs
        textInputs={textInputs}
        onChange={onTextChange}
        handleCreatePost={handleCreatePost}
        loading={loading}
      />
    </Flex>
  );
};
export default NewPostForm;
