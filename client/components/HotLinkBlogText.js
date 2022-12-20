import { SingleblogpostParagrapgh } from "../styles/P.styled";
import { ExternalLink } from "../styles/Links.styled";
export default function BlogText({ content }) {
    const URL_REGEX =
	/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
	const words = content.split(' ');
	return (
		<SingleblogpostParagrapgh>
			{words.map((word,index) => {
				return word.match(URL_REGEX) ? (
				
						<ExternalLink key={index.toString()} target="blank" href={word}>{word + ' '}</ExternalLink>
					
				) : (
					
                   <b key={index.toString()}>{word + ' '}</b>
                   
                   
                    
				);
			})}
		</SingleblogpostParagrapgh>
	);
}