import { Role } from "./Role";

export class JwtResponse{
    accessToken:string;
    username:string;
    type: string;
    roles: String[];

}