import { useQuery } from "@apollo/client";
import { GET_ALL_DATA_USERS } from "../utils/queries";
export default function adminusers () {
    const {loading,data: getusers} = useQuery(GET_ALL_DATA_USERS);
    if(loading) {
        return(<div>loading...</div>);
}
console.log(getusers);
    return (
        <div>this is the admin users page</div>
    );
};