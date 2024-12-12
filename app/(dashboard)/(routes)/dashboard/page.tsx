"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, CodeIcon, ImageIcon, MessageSquare, MusicIcon, VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";

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
export default function DashboardPage() {
  const router= useRouter()
  return (
      <div>
        <div className="mb-8 space-y-4">
          <h2 className="text-2xl md:text-4xl font-bold text-center">
          All the Tools, All the Fun!
          </h2>
          <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Welcome to your creative playground! Whether you&apos;re here to chat it up, code something cool, drop some beats, craft epic visuals, or roll out cinematic gold - we&apos;ve got you covered. Dive in and let the magic happen, one click at a time!
          </p>
        </div>
        <div className="px-4 md:px-20 lg:px-32 space-y-4">
          {tools.map((tool)=> (
            <Card onClick={() => router.push(tool.href)} key={tool.href} className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer">
              <div className="flex items-center gap-x-4">
                <div className={cn("p-2 w-fit rounded-md",tool.bgColor)}>
                  <tool.icon className={cn("w-8 h-8", tool.color)} />
                </div>
                <div className="font-semibold">
                  {tool.label}
                </div>
              </div>
              <ArrowRight className="w-5 h-5" />
            </Card>
          ))}
        </div>
      </div>
  );
}