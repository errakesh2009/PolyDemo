import { postmodel } from "./postmodel";
import { usermodel } from "./usermodel";

export class apiresponse{
    code:any;
    data:postmodel[];
    meta:any;
}
export class apiuserresponse{
    code:any;
    data:usermodel[];
    meta:any;
}