import { useCanister } from '@connect2ic/react';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const queryGLDTbalance = async (actor) => {
    const req = await actor[0].icrc1_total_supply()
    return req
}

export const useTotalSupply = () => {
    const [totalSupply, setTotalSupply] = useState([]);
    const gldtLedgerActor = useCanister('gldtLedgerCanister')
    useEffect(() => {
        const fetchSupply = async () => {
            const fetchedtotalSupply = await queryGLDTbalance(gldtLedgerActor);
            setTotalSupply((Number(fetchedtotalSupply) / 100000000).toFixed(2));
        };
        fetchSupply();
    }, []);
    return totalSupply
};

export default useTotalSupply;