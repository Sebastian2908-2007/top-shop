import { useQuery } from "@apollo/client";
import { GET_USER_BY_ID } from "../utils/queries";
import auth from "../utils/auth";
import { UserDetailsSection,UserPersonalDetailsSection,UserOrdersSection } from "../styles/Section.styled";
import { UserDetailsSpan } from "../styles/Spans.styled";
import { UserDetailsTitle } from "../styles/H1.styled";
import { UserDetailOrderDate } from "../styles/H2.styled";
/**grid components mui*/
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
/**grid components mui*/
import OrderItem from "../components/OrderItem";


export default function usersdetails () {
    const {data,loading} = useQuery(GET_USER_BY_ID,{
        variables:{
            _id: auth.getProfile().data._id 
        }
    });
    if(loading) {
        return(<div>loading...</div>)
    }
    /**destructure the users data*/
    
    const {
        firstName,
        lastName,
        email,
        orders 
    } = data.getUserById;

    console.log(firstName);
    console.log(lastName);
    console.log(email);
    console.log(orders);

    //console.log(data.getUserById);
    //console.log(date);
   
    return(
        <UserDetailsSection>
            <UserPersonalDetailsSection>
                <UserDetailsTitle>Your Details</UserDetailsTitle>
              <UserDetailsSpan>{firstName}</UserDetailsSpan>
              <UserDetailsSpan>{lastName}</UserDetailsSpan>
              <UserDetailsSpan>{email}</UserDetailsSpan>
            </UserPersonalDetailsSection>
            <UserOrdersSection>
                <Box>
                    {orders.length ? (
                <Grid container rowSpacing={{xs:3,md:4}} columnSpacing={{xs:0,sm:4,md:4}} >
                    {orders.map(order => (
                        <Grid item xs={12} sm={6} lg={4} xl={3}   key={order._id}>
                          <UserDetailOrderDate>{order.purchaseDate}</UserDetailOrderDate>
                          {order.products.map(product => (
                            <OrderItem key={product._id} item={product}/>
                          ))}
                        </Grid>
                    ))}
                </Grid>):(<div>no orders yet</div>)}
                </Box>
            </UserOrdersSection>

        </UserDetailsSection>
    );
}; 