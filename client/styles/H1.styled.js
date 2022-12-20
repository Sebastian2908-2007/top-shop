import styled from "styled-components";
import { keyframes } from "styled-components";

const  rotateScaleUp = keyframes`
0% {
    -webkit-transform: scale(1) rotateZ(0);
            transform: scale(1) rotateZ(0);
  }
  50% {
    -webkit-transform: scale(2) rotateZ(180deg);
            transform: scale(2) rotateZ(180deg);
  }
  100% {
    -webkit-transform: scale(1) rotateZ(360deg);
            transform: scale(1) rotateZ(360deg);
  }
`;

export const MainTitle = styled.h1`
padding: 1%;
color: black;
background-color: rgb(255,255,255,0.6);
border: 2px solid black;
text-shadow: 0 0 10px rgb(248, 248, 128);
margin-top: 0.2em;
font-size: 1.7em;
font-family: 'dancing script';
text-align: center;
border-radius: 8px;
font-weight: bolder;  
box-shadow:  0 0 10px black;
@media screen and (min-width: 912px) {
  font-size: 2.5em ;
}
@media screen and (min-width: 1366px) {
animation: ${rotateScaleUp} 2s linear 1;
font-size: 2.8em;
}
`;

export const AdminDashTitle = styled.h1`
font-size: 1.5em;
border-radius: 11px;
padding: 2%;
background:  linear-gradient(to left, rgb(199, 197, 104),rgb(0,0,0));
color: rgba(223,223,16,1);
text-align: center;
@media screen and (min-width:768px) {
    font-size: 2em;
}
`;

/**blogpost preview card title*/
export const BlogPreviewTitle = styled.h1`
padding: 1%;
color: black;
background-color: rgb(255,255,255,0.6);
border: 2px solid black;
text-shadow: 0 0 10px rgb(248, 248, 128);
margin-top: 0.2em;
font-size: 1.7em;
font-family: 'dancing script';
text-align: center;
border-radius: 8px;
font-weight: bolder;  
box-shadow:  0 0 10px black;
@media screen and (min-width: 912px) {
  font-size: 2.5em ;
}
@media screen and (min-width: 1366px) {
font-size: 2.8em;
}
`;
/**linear-gradient(to left, rgb(0,0,0,0.9),rgb(0,0,0,0.6)); */

/**single blogpost page title*/
export const SingleBlogpostTitle = styled.h1`
padding: 1%;
color: black;
background-color: rgb(255,255,255,0.6);
border: 2px solid black;
text-shadow: 0 0 10px rgb(248, 248, 128);
margin-top: 0.2em;
font-size: 1.7em;
font-family: 'dancing script';
text-align: center;
border-radius: 8px;
font-weight: bolder;  
box-shadow:  0 0 10px black;
@media screen and (min-width: 912px) {
  font-size: 2.5em ;
}
@media screen and (min-width: 1024px){
    margin-bottom: 0%;
}
@media screen and (min-width: 1366px) {
font-size: 2.8em;
}
`;