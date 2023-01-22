import Typography from '@mui/material/Typography';
import { CssBaseline,ThemeProvider  } from '@mui/material';
import { Header } from '../styles/Header.styled';
import { Footer } from '../styles/Footer.styled';
import {danceScriptTheme} from '../utils/themes'
import NavMenu from './NavMenu';
import dynamic from "next/dynamic";
const Cart = dynamic(() =>import( './Cart'),{ssr: false});
import { HeaderHomePageLink } from '../styles/Links.styled';
import { FooterDiv, HeaderCartMenuDiv, ColumnFooterDiv  } from '../styles/Div.styled';
import { SocialImgLink,TopDevLink } from '../styles/Links.styled';
import { SocialPic } from '../styles/Images.styled';
import { LogoImage } from '../styles/Images.styled';




/*this will style the header title */
const headerTitleStyle = theme => ({
    color:'rgb(0, 119, 255)',
    fontSize:'1.8rem',
    [theme.breakpoints.up('sm')]:{
        fontSize: '3rem'
    },
    [theme.breakpoints.up('md')]:{
        fontSize: '3rem'
    },
    [theme.breakpoints.up('lg')]:{
        fontSize: '4rem'
    },
});

/*this will style the copyright text in footer */
const copyStyle = theme => ({
    fontSize:'.9rem',
    color:'rgb(0, 119, 255)',
    padding:'3.2% 1% 3% 1%',
    [theme.breakpoints.up('sm')]:{
        fontSize: '1.2rem'
    },
    [theme.breakpoints.up('md')]:{
        fontSize: '1.8rem'
    }
});


const Layout = ({ children}) => {
 
   return (  
   <>
   {/**this provider is giving dancing script font to footer an header */}
   <ThemeProvider theme={danceScriptTheme}>
   <CssBaseline />
    <Header>  
       <HeaderHomePageLink href='/' >
        <LogoImage
         src='/logo.png'
         alt='site logo'
         width={256}
         height={256}
         layout='intrinsic'
             />
        <Typography component="h1" variant='h6' sx={headerTitleStyle}>Top Shop</Typography>
    </HeaderHomePageLink>
        {/**this div holds the menus */}
       <HeaderCartMenuDiv>
       <Cart/>
       {/**this is the material ui basic menu component */}
        <NavMenu/>
        </HeaderCartMenuDiv>
    </Header>
    <main>
    {children}
    </main>
    <Footer>
        <ColumnFooterDiv>
        <Typography sx={copyStyle} component="body1" variant='body1' >&copy; Top Shop {new Date().getFullYear()}</Typography>
        <TopDevLink  href='https://topdev.tech/' target='_blank'>Engineered by TopDev.Tech</TopDevLink>
        </ColumnFooterDiv>
        <FooterDiv>
            <SocialImgLink href='https://www.facebook.com/topdev11' target='_blank'>
                <SocialPic 
                 src='/fb_48px.png' 
                 alt='fb link'
                 width={48}
                 height={48}
                />
            </SocialImgLink>
            <SocialImgLink href='https://www.instagram.com/topdev.tech/' target='_blank'>
                <SocialPic 
                 src='/insta_48px.png'  
                 alt='insta link'
                 width={48}
                 height={48}
                />
            </SocialImgLink>
        </FooterDiv>
    </Footer>
    </ThemeProvider>
    </>
   );
};


export default Layout;