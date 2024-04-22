import React, { useRef, useState } from "react";

// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Link,
  Text,
  useColorModeValue,
  SimpleGrid,
  Icon,
} from "@chakra-ui/react";

// Custom components
import Banner from "views/admin/marketplace/components/Banner";
import TableTopCreators from "views/admin/marketplace/components/TableTopCreators";
import HistoryItem from "views/admin/marketplace/components/HistoryItem";
import NFT from "components/card/NFT";
import Card from "components/card/Card.js";

// Assets
import Nft1 from "assets/img/nfts/Nft1.png";
import Nft2 from "assets/img/nfts/Nft2.png";
import Nft3 from "assets/img/nfts/Nft3.png";
import Nft4 from "assets/img/nfts/Nft4.png";
import Nft5 from "assets/img/nfts/Nft5.png";
import Nft6 from "assets/img/nfts/Nft6.png";
import Avatar1 from "assets/img/avatars/avatar1.png";
import Avatar2 from "assets/img/avatars/avatar2.png";
import Avatar3 from "assets/img/avatars/avatar3.png";
import Avatar4 from "assets/img/avatars/avatar4.png";
import tableDataTopCreators from "views/admin/marketplace/variables/tableDataTopCreators.json";
import { tableColumnsTopCreators } from "views/admin/marketplace/variables/tableColumnsTopCreators";
import SunEditor from "suneditor-react";
import 'suneditor/dist/css/suneditor.min.css';
import { MdUpload } from "react-icons/md";
import Dropzone from "views/admin/profile/components/Dropzone";
import { BACK_END_HOST } from "utils/AppConfig";
import { Bounce, toast } from "react-toastify";
import api from "utils/Services";

export default function Marketplace() {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const bg = useColorModeValue("gray.100", "navy.700");
  const borderColor = useColorModeValue("secondaryGray.100", "whiteAlpha.100");

  const editorTitle = useRef();
  const editorContent = useRef();
  const [previewImages, setPreviewImages] = useState([]);
  const [base64Array, setBase64Array] = useState([]);

  // The sunEditor parameter will be set to the core suneditor instance when this function is called
  const getSunEditorInstanceTitle = (sunEditor) => {
    editorTitle.current = sunEditor;
  };
  const getSunEditorInstanceContent = (sunEditor) => {
    editorContent.current = sunEditor;
  };

  const convertToBase64 = () => {
    const promises = previewImages.map(image => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    });

    Promise.all(promises)
      .then(results => {
        setBase64Array(results);
      })
      .catch(error => console.error('Error converting images to base64:', error));
  };


  const handleSubmit = () => {
    convertToBase64(); // convert image to base64

    if (editorTitle.current.getText().trim().length <= 0 ||
      editorContent.current.getText().trim().length <= 0 ||
      base64Array.length <= 0
    ) {
      toast.error('Không được để trống title, content và image', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else if (base64Array.length > 5) {
      toast.error('Số lượng ảnh không được nhiều hơn 5', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else {
      var title = editorTitle.current.getContents();
      var content = editorContent.current.getContents();

      api.post(`${BACK_END_HOST}/homePageInfo/update`, {
        title,
        content,
        images: base64Array
      })
        .then(res => {
          // reset Form
          editorTitle.current.setContents('');
          editorContent.current.setContents('');
          setPreviewImages([]);
          setBase64Array([]);

          // display success toast
          toast.success('Cập nhật thành công', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        })
        .catch(error => {
          console.error('submit error:', error);
        })
    }
  }


  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
      <Grid
        mb='20px'
        gridTemplateColumns={{ xl: "repeat(3, 1fr)", "2xl": "1fr 0.46fr" }}
        gap={{ base: "20px", xl: "20px" }}
        display={{ base: "block", xl: "grid" }}>
        <Flex
          flexDirection='column'
          gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}>
          {/* <Banner /> */}
          <Flex direction='column'>
            {/* <Flex
              mt='45px'
              mb='20px'
              justifyContent='space-between'
              direction={{ base: "column", md: "row" }}
              align={{ base: "start", md: "center" }}>
              <Text color={textColor} fontSize='2xl' ms='24px' fontWeight='700'>
                Trending NFTs
              </Text>
              <Flex
                align='center'
                me='20px'
                ms={{ base: "24px", md: "0px" }}
                mt={{ base: "20px", md: "0px" }}>
                <Link
                  color={textColorBrand}
                  fontWeight='500'
                  me={{ base: "34px", md: "44px" }}
                  to='#art'>
                  Art
                </Link>
                <Link
                  color={textColorBrand}
                  fontWeight='500'
                  me={{ base: "34px", md: "44px" }}
                  to='#music'>
                  Music
                </Link>
                <Link
                  color={textColorBrand}
                  fontWeight='500'
                  me={{ base: "34px", md: "44px" }}
                  to='#collectibles'>
                  Collectibles
                </Link>
                <Link color={textColorBrand} fontWeight='500' to='#sports'>
                  Sports
                </Link>
              </Flex>
            </Flex> */}
            {/* <SimpleGrid columns={{ base: 1, md: 3 }} gap='20px'>
              <NFT
                name='Abstract Colors'
                author='By Esthera Jackson'
                bidders={[
                  Avatar1,
                  Avatar2,
                  Avatar3,
                  Avatar4,
                  Avatar1,
                  Avatar1,
                  Avatar1,
                  Avatar1,
                ]}
                image={Nft1}
                currentbid='0.91 ETH'
                download='#'
              />
              <NFT
                name='ETH AI Brain'
                author='By Nick Wilson'
                bidders={[
                  Avatar1,
                  Avatar2,
                  Avatar3,
                  Avatar4,
                  Avatar1,
                  Avatar1,
                  Avatar1,
                  Avatar1,
                ]}
                image={Nft2}
                currentbid='0.91 ETH'
                download='#'
              />
              <NFT
                name='Mesh Gradients '
                author='By Will Smith'
                bidders={[
                  Avatar1,
                  Avatar2,
                  Avatar3,
                  Avatar4,
                  Avatar1,
                  Avatar1,
                  Avatar1,
                  Avatar1,
                ]}
                image={Nft3}
                currentbid='0.91 ETH'
                download='#'
              />
            </SimpleGrid> */}
            <Text
              mt='45px'
              mb='36px'
              color={textColor}
              fontSize='2xl'
              ms='24px'
              fontWeight='700'>
              Title
            </Text>
            <SimpleGrid
              columns={{ base: 1, md: 1 }}
              gap='20px'
              mb={{ base: "20px", xl: "0px" }}>
              {/* <NFT
                name='Swipe Circles'
                author='By Peter Will'
                bidders={[
                  Avatar1,
                  Avatar2,
                  Avatar3,
                  Avatar4,
                  Avatar1,
                  Avatar1,
                  Avatar1,
                  Avatar1,
                ]}
                image={Nft4}
                currentbid='0.91 ETH'
                download='#'
              />
              <NFT
                name='Colorful Heaven'
                author='By Mark Benjamin'
                bidders={[
                  Avatar1,
                  Avatar2,
                  Avatar3,
                  Avatar4,
                  Avatar1,
                  Avatar1,
                  Avatar1,
                  Avatar1,
                ]}
                image={Nft5}
                currentbid='0.91 ETH'
                download='#'
              />
              <NFT
                name='3D Cubes Art'
                author='By Manny Gates'
                bidders={[
                  Avatar1,
                  Avatar2,
                  Avatar3,
                  Avatar4,
                  Avatar1,
                  Avatar1,
                  Avatar1,
                  Avatar1,
                ]}
                image={Nft6}
                currentbid='0.91 ETH'
                download='#'
              /> */}
              <SunEditor
                setOptions={{
                  buttonList: [
                    ['font', 'fontSize', 'formatBlock'],
                    ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                    ['fontColor'],
                    ['undo', 'redo']
                  ],
                  fontColorList: [
                    '#000000', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff', '#ffffff',
                  ]
                }}
                getSunEditorInstance={getSunEditorInstanceTitle}
              />
            </SimpleGrid>
            <Text
              mt='45px'
              mb='36px'
              color={textColor}
              fontSize='2xl'
              ms='24px'
              fontWeight='700'>
              Content
            </Text>
            <SimpleGrid
              columns={{ base: 1, md: 1 }}
              gap='20px'
              mb={{ base: "20px", xl: "0px" }}>
              <SunEditor
                setOptions={{
                  buttonList: [
                    ['font', 'fontSize', 'formatBlock'],
                    ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                    ['fontColor'],
                    ['undo', 'redo']
                  ],
                  fontColorList: [
                    '#000000', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff', '#ffffff',
                  ]
                }}
                getSunEditorInstance={getSunEditorInstanceContent}
              />

            </SimpleGrid>
            <Text
              mt='45px'
              mb='36px'
              color={textColor}
              fontSize='2xl'
              ms='24px'
              fontWeight='700'>
              Image
            </Text>
            <SimpleGrid
              columns={{ base: 1, md: 3 }}
              gap='20px'
              mb={{ base: "20px", xl: "0px" }}
              maxHeight='100%'
              height='100%'
            >
              <Flex minH='300px' direction={{ base: "column", "2xl": "row" }}>
                <Dropzone
                  w={{ base: "100%", "2xl": "268px" }}
                  me='36px'
                  maxH={{ base: "60%", lg: "50%", "2xl": "100%" }}
                  minH={{ base: "60%", lg: "50%", "2xl": "100%" }}
                  setPreviewImages={setPreviewImages}
                  content={
                    <Box>
                      <Icon as={MdUpload} w='80px' h='80px' color={textColorBrand} />
                      <Flex justify='center' mx='auto' mb='12px'>
                        <Text fontSize='xl' fontWeight='700' color={textColorBrand}>
                          Upload Files
                        </Text>
                      </Flex>
                      <Text fontSize='sm' fontWeight='500' color='secondaryGray.500'>
                        PNG, JPG files are allowed
                      </Text>
                    </Box>
                  }
                />
              </Flex>
              {previewImages.map((file, index) => (
                <Flex
                  key={index}
                  align='center'
                  justify='center'
                  bg={bg}
                  border='1px dashed'
                  borderColor={borderColor}
                  borderRadius='16px'
                  w='100%'
                  // h='max-content'
                  height='500px'
                  maxHeight='400px'
                  cursor='pointer'
                  overflow='hidden'
                >
                  <img src={file.preview} alt={`Preview ${index}`} style={{ width: '100%' }} />
                </Flex>

              ))}
            </SimpleGrid>
            <Flex
              justify='center'
            >
              <Button
                w='140px'
                minW='140px'
                mt={{ base: "20px", "2xl": "auto" }}
                variant='brand'
                fontWeight='500'
                onClick={() => handleSubmit()}
              >
                Apply
              </Button>
            </Flex>

          </Flex>
        </Flex>
        {/* <Flex
          flexDirection='column'
          gridArea={{ xl: "1 / 3 / 2 / 4", "2xl": "1 / 2 / 2 / 3" }}>
          <Card px='0px' mb='20px'>
            <TableTopCreators
              tableData={tableDataTopCreators}
              columnsData={tableColumnsTopCreators}
            />
          </Card>
          <Card p='0px'>
            <Flex
              align={{ sm: "flex-start", lg: "center" }}
              justify='space-between'
              w='100%'
              px='22px'
              py='18px'>
              <Text color={textColor} fontSize='xl' fontWeight='600'>
                History
              </Text>
              <Button variant='action'>See all</Button>
            </Flex>

            <HistoryItem
              name='Colorful Heaven'
              author='By Mark Benjamin'
              date='30s ago'
              image={Nft5}
              price='0.91 ETH'
            />
            <HistoryItem
              name='Abstract Colors'
              author='By Esthera Jackson'
              date='58s ago'
              image={Nft1}
              price='0.91 ETH'
            />
            <HistoryItem
              name='ETH AI Brain'
              author='By Nick Wilson'
              date='1m ago'
              image={Nft2}
              price='0.91 ETH'
            />
            <HistoryItem
              name='Swipe Circles'
              author='By Peter Will'
              date='1m ago'
              image={Nft4}
              price='0.91 ETH'
            />
            <HistoryItem
              name='Mesh Gradients '
              author='By Will Smith'
              date='2m ago'
              image={Nft3}
              price='0.91 ETH'
            />
            <HistoryItem
              name='3D Cubes Art'
              author='By Manny Gates'
              date='3m ago'
              image={Nft6}
              price='0.91 ETH'
            />
          </Card>
        </Flex> */}
      </Grid>
      {/* Delete Product */}
    </Box>
  );
}
