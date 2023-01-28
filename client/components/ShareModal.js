/**import useRouter hook from next so we can pass it to share modal*/
import { useRouter } from "next/router";
/**MUI stuff starts*/
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
/**MUI stuff ends*/
/**import next share stuff for social sharing*/
import {
    FacebookShareButton,
    FacebookIcon,
    PinterestShareButton,
    PinterestIcon,
    RedditShareButton,
    RedditIcon,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon,
    LinkedinShareButton,
    LinkedinIcon,
    EmailShareButton,
    EmailIcon,
  } from 'next-share';

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
      bgcolor: 'rgb(0,0,0,.6)',
      border: '2px solid rgb(248, 248, 128)',
      boxShadow: 24,
    };

  const ShareModal =
   ({
    openShareModal,
    setOpenShareModal,
    setModalInfo, 
    modalInfo
    }) => {
    const handleClose = () => {setOpenShareModal(false); setModalInfo({});}
    /**destructure the pat;h from the next router object*/
    const { asPath } = useRouter();
    /**get actual name of webapp or site and store it in a variable */
    const origin =
    typeof window !== 'undefined' && window.location.origin
        ? window.location.origin
        : '';
        /**take our origin and add it with the path to get our url this is what we feed to the modal to share*/
        const URL = `${origin}${asPath}`;
    return( 
        <Modal
        open={openShareModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
        <FacebookShareButton
        url={URL}
        quote={'Sybs Crafty blog. The best craft blog online'}
        hashtag={'#handmadecrafts'}
        blankTarget={true}
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <PinterestShareButton
  url={URL}
  media={modalInfo.image}
>
  <PinterestIcon size={32} round />
</PinterestShareButton>
<RedditShareButton
  url={URL}
  title={modalInfo.title}
  blankTarget={true}
>
  <RedditIcon size={32} round />
</RedditShareButton>
<TwitterShareButton
  url={URL}
  title={modalInfo.title}
  blankTarget={true}
>
  <TwitterIcon size={32} round />
</TwitterShareButton>
<WhatsappShareButton
  url={URL}
  title={modalInfo.title}
  separator=":: "
  blankTarget={true}
>
  <WhatsappIcon size={32} round />
</WhatsappShareButton>
<LinkedinShareButton url={URL}
blankTarget={true}>
  <LinkedinIcon size={32} round />
</LinkedinShareButton>
<EmailShareButton
  url={URL}
  subject={modalInfo.title}
  body="body"
>
  <EmailIcon size={32} round />
</EmailShareButton>
        </Box>
      </Modal>
    );
  };

  export default ShareModal;