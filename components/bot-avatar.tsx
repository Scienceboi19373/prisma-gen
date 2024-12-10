import { Avatar, AvatarImage } from "./ui/avatar";

export default function Botavatar(){
    return (
        <Avatar className="h-8 w-8">
            <AvatarImage className="p-1" src="/logo.png" />
        </Avatar>
    )
}