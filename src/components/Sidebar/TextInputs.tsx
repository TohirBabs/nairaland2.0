import React from "react";
import { Stack, Input, Textarea, Flex, Button } from "@chakra-ui/react";

type TextInputsProps = {
  textInputs: {
    title: string;
    body: string;
  };
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleCreatePost: () => void;
  loading: boolean;
};

const TextInputs: React.FC<TextInputsProps> = ({
  textInputs,
  onChange,
  handleCreatePost,
  loading,
}) => {
  return (
    <Stack spacing={0} width="100%">
      <Input
        name="title"
        border="none"
        value={textInputs.title}
        fontWeight={"800"}
        color="gray.300"
        onChange={onChange}
        _placeholder={{ color: "gray.500" }}
        _focus={
          {
            // outline: "none",
            // bg: "white",
            // border: "none",
            // borderColor: "black",
          }
        }
        fontSize="1.2rem"
        borderRadius={4}
        placeholder="title"
      />
      <Textarea
        name="body"
        border="none"
        value={textInputs.body}
        onChange={onChange}
        fontSize="1rem"
        placeholder="Text (optional)"
        _placeholder={{ color: "gray.500" }}
        _focus={
          {
            // outline: "none",
            // bg: "white",
            // border: "none",
            // borderColor: "black",
          }
        }
        height="100px"
      />
      <Flex justify="flex-end">
        <Button
          height="34px"
          padding="0px 30px"
          disabled={!textInputs.title}
          isLoading={loading}
          onClick={handleCreatePost}
        >
          Post
        </Button>
      </Flex>
    </Stack>
  );
};
export default TextInputs;
