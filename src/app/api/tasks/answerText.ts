//Mock for BE
export async function answerTaskText(taskId: string, answer: string): Promise<boolean> {
  const res = await fetch(`/api/tasks/${taskId}/answer-text`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answer }),
  });
  if (!res.ok) throw new Error("Failed to submit answer");
  const data = await res.json();
  if (typeof data === "boolean") return data;
  if (typeof data?.result === "boolean") return data.result;
  throw new Error("Unexpected API response");
} 