import { Box, Button, Checkbox, Flex, FormControl, FormLabel, Icon, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react'
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react'
import { Md1KPlus, MdAddCircleOutline, MdDelete, MdOutlineHdrPlus, MdUpload } from 'react-icons/md';
import { Bounce, toast } from 'react-toastify';
import SunEditor from 'suneditor-react';
import { BACK_END_HOST } from 'utils/AppConfig';
import api from 'utils/Services';
import Dropzone from "views/admin/dataTables/components/Dropzone.js";
import 'suneditor/dist/css/suneditor.min.css';

const ModalTemp = (props) => {
    const { size,
        title,
        body,
        secondAction,
        isOpen,
        onClose,
        color,
        action,
        type,
        categories,
        oldFormValue,
        setListProduct,
        tableData,
        ...rest
    } = props;
    const textColorBrand = useColorModeValue("brand.500", "white");
    const [image, setImage] = useState('');
    const editorProduct = useRef(null);
    const editorStory = useRef(null);
    const [formData, setFormData] = useState({
        name: '',
        importPrice: 0,
        sellPrice: 0,
        discount: 0,
        discountTime: '',
        description: '',
        isCombo: false,
        subdescription: '',
        category: '',
        quantity: 0,
        story: ''
    });

    
    //handle input formDate change
    const handleInputChange = (event) => {
        const { name, value, checked } = event.target;
        if (checked) {
            setFormData({
                ...formData,
                [name]: checked
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    //handleAdd
    const handleAdd = () => {
        const formDataSend = new FormData();
        formDataSend.append('image', image.file);
        formDataSend.append('name', formData.name);
        formDataSend.append('importPrice', formData.importPrice);
        formDataSend.append('sellPrice', formData.sellPrice);
        formDataSend.append('discount', formData.discount);
        formDataSend.append('description', formData.description);
        formDataSend.append('discountTime', formData.discountTime);
        formDataSend.append('isCombo', formData.isCombo);
        formDataSend.append('subdescription', editorProduct.current ? editorProduct.current.getContents().trim() : '');
        formDataSend.append('category', formData.category);
        formDataSend.append('quantity', formData.quantity);
        formDataSend.append('story', editorStory.current ? editorStory.current.getContents().trim() : '');

        api.post(`${BACK_END_HOST}/product`, formDataSend, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                var addedProduct = res.data;
                console.log('addedProduct', addedProduct);
                // handle category and categoryId
                for (let i = 0; i < categories.length; i++) {
                    if (categories[i]._id === addedProduct.category) {
                        addedProduct.category = categories[i].name;
                        addedProduct.categoryId = categories[i]._id;
                        break;
                    }
                }
                console.log('addedProduct2', tableData);
                setListProduct(
                    [...tableData,
                        addedProduct]
                )

                toast.success(`Đã thêm "${addedProduct.name}" vào danh sách sản phẩm`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                })
                //Reset form and close modal
                onClose();
                setFormData({
                    name: '',
                    importPrice: 0,
                    sellPrice: 0,
                    discount: 0,
                    description: '',
                    discountTime: '',
                    isCombo: false,
                    subdescription: '',
                    quantity: 0
                });
                setImage('');
            })
            .catch(error => {
                console.log('handleAdd error', error);
                toast.error('Có lỗi gì đó đã xảy ra!', {
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
    }
    //handleUpdate
    const handleUpdate = () => {
        const formDataSend = new FormData();
        console.log('image', formData);
        console.log('image.file', image.file);

        if (image.file) {
            console.log('vao');
            formDataSend.append('image', image.file);
        }
        formDataSend.append('name', formData.name);
        formDataSend.append('importPrice', formData.importPrice);
        formDataSend.append('sellPrice', formData.sellPrice);
        formDataSend.append('discount', formData.discount);
        formDataSend.append('description', formData.description);
        formDataSend.append('discountTime', formData.discountTime);
        formDataSend.append('isCombo', formData.isCombo);
        formDataSend.append('subdescription', editorProduct.current ? editorProduct.current.getContents().trim() : '');
        formDataSend.append('category', formData.category);
        formDataSend.append('quantity', formData.quantity);
        formDataSend.append('story', editorStory.current ? editorStory.current.getContents().trim() : '');

        formDataSend.forEach((value, key) => {
            console.log(key, value); // In ra khóa và giá trị
        });
        api.put(`${BACK_END_HOST}/product/${oldFormValue._id}`, formDataSend, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                var updatedProduct = res.data;
                // handle category and categoryId
                for (let i = 0; i < categories.length; i++) {
                    if (categories[i]._id === updatedProduct.category) {
                        updatedProduct.category = categories[i].name;
                        updatedProduct.categoryId = categories[i]._id;
                        break;
                    }
                }
                // update tableDate
                const updatedProductList = tableData.map(product => {
                    if (product._id === updatedProduct._id) {
                        return updatedProduct;
                    }
                    return product;
                })

                setListProduct(updatedProductList);
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
                //Reset form and close modal
                onClose();
                setFormData({
                    name: '',
                    importPrice: 0,
                    sellPrice: 0,
                    discount: 0,
                    description: '',
                    discountTime: '',
                    isCombo: false,
                    subdescription: '',
                    quantity: 0
                });
                setImage('');
            })
            .catch(error => {
                console.log('handleUpdate error', error);
                toast.error('Có lỗi gì đó đã xảy ra!', {
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
    }

    const closeAndReset = () => {
        setFormData({
            name: '',
            importPrice: 0,
            sellPrice: 0,
            discount: 0,
            description: '',
            discountTime: '',
            isCombo: false,
            subdescription: '',
            quantity: 0
        });
        setImage('');
        onClose();
    }


    // The sunEditor parameter will be set to the core suneditor instance when this function is called
    const getSunEditorInstanceTitle = (sunEditor) => {
        editorProduct.current = sunEditor;
    };
    const getSunEditorInstanceStory = (sunEditor) => {
        editorStory.current = sunEditor;
    };

    useEffect(() => {
        if (oldFormValue && isOpen) {
            setImage({
                value: oldFormValue.image
            })
            setFormData({
                name: oldFormValue.name,
                importPrice: oldFormValue.importPrice,
                sellPrice: oldFormValue.sellPrice,
                discount: oldFormValue.discount,
                discountTime: oldFormValue.discountTime,
                description: oldFormValue.description,
                isCombo: oldFormValue.isCombo,
                subdescription: oldFormValue.subdescription,
                category: oldFormValue.categoryId,
                quantity: oldFormValue.quantity,
                story: oldFormValue.story
            })

        }
    }, [oldFormValue, isOpen])

    return (
        <Modal isOpen={isOpen} onClose={closeAndReset} size={size} scrollBehavior='inside'>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {type === 'add' ?
                        (<>
                            <FormControl>
                                <FormLabel>Tên</FormLabel>
                                <Input
                                    placeholder='Đồ ăn vặt A'
                                    name="name"
                                    onChange={handleInputChange}
                                    value={formData?.name}
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Loại</FormLabel>
                                <Select
                                    placeholder='Chọn loại'
                                    name="category"
                                    onChange={handleInputChange}
                                    value={formData?.category}
                                >
                                    {
                                        categories && categories.map(category =>
                                            <option value={category._id}>{category.name}</option>
                                        )
                                    }
                                </Select>
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Số lượng</FormLabel>
                                <Input
                                    type="number"
                                    placeholder='8'
                                    name="quantity"
                                    onChange={handleInputChange}
                                    value={formData?.quantity}
                                />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Giá nhập (đồng)</FormLabel>
                                <Input
                                    type="number"
                                    placeholder='6000'
                                    name="importPrice"
                                    onChange={handleInputChange}
                                    value={formData?.importPrice}
                                />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Giá Bán (đồng)</FormLabel>
                                <Input
                                    type="number"
                                    placeholder='10000'
                                    name="sellPrice"
                                    onChange={handleInputChange}
                                    value={formData?.sellPrice}
                                />
                            </FormControl>
                           
                            <FormControl mt={4}>
                                <FormLabel>Thông tin sản phẩm</FormLabel>
                                <Input
                                    type="text"
                                    placeholder='10'
                                    name="description"
                                    onChange={handleInputChange}
                                    value={formData?.description}
                                />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Ngày hết hạn giảm giá</FormLabel>
                                <Input
                                    type="date"
                                    name="discountTime"
                                    onChange={handleInputChange}
                                    value={formData ? moment(formData.discountTime).format('YYYY-MM-DD') : ''}
                                />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Có phải combo không?</FormLabel>
                                <Checkbox
                                    colorScheme='green'
                                    name="isCombo"
                                    onChange={handleInputChange}
                                    defaultChecked={formData?.isCombo}
                                >
                                    Có
                                </Checkbox>
                            </FormControl>
                            {
                                formData?.isCombo ?
                                    (
                                        <div>
                                            <FormControl mt={4}>
                                                <FormLabel>Các sản phẩm</FormLabel>
                                                <SunEditor
                                                    ref={editorProduct}
                                                    setOptions={{
                                                        height: 200,
                                                        buttonList: [
                                                            ['undo', 'redo'],
                                                            ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                                                            ['font', 'fontSize', 'formatBlock'],
                                                            ['paragraphStyle', 'blockquote'],
                                                            ['fontColor', 'hiliteColor', 'textStyle'],
                                                            ['removeFormat'],
                                                            '/',
                                                            ['outdent', 'indent'],
                                                            ['align', 'horizontalRule', 'list', 'lineHeight'],
                                                            ['table', 'link', 'image', 'video'],
                                                            ['fullScreen', 'showBlocks', 'codeView'],
                                                            ['preview', 'print']
                                                        ]
                                                    }}
                                                    getSunEditorInstance={getSunEditorInstanceTitle}
                                                />
                                            </FormControl>
                                            <FormControl mt={4}>
                                                <FormLabel>Câu truyện</FormLabel>
                                                <SunEditor
                                                    ref={editorStory}
                                                    setOptions={{
                                                        height: 200,
                                                        buttonList: [
                                                            ['undo', 'redo'],
                                                            ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                                                            ['font', 'fontSize', 'formatBlock'],
                                                            ['paragraphStyle', 'blockquote'],
                                                            ['fontColor', 'hiliteColor', 'textStyle'],
                                                            ['removeFormat'],
                                                            '/',
                                                            ['outdent', 'indent'],
                                                            ['align', 'horizontalRule', 'list', 'lineHeight'],
                                                            ['table', 'link', 'image', 'video'],
                                                            ['fullScreen', 'showBlocks', 'codeView'],
                                                            ['preview', 'print']
                                                        ]
                                                    }}
                                                    getSunEditorInstance={getSunEditorInstanceStory}
                                                />
                                            </FormControl>
                                        </div>
                                    )
                                    :
                                    (<></>)
                            }


                            <FormControl mt={4}>
                                <FormLabel>Ảnh</FormLabel>
                                <SimpleGrid
                                    columns={{ base: 1, md: 1 }}
                                    gap='20px'
                                    mb={{ base: "20px", xl: "0px" }}
                                    maxHeight='100%'
                                    height='100%'
                                >
                                    <Flex
                                        minH='300px'
                                        direction={{ base: "column", "2xl": "row" }}
                                        justify='center'
                                    >
                                        <Dropzone
                                            w={{ base: "100%", "2xl": "268px" }}
                                            me='36px'
                                            maxH={{ base: "60%", lg: "50%", "2xl": "100%" }}
                                            minH={{ base: "60%", lg: "50%", "2xl": "100%" }}
                                            setImage={setImage}
                                            image={image}
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
                                </SimpleGrid>

                            </FormControl>
                        </>) :
                        body
                    }
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Đóng
                    </Button>
                    <Button
                        variant='ghost'
                        color={color}
                        onClick={type === 'add' ? (oldFormValue ? handleUpdate : handleAdd) : action}>
                        {secondAction}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ModalTemp