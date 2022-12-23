import { useQuery } from "@apollo/client";
/**styled component imports starts */
import { AdminBlogpostLink } from "../styles/Links.styled";
import { EditLinkSpan } from "../styles/Spans.styled";
/**styled component imports ends*/
/**import query for reviews */
import { GET_BASIC_USERS } from "../utils/queries";

const AdminUsers = () => {
    const {loading , data: getUsers} = useQuery(GET_BASIC_USERS);
    console.log(getUsers);
    return(
    <AdminBlogpostLink href='/adminusers'>
       {loading ? 'loading': getUsers.getUsers.length} users ➯<EditLinkSpan>edit ?</EditLinkSpan>
    </AdminBlogpostLink>
    );
};

export default AdminUsers;