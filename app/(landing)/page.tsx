import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LandingPage() {
    return (
        <div>
            Landing Page (Unprotected)
            <div className="flex items-center justify-center h-full">
                <Link href="/sign-in">
                    <Button>
                        Login
                    </Button>
                </Link>
            </div>
            <div className="flex items-center justify-center h-full">
                <Link href="/sign-up">
                    <Button>
                        Register
                    </Button>
                </Link>
            </div>
        </div>
    );
}
