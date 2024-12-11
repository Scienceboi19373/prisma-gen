import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

export default async function DashboardLayout ({
    children,
}: {
    children: React.ReactNode;
}) {
    const isPro = await checkSubscription()
    const apiLimitCount = await getApiLimitCount()
    return (
        <div className="h-full relative">
            <div className="hidden h=full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 bg-gray-900">
                <div className="text-white-900 h-full">
                    <Sidebar isPro={isPro} apiLimitCount={apiLimitCount} /> 
                </div>
            </div>
            <main className="md:pl-72">
                <Navbar />
                {children}
            </main>
        </div>
    )
}