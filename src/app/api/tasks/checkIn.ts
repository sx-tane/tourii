export async function checkInTask(taskId: string, latitude: number, longitude: number): Promise<boolean> {
  const res = await fetch(`/api/tasks/${taskId}/check-in`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ latitude, longitude }),
  });
  if (!res.ok) throw new Error("Failed to check in");
  const data = await res.json();
  if (typeof data === "boolean") return data;
  if (typeof data?.result === "boolean") return data.result;
  throw new Error("Unexpected API response");
} 