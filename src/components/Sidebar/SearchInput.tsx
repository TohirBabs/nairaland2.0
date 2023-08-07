import React from "react";
import {
  Flex,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
} from "@chakra-ui/react";
import { Search2Icon, SearchIcon } from "@chakra-ui/icons";
import { FaHashtag } from "react-icons/fa";

const SearchInput: React.FC = () => {
  return (
    <Flex alignItems="center" w="full" mb={1}>
      <InputGroup alignItems="center">
        <InputLeftElement
          pointerEvents="none"
          color="gray.400"
          height="38px"
          pl={3}
          // children={<SearchIcon mb={2} />}
        >
          <FaHashtag />
        </InputLeftElement>
        <Input
          color={"white"}
          borderRadius={20}
          border="1px solid"
          borderColor="gray.600"
          placeholder="find hazh tags"
          fontSize="1rem"
          _placeholder={{ color: "gray.500" }}
          _hover={{
            bg: "gray.600",
            border: "1px solid",
            borderColor: "gray.500",
          }}
          _focus={{
            outline: "none",
            border: "1px solid",
            borderColor: "gray.500",
          }}
          height="38px"
          bg="gray.700"
        />
        <InputRightElement
          height="34px"
          right={"2px"}
          pointerEvents="none"
          bgColor={"gray.500"}
          borderRadius={20}
          px={3}
          top="50%"
          transform="translateY(-50%)"
          // children={<SearchIcon mb={2} />}
        >
          🔍
        </InputRightElement>
      </InputGroup>
    </Flex>
  );
};
export default SearchInput;
