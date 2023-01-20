import '../styles/globals.css'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apolloClient'
import { StoreProvider } from '../utils/Globalstate';
import Layout from '../components/Layout';


function MyApp({ Component, pageProps }) {
const apolloClient = useApollo(pageProps);
 return( 
   <ApolloProvider client={apolloClient}>
    <StoreProvider>
      <Layout>
    <Component {...pageProps} />
    </Layout>
    </StoreProvider>
  </ApolloProvider>
 );
}

export default MyApp
