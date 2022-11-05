import Typography from '@mui/material/Typography';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import { Header } from '../styles/Header.styled';
import { Footer } from '../styles/Footer.styled';
import { createTheme } from '@mui/material'; 


export const danceScriptTheme = createTheme({
    typography: {
        fontFamily: ['Dancing Script'],
      },
      

});


const Layout = ({ children }) => {
   return (  
   <>
    <Header>
        <ThemeProvider theme={danceScriptTheme}>
        <CssBaseline />
        <Typography component="h1" variant='h6' color='rgb(248, 248, 128)'>Sybs Crafty Shack</Typography>
        </ThemeProvider>
    </Header>
    <main>
    {children}
    </main>
    <Footer>
    <ThemeProvider theme={danceScriptTheme}>
        <CssBaseline />
        <Typography component="h6" variant='h6' color='rgb(248, 248, 128)'>&copy; Sybs Crafty Shack {new Date().getFullYear()}</Typography>
    </ThemeProvider>
    </Footer>
    </>
   );
};

export default Layout;