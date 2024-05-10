// Chakra imports
import { Button, Flex, Image, Input, useColorModeValue } from "@chakra-ui/react";
// Assets
import React, { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";

function Dropzone(props) {
    const { content, setImage, image, ...rest } = props;
    const bg = useColorModeValue("gray.100", "navy.700");
    const borderColor = useColorModeValue("secondaryGray.100", "whiteAlpha.100");
    const buttonRef = useRef(null);
    const [previewImage, setPreviewImage] = useState(image ? image.value : null);
    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();

        reader.onload = () => {
            setImage({
                value: reader.result,
                file: acceptedFiles[0]
            });
            buttonRef.current.style.display = 'none'
            setPreviewImage(reader.result);
        };

        reader.readAsDataURL(file);
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
            <Button 
                variant='no-effects'
                ref={buttonRef}
                hidden={image ? true : false}
                >
                {content}
            </Button>
            {
                previewImage && (
                    <Image src={previewImage} alt="Preview" style={{ width: '100%' }} />
                )
            }
        </Flex>
    );
}

export default Dropzone;
