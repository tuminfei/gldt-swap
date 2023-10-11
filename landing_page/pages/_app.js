import { ChakraProvider } from '@chakra-ui/react';
import { Inter } from 'next/font/google';
import { useEffect } from 'react';
import './../src/css/global.css';
const inter = Inter({ subsets: ['latin'] });

export default function MyApp({ Component, pageProps }) {
    return (
        <div className={inter.className}>
            <ChakraProvider>
                <Component {...pageProps} />
            </ChakraProvider>
        </div>
    );
}
