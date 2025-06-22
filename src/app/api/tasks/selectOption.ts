export async function answerTaskSelectOption(taskId: string, optionId: number[]): Promise<boolean> {
  const res = await fetch(`/api/tasks/${taskId}/select-option`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ optionId }),
  });
  if (!res.ok) throw new Error("Failed to submit answer");
  const data = await res.json();
  return data.success;
} 