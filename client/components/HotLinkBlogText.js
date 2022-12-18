
export default function BlogText({ content }) {
    const URL_REGEX =
	/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
	const words = content.split(' ');
	return (
		<p>
			{words.map((word,index) => {
				return word.match(URL_REGEX) ? (
				
						<a key={index.toString()} href={word}>{word + ' '}</a>
					
				) : (
					
                   <b key={index.toString()}>{word + ' '}</b>
                   
                   
                    
				);
			})}
		</p>
	);
}