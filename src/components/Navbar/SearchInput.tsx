import React from "react";
import { Flex, InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const SearchInput: React.FC = () => {
  return (
    <Flex alignItems="center" w="full">
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          color="gray.400"
          // children={<SearchIcon mb={2} />}
        >
          <SearchIcon />
        </InputLeftElement>
        <Input
          borderRadius={10}
          border="1px solid"
          borderColor="gray.400"
          placeholder="Search nairaland"
          fontSize="1rem"
          _placeholder={{ color: "gray.500" }}
          _hover={{
            bg: "white",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          _focus={{
            outline: "none",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          height="40px"
          bg="gray.600"
        />
      </InputGroup>
    </Flex>
  );
};
export default SearchInput;
