import { createTheme } from "@mui/material";
/**this theme gives dancing script as font style which is being imported in a custom document i.e. _document.js
 * It does not appear to work onthe children in main from the layout component
 */
 export const danceScriptTheme = createTheme({
    typography: {
        fontFamily: ['Dancing Script'],
      },
});

export const SelectDropdownTheme = createTheme({
  components: {
    MuiSelect: {
      
      defaultProps: {
        variant: 'standard',
      },
     
    
  }
  }
});

/**
  defaultProps: {
        variant: 'standard',
      },
 */