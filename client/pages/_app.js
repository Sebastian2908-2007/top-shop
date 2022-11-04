import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apolloClient'
import { StoreProvider } from '../utils/Globalstate';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
const apolloClient = useApollo(pageProps);
 return( 
   <ApolloProvider client={apolloClient}>
    <StoreProvider>
    <Component {...pageProps} />
    </StoreProvider>
  </ApolloProvider>
 );
}

export default MyApp
