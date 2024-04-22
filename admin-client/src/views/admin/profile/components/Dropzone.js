// Chakra imports
import { Button, Flex, Image, Input, useColorModeValue } from "@chakra-ui/react";
// Assets
import React, { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";

function Dropzone(props) {
  const { content, setPreviewImages, ...rest } = props;
  const bg = useColorModeValue("gray.100", "navy.700");
  const borderColor = useColorModeValue("secondaryGray.100", "whiteAlpha.100");
  const buttonRef = useRef(null);
  const onDrop = useCallback((acceptedFiles) => {
    // Set preview images
    setPreviewImages(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));
  }, []);


  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' });

  return (
    <Flex
      align='center'
      justify='center'
      bg={bg}
      border='1px dashed'
      borderColor={borderColor}
      borderRadius='16px'
      w='100%'
      h='max-content'
      minH='100%'
      cursor='pointer'
      overflow='hidden'
      {...getRootProps({ className: "dropzone" })}
      {...rest}>
      <Input variant='main' {...getInputProps()} />
      <Button variant='no-effects' ref={buttonRef}>{content}</Button>
      
    </Flex>
  );
}

export default Dropzone;
