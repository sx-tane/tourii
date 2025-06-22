import { SubmitAnswerTextRequestTaskDto } from "@/api/generated/models/SubmitAnswerTextRequestTaskDto";
import { TaskService } from "@/api/generated/services/TaskService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body: SubmitAnswerTextRequestTaskDto = await req.json();
    
    // Replace with your actual authentication logic to get these values
    const acceptVersion = "1.0.0";
    const xApiKey = process.env.API_KEY || "your-api-key"; 

    const response = await TaskService.touriiBackendControllerSubmitAnswerTextTask(
      acceptVersion,
      xApiKey,
      body
    );

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error submitting text answer:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
} 