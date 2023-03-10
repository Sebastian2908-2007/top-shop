import { AboutSection,OuterAboutSection,AboutHeroSection } from "../styles/Section.styled";
import { AboutHeroPic, AiImage } from "../styles/Images.styled";
import { AboutParagrapgh } from "../styles/P.styled";

const About = () => {
return (
    <>
    <AboutHeroSection>
        <AboutHeroPic
         src="/about-hero2.png" 
         alt="A futuristic shop on a mountain"
         width={602}
         height={603}
         />
    </AboutHeroSection>
    <OuterAboutSection>
    <AboutSection>
        <AboutParagrapgh>
        Welcome to Top Shop, the online store where we prioritize both ethics and great customer service.

At Top Shop, we firmly believe that being a responsible business is just as important as providing top-quality products.
</AboutParagrapgh>
<AiImage
 width={601}
 height={600}
 src="/about-hero.png" alt=""
 />
<AboutParagrapgh>
 That's why we meticulously source our products from suppliers who uphold the same values of fairness and sustainability that we do.
  Additionally, we ensure that our employees are treated with respect and compensated fairly for their hard work.
  </AboutParagrapgh>
  <AiImage
   width={606}
   height={602}
   src="/about-section.png" alt=""/>
<AboutParagrapgh>
We understand that online shopping can be overwhelming, but rest assured that our team is here to make the experience
 as seamless and enjoyable as possible. 
 </AboutParagrapgh>
 <AiImage
  width={603}
  height={604}
  src="/about-section2.png" alt=""/>
 <AboutParagrapgh>
Our customer service representatives are available to assist you with any queries or issues you may have.

Thank you for choosing Top Shop. We're thrilled to have you as a customer and we look forward to serving you.
</AboutParagrapgh>
<AiImage
 width={602}
 height={603}
 src="/about-section4.png" alt=""/>
    </AboutSection>
    </OuterAboutSection>
    </>
)
};

export default About;