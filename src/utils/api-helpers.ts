/**
 * Utility helper for making consistent API POST requests
 */
export async function makeApiRequest<T = any>(
  url: string,
  data: Record<string, any>,
  method: 'POST' | 'PUT' | 'DELETE' = 'POST'
): Promise<T> {
  const response = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Request failed with status ${response.status}`);
  }

  return response.json();
} 