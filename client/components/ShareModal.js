/**import useRouter hook from next so we can pass it to share modal*/
import { useRouter } from "next/router";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
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
    flexDirection: "column",
    alignItems:"center",
      position: 'absolute',
      top: '50%',
      padding: '5%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '80%',
      bgcolor: 'rgb(0,0,0,.6)',
      border: '2px solid rgb(248, 248, 128)',
      boxShadow: 24,
    };

  const ShareModal = ({openShareModal, setOpenShareModal}) => {
    const handleClose = () => setOpenShareModal(false);
    /**destructure the pat;h from the next router object*/
    const { asPath } = useRouter();
    /**get actual name of webapp or site and store it in a variable */
    const origin =
    typeof window !== 'undefined' && window.location.origin
        ? window.location.origin
        : '';
        /**take our origin and add it with the path to get our url this is what we feed to the modal to share*/
        const URL = `${origin}${asPath}`;
        console.log(URL);
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
        quote={'next-share is a social share buttons for your next React apps.'}
        hashtag={'#nextshare'}
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <PinterestShareButton
  url={'https://github.com/next-share'}
  media={'next-share is a social share buttons for your next React apps.'}
>
  <PinterestIcon size={32} round />
</PinterestShareButton>
<RedditShareButton
  url={'https://github.com/next-share'}
  title={'next-share is a social share buttons for your next React apps.'}
>
  <RedditIcon size={32} round />
</RedditShareButton>
<TwitterShareButton
  url={'https://github.com/next-share'}
  title={'next-share is a social share buttons for your next React apps.'}
>
  <TwitterIcon size={32} round />
</TwitterShareButton>
<WhatsappShareButton
  url={'https://github.com/next-share'}
  title={'next-share is a social share buttons for your next React apps.'}
  separator=":: "
>
  <WhatsappIcon size={32} round />
</WhatsappShareButton>
<LinkedinShareButton url={'https://github.com/next-share'}>
  <LinkedinIcon size={32} round />
</LinkedinShareButton>
<EmailShareButton
  url={'https://github.com/next-share'}
  subject={'Next Share'}
  body="body"
>
  <EmailIcon size={32} round />
</EmailShareButton>
        </Box>
      </Modal>
    );
  };

  export default ShareModal;