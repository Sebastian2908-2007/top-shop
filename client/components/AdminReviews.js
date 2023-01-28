import { useQuery } from "@apollo/client";
/**styled component imports starts */
import { AdminBlogpostLink } from "../styles/Links.styled";
import { EditLinkSpan } from "../styles/Spans.styled";
/**styled component imports ends*/
/**import query for reviews */
import { GET_REVIEWS_FOR_ADMIN } from "../utils/queries";
const AdminReviews = () => {
    const {loading , data: getReviews} = useQuery(GET_REVIEWS_FOR_ADMIN);
   return(
    <AdminBlogpostLink href='/reviews'>{loading ? 'loading': getReviews.getReviews.length} reviews ➯<EditLinkSpan>edit ?</EditLinkSpan></AdminBlogpostLink>
   );
};

export default AdminReviews;