import React, { Ref } from "react";
import { Flex, Stack, Button, Image, Box } from "@chakra-ui/react";
import { BiImageAdd } from "react-icons/bi";
import { GiCancel } from "react-icons/gi";
import { RiImageAddLine } from "react-icons/ri";

type ImageUploadProps = {
  selectedFile?: string;
  setSelectedFile: (value: string) => void;
  selectFileRef: React.RefObject<HTMLInputElement>;
  onSelectImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const ImageUpload: React.FC<ImageUploadProps> = ({
  selectedFile,
  setSelectedFile,
  selectFileRef,
  onSelectImage,
}) => {
  return (
    <Flex
      direction="column"
      justify="center"
      flex="1"
      bg={"gray.700"}
      borderRadius={14}
      height="100%"
      align={"center"}
      position={"relative"}
      overflow="hidden"
    >
      {selectedFile ? (
        <>
          <Image
            // bgSize={"cover"}
            alt=""
            src={selectedFile as string}
            minWidth="full"
            minHeight={"full"}
            width="100%"
            objectFit={"cover"}
          />

          <Box
            position={"absolute"}
            bottom={1}
            left={1}
            onClick={() => setSelectedFile("")}
            color="green.400"
          >
            <GiCancel fontSize={30} />
          </Box>
        </>
      ) : (
        <Flex justify="center" align="center" p={2}>
          <Box color="green.400" onClick={() => selectFileRef.current?.click()}>
            <RiImageAddLine fontSize={25} />
          </Box>
          <input
            id="file-upload"
            type="file"
            accept="image/x-png,image/gif,image/jpeg"
            hidden
            ref={selectFileRef}
            onChange={onSelectImage}
          />
        </Flex>
      )}
    </Flex>
  );
};
export default ImageUpload;
