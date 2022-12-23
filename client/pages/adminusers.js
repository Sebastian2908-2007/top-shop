import {useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
/**import query to get user data*/
import { GET_ALL_DATA_USERS } from "../utils/queries";
/**material UI inports*/
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, Card, Grid } from '@mui/material';
/**material ui imports end*/
/**styled components imports start*/
import { AdminUsersSection } from "../styles/Section.styled";
import { DeleteProductButton, EditProductButton } from '../styles/Button.styled';
import { AdminProductBtnDiv } from '../styles/Div.styled';
/**styled components imports end*/
/**self made components start*/
import EditDeleteModal from "../components/EditDeleteModal";
/**self made components end*/
export default function adminusers () {
    /**styles for mui components */
    const style = {
          display:"flex",
          flexDirection: "column",
          alignItems:"center",
          width: '100%',
          bgcolor: 'rgb(0,0,0,.6)',
          border: '2px solid rgb(248, 248, 128)',
          boxShadow: 24,
        };
    const TypographyStyle = {
          width: '100%',
          color:'rgb(248, 248, 128)',
        marginBottom:"1em",
          boxShadow: 24,
          fontFamily:"calibri"
        };
        /**styles for mui components ends*/

    /**modal info this state will hold the information I need to either delete or edit a review it will be set here on the review page
     */
    const [modalInfo,setModalInfo] = useState({});
    /**this state opens and closes EditDeleteModal */
    const [open,setOpen] = useState(false);

/**if data is loading return loading */
    const {loading,data: getUsers} = useQuery(GET_ALL_DATA_USERS);
    if(loading) {
        return(<div>loading...</div>);
}

/**delete user function for card button*/
const deleteUser = (_id) => {
    console.log(_id,"FROM DELETE");
    setOpen(true);
    setModalInfo({_id: _id,itemType:'user',EditOrDelete:'delete'});
};
const editUser = (_id,firstName,lastName,email) => {
    console.log(_id,firstName,lastName,email,"FROM EDIT");
    setOpen(true);
    setModalInfo({_id: _id,itemType:'user',EditOrDelete:'edit'});
};

//useEffect(()=>{console.log(modalInfo,"FROM USEEFFECT")},[modalInfo,setModalInfo]);
console.log(getUsers);
    return (
       
        <AdminUsersSection>
            <EditDeleteModal
             modalInfo={modalInfo}
             setModalInfo={setModalInfo}
             open={open}
             setOpen={setOpen}
             />
            <Box>
            <Grid container rowSpacing={{xs:3,md:4}} columnSpacing={{xs:0,sm:4,md:4}} >
      {getUsers.getUsers.length ? (  getUsers.getUsers.map(user => (
  
  <Grid item xs={12} sm={6} lg={4} xl={3}   key={user._id}>
<Card sx={style}>
    <CardContent>
<Typography sx={TypographyStyle}>{user.firstName}</Typography>
<Typography sx={TypographyStyle}>{user.lastName}</Typography>
<Typography sx={TypographyStyle}>{user.email}</Typography>
<AdminProductBtnDiv width='100%'>
           <DeleteProductButton onClick={() => {deleteUser(user._id)}}>Delete</DeleteProductButton>
            <EditProductButton onClick={() => {editUser(user._id,user.firstName,user.lastName,user.email)}}>Edit</EditProductButton>
        </AdminProductBtnDiv>
  </CardContent>
</Card>
  </Grid>
))):(<div>no users yet</div>)}
 </Grid>
 </Box>
        </AdminUsersSection>
    );
};