import { useQuery } from "@apollo/client";
/**styled component imports starts */
import { AdminBlogpostLink } from "../styles/Links.styled";
import { EditLinkSpan } from "../styles/Spans.styled";
/**styled component imports ends*/
/**import query for reviews */
import { GET_BASIC_USERS } from "../utils/queries";
/**COMPONENT TO GO ON ADMIN DASHBOARD THE LOWER CASE FILE WITH THE SAME NAME IN THE PAGES DIR IS ACTUALLY A PAGE*/
const AdminUsers = () => {
    const {loading , data: getUsers} = useQuery(GET_BASIC_USERS);
    return(
    <AdminBlogpostLink href='/adminusers'>
       {loading ? 'loading': getUsers.getUsers.length} users ➯<EditLinkSpan>edit ?</EditLinkSpan>
    </AdminBlogpostLink>
    );
};

export default AdminUsers;