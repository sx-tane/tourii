import type { SubmitSelectOptionsTaskRequestDto } from "@/api/generated/models/SubmitSelectOptionsTaskRequestDto";
import { TaskService } from "@/api/generated/services/TaskService";
import { executeValidatedServiceCall } from "@/app/api/lib/route-helper";
import { type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const body: SubmitSelectOptionsTaskRequestDto = await req.json();
    
    return executeValidatedServiceCall(
      (apiKey: string, apiVersion: string) => {
        return TaskService.touriiBackendControllerSubmitSelectOptionTask(
          apiVersion,
          apiKey,
          body
        );
      },
      'POST /api/tasks/select-option'
    );
}