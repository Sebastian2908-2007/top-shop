import { useState } from 'react';
import { useQuery } from '@apollo/client';
/**import add review modal */
import AddReview from '../components/AddReview';
/**import relivant queries*/
import { GET_REVIEWS } from '../utils/queries';
/**import other components*/
import ReviewCard from "../components/ReviewCard";
/**import other components ends*/
/**styled components imports starts */
import { MainTitle } from '../styles/H1.styled';
import { ReviewSection } from '../styles/Section.styled';
/**styled components imports ends */
/**grid components mui*/
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { LeaveReviewBtn } from '../styles/Button.styled';
/**import jwt token stuff for checking auth*/
import auth from '../utils/auth';

export default function Reviews () {

       /**this state opens leave review modal it is passed to the modal the open variable is changed to just open when it hits the modal if I dont 
        * name like this conflicts will happen between the leave review and the edit and delete modal
       */
       const [openLeaveReviewModal, setOpenLeaveReviewModal] = useState(false);
  
       /**state for determining whether user has left review*/
       const [hasLeftReview,setHasLeftReview] = useState(false);

    const {loading,data} = useQuery(GET_REVIEWS);
   if (loading) {
     return <div>Loading...</div>
   }


/**function to open review form called on leave review btn click*/
const openReviewForm = () => {
    setOpenLeaveReviewModal(true);
};

//console.log( auth.getProfile().data)
   const reviews = data.getReviews;
    return(
        
            
      
         <ReviewSection>
        <MainTitle>Customer Reviews</MainTitle>
             <Box sx={{width:"100%"}}>
               {(auth.loggedIn()) && (auth.getProfile().data.hasLeftReview) || (!auth.loggedIn()) ||(hasLeftReview) ? null: <LeaveReviewBtn onClick={() => openReviewForm()}>Leave Review</LeaveReviewBtn>} 
                <AddReview
                 open={openLeaveReviewModal}
                 setOpenLeaveReviewModal={setOpenLeaveReviewModal} 
                 hasLeftReview={hasLeftReview}
                 setHasLeftReview={setHasLeftReview}
                 />
               {reviews.length ?  (
             <Grid container rowSpacing={{xs:3,md:4}} columnSpacing={{xs:0,sm:4,md:4}} >
            {reviews.map(review => (
                <Grid item xs={12} sm={6} lg={4} xl={3}   key={review._id}>
               <ReviewCard  setHasLeftReview={setHasLeftReview} review={review}/>
               </Grid>
            ))}
            </Grid>
            
       
        ):(<div>no reviews</div>)}
        </Box>
         </ReviewSection>
        
      
      
    );
};