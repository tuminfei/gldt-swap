import {
    Box,
    Button,
    Card,
    Flex,
    HStack,
    Heading,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Thead,
    Tr,
    VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import useSwapHistory, { useMaxEntry } from '@utils/hooks/useSwapHistory';
import useGLDTbalance from '@utils/hooks/useGLDTbalance';
import PrincipalFormat from '../Principal';
import Timestamp from '@ui/tooltip/timeStamp';
import TokenSign from '@ui/gldt/TokenSign';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';

const AccountContent = ({ id }) => {
    const { max } = useMaxEntry(id);
    console.log('max', max);
    const [currentPage, setCurrentPage] = useState(0);
    const history = useSwapHistory(currentPage, 10, id);
    const balance = useGLDTbalance(id);

    const totalSwap = history?.history?.Ok?.data[0]?.reduce((ac, e) => {
        return ac + parseInt(e.num_tokens.value) / 100000000;
    }, 0);

    return (
        <VStack alignItems={'flex-start'} gridColumn={'1/13'} spacing="100px" my="100px">
            <HStack>
                <Heading fontWeight={300} as="h1">
                    <PrincipalFormat principal={id} />
                </Heading>
                <HStack>
                    <Card p="15px 20px">
                        <Text>Balance</Text>
                        <HStack>
                            <Text>{balance}</Text> <TokenSign />
                        </HStack>
                    </Card>
                    <Card p="15px 20px">
                        <Text>Total Swaps</Text>
                        <Text>{totalSwap ? totalSwap : 0}</Text>
                    </Card>
                </HStack>
            </HStack>

            <TableContainer w={'100%'}>
                <Table>
                    <Thead>
                        <Tr>
                            <Td>Type</Td>
                            <Td>Date</Td>
                            <Td>Token id</Td>
                            <Td>GLDT amount</Td>
                            <Td>Status</Td>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {history?.history?.Ok.data[0]?.length === 0 && (
                            <Tr>
                                <Td>Empty History</Td>
                            </Tr>
                        )}
                        {history?.history?.Ok.data[0]?.map((e, i) => {
                            return (
                                <Tr key={i}>
                                    <Td>{Object.keys(e.record_type)}</Td>
                                    <Td>
                                        <Timestamp timestamp={parseInt(e.timestamp)} />
                                    </Td>
                                    <Td>{e.nft_id}</Td>
                                    <Td>
                                        <HStack>
                                            <Text>{parseInt(e.num_tokens.value) / 100000000}</Text>
                                            <TokenSign />
                                        </HStack>
                                    </Td>
                                    <Td>{Object.keys(e.status.status)}</Td>
                                </Tr>
                            );
                        })}
                    </Tbody>
                </Table>
                <Pagination
                    total={parseInt(max)}
                    currentHistoryPage={currentPage}
                    setCurrentHistoryPage={setCurrentPage}
                />
            </TableContainer>
        </VStack>
    );
};

export default AccountContent;

const Pagination = ({ currentHistoryPage, setCurrentHistoryPage, total }) => {
    return (
        <VStack p="20px">
            <Flex justifyContent={'space-between'} width={'100%'}>
                <Text>Page {currentHistoryPage + 1}</Text>
                <Text>{total} entries</Text>
            </Flex>
            <Flex justifyContent={'space-between'} width={'100%'}>
                <Button
                    bg="bg"
                    _hover={{
                        bg: 'border',
                    }}
                    isDisabled={currentHistoryPage < 1}
                    onClick={() => setCurrentHistoryPage((prev) => prev - 1)}
                >
                    <ArrowBackIcon />
                </Button>
                <Button
                    bg="bg"
                    _hover={{
                        bg: 'border',
                    }}
                    isDisabled={total / (currentHistoryPage + 1) < 10}
                    onClick={() => setCurrentHistoryPage((prev) => prev + 1)}
                >
                    <ArrowForwardIcon />
                </Button>
            </Flex>
        </VStack>
    );
};
