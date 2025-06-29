import type { SubmitAnswerTextRequestTaskDto } from "@/api/generated/models/SubmitAnswerTextRequestTaskDto";
import { TasksService } from "@/api/generated";
import { executeValidatedServiceCall } from "@/app/api/lib/route-helper";
import { type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const requestBody = await req.json();
    const { taskId, userId, ...dtoBody } = requestBody;
    
    if (!taskId || !userId) {
        return new Response(JSON.stringify({ error: "Missing taskId or userId" }), { 
            status: 400,
            headers: { "Content-Type": "application/json" }
        });
    }
    
    return executeValidatedServiceCall(
      (apiKey: string, apiVersion: string) => {
        return TasksService.touriiBackendControllerSubmitAnswerTextTask(
          taskId,
          userId,
          apiVersion,
          apiKey,
          dtoBody as SubmitAnswerTextRequestTaskDto
        );
      },
      'POST /api/tasks/answer-text'
    );
}