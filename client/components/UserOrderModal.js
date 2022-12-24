/**MUI imports*/
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Card, CardContent, Grid } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
/**MUI imports ends*/
/**styled components imports*/
import { AdminUserOrderParagrapgh } from '../styles/P.styled';
import { UserOrderCardSpan } from '../styles/Spans.styled';
import { OrderCardDiv } from '../styles/Div.styled';
import { StickyHeader } from '../styles/Header.styled';
/**styled components imports ends*/
/**date converter function*/
import dateFormat from '../utils/dateFormat';

const UserOrderModal = ({orderOpen,setOrderOpen,orderInfo,setOrderInfo})=> {
   const orders = orderInfo.map(order => order);
    console.log(orders);
    console.log(orderInfo);
    const style = {
        display:"flex",
        flexDirection: "column",
        alignItems:"center",
          position: 'absolute',
          top: '120%',
          '@media screen and (min-width:375px )': {
           top:'100%'
          },
          '@media screen and (min-width:390px )': {
           top:'85%'
          },
          '@media screen and (min-width:768px )': {
           top:'45%'
          },
          '@media screen and (min-width:912px )': {
           top:'35%'
          },
          '@media screen and (min-width:1024px )': {
           top:'65%'
          },
          '@media screen and (min-width:1280px )': {
           top:'48%'
          },
          '@media screen and (min-width:1366px )': {
           top:'50%'
          },
          padding: '5%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          bgcolor: 'rgb(0,0,0,.6)',
          border: '2px solid rgb(248, 248, 128)',
          boxShadow: 24,
        };
    const cardstyle = {
          display:"flex",
          flexDirection: "column",
          alignItems:"center",
          bgcolor: 'rgb(0,0,0,.8)',
         padding:'2px',
          boxShadow: 24,
          maxWidth:'100%'
        };
    const handleClose= () => {setOrderOpen(false); setOrderInfo([]);}
    return(
        <Modal
        sx={{overflow:"scroll"}}
        open={orderOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Grid container rowSpacing={{xs:3,md:4}} columnSpacing={{xs:0,sm:4,md:4}}>
                { orderInfo.length ? 
                    orderInfo.map(order => (
                <Grid item xs={12} sm={6} lg={4} xl={3} key={order._id}>
        <Card sx={cardstyle}>
        <CancelIcon sx={{color:"rgb(248, 248, 128)","&:hover":{color:'red'}}} onClick={handleClose}/>
            <Typography sx={{color:"rgb(248, 248, 128)"}}>Order</Typography>
            <Typography sx={{color:"rgb(248, 248, 128)"}}>{dateFormat(Date(order.purchaseDate))}</Typography>
            <CardContent>
            {order.products.map(product => (
                <OrderCardDiv key={product._id}>
                <UserOrderCardSpan>{product.name}</UserOrderCardSpan>
                <AdminUserOrderParagrapgh>{product.description}</AdminUserOrderParagrapgh>
                <UserOrderCardSpan>Price: ${product.price}</UserOrderCardSpan>
              </OrderCardDiv>
            ))}
            </CardContent>
        </Card>
             </Grid>))
              :
                <>
             <CancelIcon sx={{color:"rgb(248, 248, 128)"}} onClick={handleClose}/>
             <Typography sx={{color:"rgb(248, 248, 128)"}}>no orders</Typography>
                </>
            }
          </Grid>
        </Box>
      </Modal>

    );
};
export default UserOrderModal;