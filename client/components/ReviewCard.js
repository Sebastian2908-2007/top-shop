import { useState } from 'react';
/**material UI imports start */
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Rating from '@mui/material/Rating';
/**material UI imports end */
/**styled Components imports start */
import { ReviewCardTitle } from '../styles/H2.styled';
import { ReviewCardNameSpan } from '../styles/Spans.styled';
import { ReviewTextParagraph } from '../styles/P.styled';
import { DeleteProductButton, EditProductButton } from '../styles/Button.styled';
import { AdminProductBtnDiv } from '../styles/Div.styled';
/**styled Components imports end */
/**import some token stuff to get user info from token*/
import auth from '../utils/auth';
/**my components import*/
import EditDeleteModal from '../components/EditDeleteModal';
const ReviewCard = ({review,setHasLeftReview}) => {
    /**destructure the review*/
    const {_id,reviewText,author,rating} = review;
    /**destructure author data from destructured review data*/
    const {firstName,lastName} = author;
    //console.log(author);
          /**modal info this state will hold the information I need to either delete or edit a review it will be set here on the review page
     */
          const [modalInfo,setModalInfo] = useState({});
          /**this state opens and closes EditDeleteModal */
          const [open,setOpen] = useState(false);
          /**delete function to open modal and set modal info*/
          const deleteReview = () => {
            setOpen(true);
            setModalInfo({_id:_id,itemType:'review',EditOrDelete:"delete"});
          };
          /**function to run when someOne wants to edit their review*/
          const editReview = () => {
            setOpen(true);
            setModalInfo({_id:_id,reviewText:reviewText,rating: rating, itemType:'review',EditOrDelete:'edit'})
          };
return (
    <Card sx={{
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-evenly',
    textAlign:'center',
    boxShadow:' 0 0 10px black',
    height:'100%',
    maxWidth: '100%',
    background: "linear-gradient(to left, rgb(0, 119, 255),rgb(0,0,0,0.7))",
    border: '1px solid black'
    }}>
        <CardContent >
        <EditDeleteModal
                 open={open}
                 setOpen={setOpen}
                 modalInfo={modalInfo}
                 setModalInfo={setModalInfo}
                 setHasLeftReview={setHasLeftReview}
                 />
            <ReviewCardTitle>
                <ReviewCardNameSpan>{firstName}</ReviewCardNameSpan>
                <ReviewCardNameSpan>{lastName}</ReviewCardNameSpan>
            </ReviewCardTitle>
<Rating name="read-only" value={rating} sx={{ marginBottom:'2%' }} readOnly/>
        <ReviewTextParagraph>
            {reviewText}
        </ReviewTextParagraph>
        
           {(auth.loggedIn()) && (author._id === auth.getProfile().data._id) || (auth.loggedIn()) && (auth.getProfile().data.isAdmin) ?  
           <AdminProductBtnDiv width='100%'>
           <DeleteProductButton onClick={deleteReview}>Delete</DeleteProductButton>
            <EditProductButton onClick={editReview}>Edit</EditProductButton>
        </AdminProductBtnDiv>:null}
        </CardContent>
    </Card>
);
};
export default ReviewCard;