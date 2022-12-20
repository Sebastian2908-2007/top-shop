import { NotAdminDiv } from "../styles/Div.styled";
import { AdminItemNameSpan } from "../styles/Spans.styled";
import TopLinkPack from "./TopLinkPack";
const NotAdmin = () => {
    return (
        <NotAdminDiv>
        <AdminItemNameSpan>Sorry but it appears you are not an admin!</AdminItemNameSpan>
        <TopLinkPack/>
        </NotAdminDiv>
    );
};

export default NotAdmin;