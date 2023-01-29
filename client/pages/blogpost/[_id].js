import { useState, useEffect } from "react";
import Head from "next/head";
import { initializeApollo } from "../../lib/apolloClient"; 
/**queris to get blogposts */
import { GET_BLOGPOSTS_ADMIN,GET_BLOG_POST_BY_ID } from "../../utils/queries";
/**COMPONENT: for the blog text its integral in generating the hot links associated with the blog post*/
import BlogText from "../../components/HotLinkBlogText";
/**COMPONENT: for the bottom three page links*/
import BottomLinkPack from "../../components/BottomLinkPack";
/**COMPONENT: for the top two page links*/
import TopLinkPack from "../../components/TopLinkPack";
/**styled componenets import */
import { SingleBlogPostHeroSection,SingleBlogpostSection,SingleBlogSection  } from "../../styles/Section.styled";
import { BlogHeroPic } from "../../styles/Images.styled";
import { SingleBlogpostTitle } from "../../styles/H1.styled";
/**this stuff if for the admin edit and delete buttons that will trigger the model "should probably be a COMPONENT" */
import { DeleteProductButton, EditProductButton } from '../../styles/Button.styled';
import { AdminProductBtnDiv } from '../../styles/Div.styled';
/**this stuff if for the admin edit and delete buttons that will trigger the model ending*/
/**styled componenets import ends */
/**jwt auth stuff */
import auth from "../../utils/auth";
/**this is the modal for deleting and editing*/
import EditDeleteModal from "../../components/EditDeleteModal";
/**import shareModal*/
import ShareModal from "../../components/ShareModal";
/**mui stuff starts*/
import ShareIcon from '@mui/icons-material/Share';
import Tooltip from '@mui/material/Tooltip';
/**mui stuff ends*/




export async function getStaticPaths () { 
    const client = initializeApollo();
 const {data} =  await client.query({
      query: GET_BLOGPOSTS_ADMIN
  });
const paths = data.getBlogposts.map(blogpost => {
    return {
        params: {_id: blogpost._id.toString() }
    }
})
  return {
     paths,
     fallback: 'blocking'
  }
  
};

export async function getStaticProps(context) {
    const client = initializeApollo();
const _id = context.params._id;
const {data} = await client.query({
    
    query: GET_BLOG_POST_BY_ID ,variables:{_id: _id}
})
return {
    props: {blogPost: data},
    revalidate: 10,
}
};

export default function BlogPost ({blogPost})  {

  /**destructure static props */
  const {_id,title,blogText,blogPic} = blogPost.getBlogpostById;
  /**further desstructure for pertinent blogPic info like Key Bucket which are instrumental in deleting from s3
   * all of these destructured props are used in setModalInfo();
   */
 const {Key,Bucket} = blogPic;

/**this is used for the if statement that determines how many paragraphs there will be*/
let wordCounter = 0;
/**this is used for the if statement that determines how many paragraphs there will be it is fed as the second argument to the actual format paragraph function*/
let numberOfParagraphs = 1;
/**this if statement determines how many paragraphs we are going to need based on how much "blogText" there is 62 words equals one paragraph*/
for (let i=0; i< blogText.split(' ').length; i++ ) {
  if(wordCounter === 62){
    numberOfParagraphs++
    wordCounter = 0
}else{
  wordCounter++ 
}
}
/**This function returns an array of all of our paragraphs to be used in the map in our jsx*/
function formatParagraphs(string, numlines) {
  let length = string.length;
  let paraLength = Math.round((length)/numlines);
  let paragraphs = [];
  for (let i=0; i<numlines; i++) {
      let marker = paraLength;
      //if the marker is right after a space, move marker back one character
      if (string.charAt(marker-1) == " ") {
          marker--; 
      }
      //move marker to end of a word if it's in the middle
      while(string.charAt(marker) != " " && string.charAt(marker) != "") {
          marker++;
      }
      let nextPara = string.substring(0, marker)
      paragraphs.push(nextPara)
      string = string.substring((nextPara.length+1),string.length)
  }
  return paragraphs
}
/**our paragraphs for map in jsx it takes db blog text and the numberofParagraphs determing in the if statement above */
const myparagraphs = formatParagraphs(blogText,numberOfParagraphs);
/**this is just to give my mapped elements an id*/
let blogTextKey = 0;

  const shareIconStyle = {
    position:"sticky",
    top:0,
    bgcolor: 'rgb(0,0,0,.6)',
    color: 'rgb(254, 114, 53)',
    padding:'2%',
    borderRadius: '50%',
    fontSize:'2rem',
    //transform: 'translateX(50%)',
    '@media screen and (min-width:768px )': {
      padding:'1%'
     },
    '@media screen and (min-width:1366px )': {
      fontSize: '3rem'
     },
  }; 
  
  /**checks to see if the user is an admin*/
  const [isAdmin,setIsAdmin] = useState(true);
  /**set admin data at runtime with useEffect*/
  useEffect(() => {
    if(auth.loggedIn()) { 
      setIsAdmin ( auth.getProfile().data.isAdmin);
      }else{
        setIsAdmin (false);
      };
  },[])

/**This IS NOT DRY "it repeats across adminproducts and homepage or index.js and now here" */

    /**this state opens edit delete modal it is passed to the modal as well as the product cards*/
    const [open, setOpen] = useState(false);
    /**modal info this state will hold the information I need to either delete or edit a product it will be set in product card
     * its passed to both modal and product card
     * We are now using this modal info state in the share modal
     */
    const [modalInfo,setModalInfo] = useState({});
    /**state to open share modal*/
    const [openShareModal, setOpenShareModal] = useState(false);


    /**This IS NOT DRY "it repeats across adminproducts and homepage or index.js and now here" ends*/
     const deleteBlogPost = ()=> {
        setOpen(true);
        setModalInfo({_id:_id,Bucket:Bucket,Key:Key,itemType:'blogpost',EditOrDelete:'delete'});
     };
     const editBlogPost = ()=> {
        /**when edit btn is clicked open the editDeleteModal */
        setOpen(true);
        /**set pertinant data so that the modal not only has what it needs to run operations but also so the modal will know which items its running operations for
         * in this case it will be for blogposts as determined by the "itemType" property this is going to be a recurring
         * theme for all things like users reviews products blogposts at the time of this note
         * its already being used for products
         */
        setModalInfo({_id:_id,title:title,blogText:blogText,Key:Key,Bucket:Bucket,itemType:'blogpost',EditOrDelete:'edit'});
     };

return(
    <>
    <Head>
    <meta charSet="utf-8" />
    <title>{title}</title>
    <link rel="icon" href={blogPic.Location} />
    <meta name="description" content={blogText} />
    </Head>
    <SingleBlogPostHeroSection id="Hero">
        <BlogHeroPic
        alt="the blogpost's vibe"
        src={blogPic.Location}
        width={600}
        height={600}
        layout='intrinsic'
        priority
        />
          <SingleBlogpostTitle>{title}</SingleBlogpostTitle>
          <TopLinkPack/>
    </SingleBlogPostHeroSection>
    <SingleBlogpostSection>
    <Tooltip title="Share" arrow>
      <ShareIcon sx={shareIconStyle} onClick={() => {setOpenShareModal(true); setModalInfo({image:blogPic.Location,title:title});}}/>
    </Tooltip>
        {isAdmin && <EditDeleteModal
        open={open} 
        setOpen={setOpen}
        setModalInfo={setModalInfo} 
        modalInfo={modalInfo}
        />}
<ShareModal
openShareModal={openShareModal} 
setOpenShareModal={setOpenShareModal}
setModalInfo={setModalInfo} 
modalInfo={modalInfo}
/>
          {/**Below if admin display edit and delete buttons for */}
  {isAdmin &&   <AdminProductBtnDiv><DeleteProductButton onClick={deleteBlogPost} >Delete</DeleteProductButton>
      <EditProductButton onClick={editBlogPost} >Edit</EditProductButton></AdminProductBtnDiv>}
      <SingleBlogSection>
{myparagraphs.map(paragraph => (
  
  <BlogText key={blogTextKey++} content={paragraph}/>
))}
   </SingleBlogSection>     
      {!isAdmin && <BottomLinkPack/>}
    </SingleBlogpostSection>
    </>
);
};

/**
 import { DeleteProductButton, EditProductButton } from '../../styles/Button.styled';
import { AdminProductBtnDiv } from '../../styles/Div.styled';

        {isAdmin &&   <AdminProductBtnDiv><DeleteProductButton onClick={deleteProduct}>Delete</DeleteProductButton>
      <EditProductButton onClick={editProduct}>Edit</EditProductButton></AdminProductBtnDiv>}            
      {/*isAdmin &&   <EditProductButton>Edit</EditProductButton>*/