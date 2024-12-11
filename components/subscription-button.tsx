"use client"

import { Button } from "@/components/ui/button"
import axios from "axios"
import { Zap } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"

interface SubscriptionButtonProps {
    isPro: boolean
}

export default function SubscriptionButton({
    isPro = false
}: SubscriptionButtonProps) {
    const [loading, setLoading] = useState(false)

    const onClick = async () => {
        try {
            setLoading(true)
            const response = await axios.get("/api/stripe")

            window.location.href = response.data.url
        } catch (error) {
            console.log("[SUBSCRIPTION_ERROR]", error);
            toast.error("something went wrong")
        } finally {
            setLoading(false)
        }
    }
    return (
        <Button disabled={loading} variant={isPro ? "default" : "gradient"} onClick={onClick}>
            {isPro ? "ManageSubscription":  "Upgrade"}
            {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
        </Button>
    )
}