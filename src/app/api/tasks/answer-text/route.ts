import type { SubmitAnswerTextRequestTaskDto } from "@/api/generated/models/SubmitAnswerTextRequestTaskDto";
import { TaskService } from "@/api/generated/services/TaskService";
import { executeValidatedServiceCall } from "@/app/api/lib/route-helper";
import { type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const body: SubmitAnswerTextRequestTaskDto = await req.json();
    
    return executeValidatedServiceCall(
      (apiKey: string, apiVersion: string) => {
        return TaskService.touriiBackendControllerSubmitAnswerTextTask(
          apiVersion,
          apiKey,
          body
        );
      },
      'POST /api/tasks/answer-text'
    );
}