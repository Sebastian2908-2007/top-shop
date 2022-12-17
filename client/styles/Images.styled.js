import styled from 'styled-components';
import { keyframes } from "styled-components";

const flickerIn = keyframes`
0% {
    opacity: 0;
  }
  10% {
    opacity: 0;
  }
  10.1% {
    opacity: 1;
  }
  10.2% {
    opacity: 0;
  }
  20% {
    opacity: 0;
  }
  20.1% {
    opacity: 1;
  }
  20.6% {
    opacity: 0;
  }
  30% {
    opacity: 0;
  }
  30.1% {
    opacity: 1;
  }
  30.5% {
    opacity: 1;
  }
  30.6% {
    opacity: 0;
  }
  45% {
    opacity: 0;
  }
  45.1% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  55% {
    opacity: 1;
  }
  55.1% {
    opacity: 0;
  }
  57% {
    opacity: 0;
  }
  57.1% {
    opacity: 1;
  }
  60% {
    opacity: 1;
  }
  60.1% {
    opacity: 0;
  }
  65% {
    opacity: 0;
  }
  65.1% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75.1% {
    opacity: 0;
  }
  77% {
    opacity: 0;
  }
  77.1% {
    opacity: 1;
  }
  85% {
    opacity: 1;
  }
  85.1% {
    opacity: 0;
  }
  86% {
    opacity: 0;
  }
  86.1% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
`;

const bounceIn = keyframes`
0% {
    -webkit-transform: translateY(-500px);
            transform: translateY(-500px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
    opacity: 0;
  }
  38% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
    opacity: 1;
  }
  55% {
    -webkit-transform: translateY(-65px);
            transform: translateY(-65px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  72% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  81% {
    -webkit-transform: translateY(-28px);
            transform: translateY(-28px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  90% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  95% {
    -webkit-transform: translateY(-8px);
            transform: translateY(-8px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
`;

/**img tag for social links*/
export const SocialPic = styled.img`
width:100%;
`;
export const CartPic = styled.img`
max-width:100%;
`;

export const HomeHeroPic = styled.img`
width: 100%;
max-height: 100%;
object-fit: fill;
border-bottom: 2px solid black;
animation: ${bounceIn} 2s linear 1;
@media screen and (min-width: 1366px) {
animation: ${flickerIn} 2s linear 1;
margin-top: 3%;
width: 70%;
border: 7px solid black;
border-radius:11px;
box-shadow:  0 0 50px black;
transform: skew(10deg, -8deg);
}
`;
export const BlogHeroPic = styled.img`
width: 100%;
height: 40vh;
//max-height: 100%;
object-fit: fill;
border-bottom: 2px solid black;
animation: ${bounceIn} 2s linear 1;
@media screen and (min-width: 768px) {
  height: 50vh;
}

@media screen and (min-width: 1024px) {
animation: ${flickerIn} 2s linear 1;
margin-top: 8%;
width: 50%;
height: 100%;
border: 7px solid black;
border-radius:11px;
box-shadow:  0 0 50px black;
}
`;
export const AiImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
`;
