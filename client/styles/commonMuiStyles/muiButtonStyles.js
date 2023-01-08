export const checkoutAdd2CartBtnStyle = theme => ({
    animation: 'wiggle 5s linear infinite',
    backgroundColor:' rgb(254, 167, 53)',
    color: 'rgb(0, 119, 255)',
    marginBottom: '3%',
    [theme.breakpoints.up('sm')]:{
      fontSize: '1.11rem'
  },
    [theme.breakpoints.up('md')]:{
      fontSize: '1.2rem'
  },
    '&:hover': {backgroundColor:'rgba(254, 114, 53)'},
    '@keyframes wiggle': {
      '0%, 7%': {
        transform: 'rotateZ(0)'
      },
      '15%':{
        transform: 'rotateZ(-15deg)'
      },
      '20%': {
        transform: 'rotateZ(10deg)'
      },
      '25%': {
        transform: 'rotateZ(-10deg)'
      },
      '30%': {
        transform: 'rotateZ(6deg)'
      },
      '35%' :{
        transform: 'rotateZ(-4deg)'
      },
      '40%, 100%': {
        transform: 'rotateZ(0)'
      },
    }
    
  });