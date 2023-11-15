import { Box, Button, Divider, GridItem, HStack, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import GridSystem from '../layout/Grid';
import Scene from './scene/Scene';
import { Fade } from 'react-awesome-reveal';
const Banner = () => {
    return (
        <Fade
            as="div"
            style={{
                width: '100%',
            }}
        >
            <Box mt={['-40px', '-40px', '-0px']}>
                <GridSystem gap={[0, 0, 8]}>
                    <GridItem colStart={[1, 1, 1, 2]} colEnd={[13, 13, 12, 7]}>
                        <Box maxW={'500px'}>
                            <Heading as="h1" variant="h1">
                                GLDT
                            </Heading>
                            <Heading as="h2" variant="h2">
                                The Future of Tokenized Gold
                            </Heading>
                        </Box>
                    </GridItem>
                    <GridItem
                        colSpan={[12, 12, 3]}
                        height={['150px', '150px', '0', '0', '0']}
                        position={'relative'}
                        margin={['0 auto', '0 auto', 0]}
                        top={['0', '0', '-230px', '-50px', '-50px']}
                        mt={['30px', '30px', 0]}
                        mb={['20px', '20px', 0]}
                        right={['0', '0', '-450px', '-50px', '-150px']}
                    >
                        <Box
                            height={['250px', '250px', '300px', '400px', '400px']}
                            w={['250px', '250px', '300px', '400px', '400px']}
                            top={['-50px']}
                            right={[0, 0, '-50px']}
                            position="relative"
                            zIndex={-1}
                        >
                            <Scene />
                        </Box>
                    </GridItem>
                    <GridItem colSpan={12}>
                        <GridSystem gap={['0px', '0px', 8]}>
                            <GridItem
                                colSpan={[0, 0, 3, 2]}
                                alignSelf={'center'}
                                colStart={[0, 0, 1, 2]}
                            >
                                <Divider
                                    orientation="horizontal"
                                    borderColor={'black'}
                                    display={['none', 'none', 'block']}
                                />
                            </GridItem>
                            <GridItem
                                colSpan={[12, 12, 6, 3]}
                                colStart={[1, 1, 4]}
                                alignSelf={'center'}
                                py={['20px', '20px', 0]}
                            >
                                <HStack
                                    fontSize={'20px'}
                                    justifyContent={['center', 'center', 'flex-start']}
                                >
                                    <Text width={'fit-content'} fontSize={'20px'}>
                                        Learn&nbsp;how
                                    </Text>
                                    <Text
                                        fontSize={'20px'}
                                        as="span"
                                        color="gold"
                                        w={'fit-content'}
                                    >
                                        <strong style={{ color: 'inherit' }}>GLDT</strong>
                                    </Text>
                                    <Text paddingRight="10px" fontSize={'20px'}>
                                        works
                                    </Text>
                                    <Divider
                                        orientation="horizontal"
                                        borderColor={'black'}
                                        width={'150px'}
                                        alignItems={'center'}
                                        justifyContent={'flex-end'}
                                        display={['none', 'none', 'flex']}
                                        sx={{
                                            _before: {
                                                borderTop: '4px solid transparent',
                                                borderBottom: '4px solid transparent',
                                                borderLeft: '8px solid #000',
                                                marginTop: '1px',
                                                opacity: 1,
                                                content: "''",
                                            },
                                        }}
                                    />
                                </HStack>
                            </GridItem>

                            <GridItem colSpan={[12, 12, 3, 3, 2]} colStart={[]}>
                                <Button variant="yumi" w={'100%'} maxWidth={'auto'}>
                                    Play Video
                                </Button>
                            </GridItem>
                        </GridSystem>
                    </GridItem>
                </GridSystem>
            </Box>
        </Fade>
    );
};

export default Banner;
