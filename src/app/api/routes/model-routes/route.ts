import { RoutesService } from "@/api/generated";
import { executeValidatedServiceCall } from "../../lib/route-helper";

export async function GET() {
    return executeValidatedServiceCall(
        (apiKey: string, apiVersion: string) =>
            RoutesService.touriiBackendControllerGetRoutes(apiVersion, apiKey),
        "GET /api/routes/model-routes",
    );
} 