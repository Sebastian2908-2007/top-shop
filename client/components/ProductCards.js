import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Card } from '@mui/material';
import { checkoutAdd2CartBtnStyle } from '../styles/commonMuiStyles/muiButtonStyles';

export default function ProductCard({ product }) {
  return (
    <Card sx={{ height:'100%',maxWidth: '100%', backgroundColor: "rgb(255,255,255,0.6)", border: '1px solid black'}}>
      <CardMedia
        component="img"
        alt={product.name}
        height="140"
        image={product.image.Location}
      />
      <CardContent sx={{display:'flex', flexDirection:'column',alignItems:'center'}} >
        <Typography gutterBottom variant="h5" component="div" 
        sx={{textShadow: '0 0 10px rgb(248, 248, 128)',fontSize:{xs:'1.5rem',xl:'1.8rem'}}}>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary"
         sx={{backgroundColor:'rgb(248, 248, 128,0.4)',padding:"2%",fontWeight:'bolder',fontSize:{xs:'1.3rem',xl:'1.5rem'}}}>
         {product.description}
        </Typography>
      </CardContent>
      <CardActions sx={{display:'flex', flexDirection:'column',alignItems:'center'}}>
        <Button size="small" sx={checkoutAdd2CartBtnStyle}>Add To Cart</Button>
      </CardActions>
    </Card>
  );
}