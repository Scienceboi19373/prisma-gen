import { UserButton } from "@clerk/nextjs";
import MobileSidebar from "./mobile-sidebar";
import { getApiLimitCount } from "@/lib/api-limit";

export default async function Navbar() {
    const apiLimitCount = await getApiLimitCount()
    return(
        <div className="flex items-center p-4">
            <MobileSidebar apiLimitcount={apiLimitCount} />
            <div className="flex w-full justify-end">
                <UserButton afterSignOutUrl="/sign-in"/>
            </div>
        </div>
    )
}