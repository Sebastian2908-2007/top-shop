import { useQuery } from '@apollo/client';
/**import relivant queries*/
import { GET_REVIEWS } from '../utils/queries';
import ReviewCard from "../components/ReviewCard";
/**styled components imports starts */
import { MainTitle } from '../styles/H1.styled';
/**styled components imports ends */

export default function Reviews () {
    const {loading,data} = useQuery(GET_REVIEWS);
   if (loading) {
     return <div>Loading...</div>
   }
   const reviews = data.getReviews;
    return(
        reviews.length ?
        <>
            <MainTitle>Customer Reviews</MainTitle>
            {reviews.map(review => (
               <ReviewCard key={review._id} review={review}/>
            ))}
            
        </>:<div>no reviews</div>
    );
};