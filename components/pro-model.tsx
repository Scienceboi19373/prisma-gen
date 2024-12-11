"use client"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Badge } from "./ui/badge"
import { Check, CodeIcon, ImageIcon, MessageSquare, MusicIcon, VideoIcon, Zap } from "lucide-react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useProModel } from "@/hooks/use-pro-model";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProModel() {
    const proModel = useProModel()
    const [loading, setLoading] = useState(false)

    const onSubscribe= async() => {
        try {
            setLoading(true)
            const response= await axios.get("/api/stripe")

            window.location.href = response.data.url
        } catch(error) {
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    const tools=[
        {
          label:"Conversation",
          icon: MessageSquare,
          color:"text-violet-500",
          bgColor:"bg-violet-500/10",
          href:"/conversation"
        },
        {
          label:"Image Generator",
          icon: ImageIcon,
          color:"text-pink-700",
          bgColor:"bg-pink-700/10",
          href:"/image-generator"
        },
        {
          label:"Video Generator",
          icon: VideoIcon,
          color:"text-orange-700",
          bgColor:"bg-orange-700/10",
          href:"/video-generator"
        },
        {
          label:"Music Generator",
          icon: MusicIcon,
          color:"text-emerald-500",
          bgColor:"bg-emerald-500/10",
          href:"/music-generator"
        },
        {
          label:"Code Generator",
          icon: CodeIcon,
          color:"text-green-700",
          bgColor:"bg-green-700/10",
          href:"/code-generator"
        },
    ]
    return (
        <Dialog open={proModel.isOpen} onOpenChange={proModel.onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
                        <div className="flex items-center gap-x-2 font-bold py-1">
                            Upgrade to Prisma Gen
                            <Badge className="uppercase text-sm py-1" variant="gradient">
                                premium
                            </Badge>
                        </div>
                    </DialogTitle>
                    <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
                        {tools.map((tool) => (
                            <Card
                                key={tool.label}
                                className="p-3 border-black/5 flex items-center justify-between"
                            >
                                <div className="flex items-center gap-x-4">
                                    <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                                        <tool.icon className={cn("w-6 h-6", tool.color)}/>
                                    </div>
                                    <div className="font-semibold text-sm">
                                        {tool.label}
                                    </div>
                                </div>
                                <Check className="text primary w-5 h-5 items-center justify-center"/>
                            </Card>
                        ))}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        disabled={loading}
                        onClick={onSubscribe}
                        size="lg"
                        variant="gradient"
                        className="w-full"
                    >
                        Upgrade
                        <Zap className="w-4 h-4 ml-2 fill-white" />
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}