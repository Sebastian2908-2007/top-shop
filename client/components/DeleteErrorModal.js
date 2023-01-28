import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const DeleteErrorModal = ({open,setOpen,categoryDeleteError,setCategoryDeleteError}) => {
    const style = {
        display:"flex",
        flexDirection: "row",
        justifyContent: 'space-between',
        position: 'absolute',
        '@media screen and (min-width:768px )': {
          width:'50%'
         },
        '@media screen and (min-width:1366px )': {
          width:'35%'
         },
          top: '50%',
          padding: '5%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          bgcolor: 'rgb(255,0,0,.6)',
          border: '2px solid rgb(248, 248, 128)',
          boxShadow: 24,
        };
        const handleClose = () => {setOpen(false); setCategoryDeleteError('');}
    return(
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
              <span><strong>{categoryDeleteError.message}</strong></span>
            </Box>
        </Modal>        
    );
};
export default DeleteErrorModal;