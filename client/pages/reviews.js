import { useQuery } from '@apollo/client';
/**import relivant queries*/
import { GET_REVIEWS } from '../utils/queries';
import ReviewCard from "../components/ReviewCard";
/**styled components imports starts */
import { MainTitle } from '../styles/H1.styled';
import { ReviewSection } from '../styles/Section.styled';
/**styled components imports ends */
/**grid components mui*/
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export default function Reviews () {
    const {loading,data} = useQuery(GET_REVIEWS);
   if (loading) {
     return <div>Loading...</div>
   }
   const reviews = data.getReviews;
    return(
        
            
      reviews.length ?
         <ReviewSection>
        <MainTitle>Customer Reviews</MainTitle>
             <Box>
             <Grid container rowSpacing={{xs:3,md:4}} columnSpacing={{xs:0,sm:4,md:4}} >
            {reviews.map(review => (
                <Grid item xs={12} sm={6} lg={4} xl={3}   key={review._id}>
               <ReviewCard  review={review}/>
               </Grid>
            ))}
            </Grid>
            </Box>
        </ReviewSection>
        :<div>no reviews</div>
      
      
    );
};