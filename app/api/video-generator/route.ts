import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import RunwayML from '@runwayml/sdk';

const client = new RunwayML();

export async function POST(req: Request) {
  try {
    const { userId } = await auth(); // Await the auth function to resolve
    const body = await req.json();
    const { prompt } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    const imageToVideo = await client.imageToVideo.create({
      model: 'gen3a_turbo',
      // Point this at your own image file
      promptImage: '',
      promptText: prompt,
    });
  
    const taskId = imageToVideo.id;
  
    // Poll the task until it's complete
    let task: Awaited<ReturnType<typeof client.tasks.retrieve>>;
    do {
      // Wait for ten seconds before polling
      await new Promise(resolve => setTimeout(resolve, 10000));
  
      task = await client.tasks.retrieve(taskId);
    } while (!['SUCCEEDED', 'FAILED'].includes(task.status));
  
    console.log('Task complete:', task);

  //return NextResponse.json(response);
  } catch (error) {
    console.log("[VIDEO_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
