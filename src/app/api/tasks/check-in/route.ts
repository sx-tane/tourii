import type { SubmitCheckInTaskRequestDto } from "@/api/generated/models/SubmitCheckInTaskRequestDto";
import { TaskService } from "@/api/generated/services/TaskService";
import { executeValidatedServiceCall } from "@/app/api/lib/route-helper";
import { type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const body: SubmitCheckInTaskRequestDto = await req.json();
    
    return executeValidatedServiceCall(
      (apiKey: string, apiVersion: string) => {
        return TaskService.touriiBackendControllerSubmitCheckInTask(
          apiVersion,
          apiKey,
          body
        );
      },
      'POST /api/tasks/check-in'
    );
}