import styled from "styled-components";
import { keyframes } from "styled-components";

const buttonPopUp = keyframes`
0% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    -webkit-transform-origin: 50% 50%;
            transform-origin: 50% 50%;
    text-shadow: none;
  }
  100% {
    -webkit-transform: translateY(-10px);
            transform: translateY(-10px);
    -webkit-transform-origin: 50% 50%;
            transform-origin: 50% 50%;
    text-shadow: 0 1px 0 #cccccc, 0 2px 0 #cccccc, 0 3px 0 #cccccc, 0 4px 0 #cccccc, 0 5px 0 #cccccc, 0 6px 0 #cccccc, 0 7px 0 #cccccc, 0 8px 0 #cccccc, 0 9px 0 #cccccc, 0 50px 30px rgba(0, 0, 0, 0.3);
  }
`;

export const CategoryButton = styled.button`
border: 1px solid black;
border-radius: 11px;
margin-bottom: .7em;
margin-right: .1em;
margin-left: .1em;
background-color: rgb(248, 248, 128);
font-family: 'dancing script';
font-size: 1.2em;
padding: 2%;
box-shadow:  0 0 7px black;
&:hover {
animation: ${buttonPopUp} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
color: rgb(245 245 6);
background-color: rgb(0,0,0,0.2);
border: 1px solid rgb(245 245 6);
};
@media screen and (min-width: 375px) {
    margin-right: .7em;
    margin-left: .7em;
    border: 2px solid black;
}
`;