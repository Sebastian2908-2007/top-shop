import { useQuery } from "@apollo/client";
import { GET_USER_BY_ID } from "../utils/queries";
import auth from "../utils/auth";
import { UserDetailsSection } from "../styles/Section.styled";
import dayjs from 'dayjs';
export default function usersdetails () {
    const {data,loading} = useQuery(GET_USER_BY_ID,{
        variables:{
            _id: auth.getProfile().data._id 
        }
    });
    if(loading) {
        return(<div>loading...</div>)
    }
   
    console.log(dayjs(data.getUserById.orders[0].purchaseDate));
    console.log(data.getUserById.orders[0].purchaseDate);
    return(
        <UserDetailsSection>this is user details</UserDetailsSection>
    );
}; 