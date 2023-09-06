import { Box, Dialog, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import Address from './Address';
import LogoutButton from '../button/Logout';
import useGLDTbalance from '@/components/hooks/useGLDTbalance';

const WalletContainer = ({ user, open, setOpen }) => {
    const balance = useGLDTbalance();

    return (
        <WalletBox open={open} onClose={() => setOpen(false)}>
            <Address address={user.principal} />
            <BalanceContainer>
                <Box>
                    <Typography sx={{ fontSize: '16px', fontWeight: 500, color: '#626263' }}>
                        GLDT Balance
                    </Typography>
                    <Box> {balance} </Box>
                </Box>
            </BalanceContainer>
            <LogoutButton />
        </WalletBox>
    );
};

export default WalletContainer;

const WalletTitle = styled(Typography)`
    font-size: 20px;
    font-weight: 500;
`;

const BalanceContainer = styled(Box)`
    background-color: #f4f5f7;
    color: #626263
    border-radius: 8px;
    padding: 12px;
    margin: 10px 0;
`;

const Balance = styled(Typography)`
    font-size: 16px;
    font-weight: 400;
`;

const WalletBox = styled(Dialog)`
    .MuiDialog-paper {
        width: 243px;
        border-radius: 8px;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        padding: 15px;
        position: absolute;
        top: 100px;
        right: 30px;
    }
`;
