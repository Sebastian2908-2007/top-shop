import { useState } from "react";
import { useMutation } from "@apollo/client";
/**mui imports */
import { Modal, Rating } from "@mui/material";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
/**mui imports ends*/
/**styled components imports*/
import { Form, ReviewFormTextArea } from "../styles/Forms.styled";
/**styled components imports ends*/
/**mutation imports for leaving review*/
import { ADD_REVIEW } from "../utils/mutations";
import { LeaveReviewBtn } from "../styles/Button.styled";
import { GET_REVIEWS } from "../utils/queries";


const AddReview = ({open,setOpenLeaveReviewModal,hasLeftReview,setHasLeftReview}) => {
    
       // state for rating component
       const [Ratingvalue, setRatingValue] = useState(5);
       /**state for form data or review text */
       const [formData,setFormData] = useState({});
       /**name leave review mutation to be called later*/
       const [leaveReview] = useMutation(ADD_REVIEW,{
        refetchQueries:[{query: GET_REVIEWS}]
       });
           /*closes modal and sets other state back to default */
      const handleClose = () => {setOpenLeaveReviewModal(false); };
          // function to handle reviewText changes
     const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        console.log(formData);
    };
    /**this will submit the review data to our db*/
    const submitReview = async (event) => {
        event.preventDefault();
        try{
            const review = await leaveReview({
                variables: {
                    rating: Ratingvalue,
                    reviewText: formData.reviewText
                }
            });
            console.log(review,'NEW REVIEW');
            setHasLeftReview(true);
            handleClose();
        }catch(e){
            console.log(e);
        };
    };

    return(
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <Box>
                <Typography>Please Leave A Review</Typography>
                <Form onSubmit={submitReview}>
                    <Rating
                     name="simple-controlled"
                     value={Ratingvalue}
                     onChange={(event, newValue) => {
                       setRatingValue(newValue);
                     }}
                    />
                    <ReviewFormTextArea onChange={handleChange} name='reviewText' placeholder="share your thoughts..."/>
                   <LeaveReviewBtn type="submit">Submit</LeaveReviewBtn>
                </Form>
            </Box>

        </Modal>
    );
};
export default AddReview;