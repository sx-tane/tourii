import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { UserService } from '@/api/generated';
import { executeValidatedServiceCall } from '@/app/api/lib/route-helper';

export async function GET(request: NextRequest) {
  // Get session for user authentication
  const session = await getServerSession(authOptions);
  
  // Fix 1: Improved authentication check - only bypass in development
  if (!session?.user && process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  
  // Fix 3: Add input validation for query parameters
  const page = Math.max(1, Number.parseInt(searchParams.get('page') || '1', 10));
  const limit = Math.min(100, Math.max(1, Number.parseInt(searchParams.get('limit') || '20', 10)));
  const userId = searchParams.get('userId');
  const questId = searchParams.get('questId');
  const touristSpotId = searchParams.get('touristSpotId');
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  // Use the real backend API
  return executeValidatedServiceCall(
    (apiKey: string, apiVersion: string) => {
      return UserService.touriiBackendControllerGetCheckins(
        apiVersion,
        apiKey,
        endDate || undefined,
        startDate || undefined,
        touristSpotId || undefined,
        questId || undefined,
        userId || undefined,
        limit,
        page
      );
    },
    'GET /api/checkins'
  );
}