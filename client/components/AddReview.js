import { useState } from "react";
import { useMutation } from "@apollo/client";
/**mui imports */
import { Modal, Rating } from "@mui/material";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
/**mui imports ends*/
/**styled components imports*/
import { ReviewForm , ReviewFormTextArea } from "../styles/Forms.styled";
/**styled components imports ends*/
/**mutation imports for leaving review*/
import { ADD_REVIEW } from "../utils/mutations";
import { LeaveReviewBtn } from "../styles/Button.styled";
import { GET_REVIEWS } from "../utils/queries";

const style = {
    display:"flex",
    flexDirection: "column",
    alignItems:"center",
      position: 'absolute',
      top: '50%',
      padding: '5%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '80%',
      bgcolor: 'rgb(0,0,0,.6)',
      border: '2px solid rgb(254, 114, 53)',
      borderRadius:'8px',
      boxShadow: 24,
    };

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
            <Box sx={style}>
                <Typography sx={{color:'rgb(252, 245, 239)',marginBottom:'5%',fontSize:{sm:"2em"}}}>Please Leave A Review</Typography>
                <ReviewForm  onSubmit={submitReview}>
                    <Rating
                     name="simple-controlled"
                     value={Ratingvalue}
                     onChange={(event, newValue) => {
                       setRatingValue(newValue);
                     }}
                    />
                    <ReviewFormTextArea onChange={handleChange} name='reviewText' placeholder="share your thoughts..."/>
                   <LeaveReviewBtn type="submit">Submit</LeaveReviewBtn>
                </ReviewForm>
            </Box>

        </Modal>
    );
};
export default AddReview;