import Typography from '@mui/material/Typography';
import { CssBaseline,ThemeProvider  } from '@mui/material';
import { Header } from '../styles/Header.styled';
import { Footer } from '../styles/Footer.styled';
import {danceScriptTheme} from '../utils/themes'
import NavMenu from './NavMenu';
import { HeaderHomePageLink } from '../styles/Links.styled';
import { FooterDiv } from '../styles/Div.styled';
import { SocialImgLink } from '../styles/Links.styled';
import { SocialPic } from '../styles/Images.styled';




/*this will style the header title */
const headerTitleStyle = theme => ({
    color:'rgb(248, 248, 128)',
    fontSize:'1.45rem',
    [theme.breakpoints.up('sm')]:{
        fontSize: '2rem'
    }
});

/*this will style the copyright text in footer */
const copyStyle = theme => ({
    fontSize:'.9rem',
    color:'rgb(248, 248, 128)',
    padding:'3.2% 1% 3% 1%',
    [theme.breakpoints.up('sm')]:{
        fontSize: '1.2rem'
    }
});


const Layout = ({ children }) => {
  
   return (  
   <>
   {/**this provider is giving dancing script font to footer an header */}
   <ThemeProvider theme={danceScriptTheme}>
   <CssBaseline />
    <Header>  
       <HeaderHomePageLink href='/' ><Typography component="h1" variant='h6' sx={headerTitleStyle}>Sybs Crafty Shack</Typography></HeaderHomePageLink>
       {/**this is the material ui basic menu component */}
        <NavMenu/>
    </Header>
    <main>
    {children}
    </main>
    <Footer>
        <Typography sx={copyStyle} component="h6" variant='h6' >&copy; Sybs Crafty Shack {new Date().getFullYear()}</Typography>
        <FooterDiv>
            <SocialImgLink href='https://www.facebook.com/groups/sybscraftyshack/?ref=share' target='_blank'>
                <SocialPic 
                 src='/fb_64px.png' 
                 srcSet='/fb_48px.png 228w, /fb_48px.png' 
                 alt='fb link'
                />
            </SocialImgLink>
            <SocialImgLink href='https://www.instagram.com/sybscraftyshack/?fbclid=IwAR3CNExLMc1B_S_y7EnY8JEQQlytD9Ac621Jaj0xlvf9FC7Pf2-Ez3HJg8Y' target='_blank'>
                <SocialPic 
                 src='/insta_64px.png' 
                 srcSet='/insta_48px.png 228w, /insta_48px.png' 
                 alt='insta link'
                />
            </SocialImgLink>
        </FooterDiv>
    </Footer>
    </ThemeProvider>
    </>
   );
};

export default Layout;