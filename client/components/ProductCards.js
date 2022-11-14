import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Card } from '@mui/material';

export default function ProductCard({ product }) {
  return (
    <Card sx={{ maxWidth: 345, backgroundColor: "rgb(255,255,255,0.6)", border: '1px solid black'}}>
      <CardMedia
        component="img"
        alt={product.name}
        height="140"
        image={product.image.Location}
      />
      <CardContent sx={{display:'flex', flexDirection:'column',alignItems:'center'}} >
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{backgroundColor:'rgb(255,255,255,0.6)',padding:"1%",fontWeight:'bolder'}}>
         {product.description}
        </Typography>
      </CardContent>
      <CardActions sx={{display:'flex', flexDirection:'column',alignItems:'center'}}>
        <Button size="small" sx={{color:'rgb(255,255,255,0.8)', backgroundColor:'black'}}>Add To Cart</Button>
      </CardActions>
    </Card>
  );
}