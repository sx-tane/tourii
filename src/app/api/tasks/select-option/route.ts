import type { SubmitSelectOptionsTaskRequestDto } from "@/api/generated/models/SubmitSelectOptionsTaskRequestDto";
import { TaskService } from "@/api/generated/services/TaskService";
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
        return TaskService.touriiBackendControllerSubmitSelectOptionTask(
          taskId,
          userId,
          apiVersion,
          apiKey,
          dtoBody as SubmitSelectOptionsTaskRequestDto
        );
      },
      'POST /api/tasks/select-option'
    );
}