import { useQuery } from "@apollo/client";
import { GET_USER_BY_ID } from "../utils/queries";
import auth from "../utils/auth";
import { UserDetailsSection } from "../styles/Section.styled";

export default function usersdetails () {
    const {data,loading} = useQuery(GET_USER_BY_ID,{
        variables:{
            _id: auth.getProfile().data._id 
        }
    });
    if(loading) {
        return(<div>loading...</div>)
    }
   const date = data.getUserById.orders[2].purchaseDate
  
    console.log(date);
   
    return(
        <UserDetailsSection>this is user details</UserDetailsSection>
    );
}; 