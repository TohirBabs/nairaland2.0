import React, { Ref } from "react";
import { Flex, Stack, Button, Image, Box } from "@chakra-ui/react";
import { BiImageAdd } from "react-icons/bi";
import { GiCancel } from "react-icons/gi";
import { RiImageAddLine } from "react-icons/ri";

type ImageUploadProps = {
  selectedFile?: string;
  setSelectedFile: (value: string) => void;
  setSelectedTab: (value: string) => void;
  selectFileRef: React.RefObject<HTMLInputElement>;
  onSelectImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const ImageUpload: React.FC<ImageUploadProps> = ({
  selectedFile,
  setSelectedFile,
  setSelectedTab,
  selectFileRef,
  onSelectImage,
}) => {
  return (
    <Flex
      direction="column"
      justify="center"
      width="100%"
      position={"relative"}
    >
      {selectedFile ? (
        <>
          <Image
            // bgSize={"cover"}
            alt=""
            src={selectedFile as string}
            maxHeight="300px"
            maxWidth={"min-content"}
            borderRadius={15}
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
        <Flex justify="center" align="center" p={5} width="20%" height={"50px"}>
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
