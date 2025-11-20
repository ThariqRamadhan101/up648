import { useStore } from '../store/store';

export async function askAi(message: string): Promise<string> {
  const state = useStore.getState();

  const filters = state.filters;
  const tasks = state.getFilteredTasks();
  const provinces = state.provinces;

  const compactTasks = tasks.map((t) => ({
    id: t.id,
    title: t.title,
    project: t.project,
    province: t.province,
    stage: t.stage,
    sprint: t.sprint,
    budgetTotal: t.budgetTotal,
    budgetAbsorbed: t.budgetAbsorbed,
    createdAt: t.createdAt,
    updatedAt: t.updatedAt,
  }));

  const compactProvinces = provinces.map((p) => ({
    id: p.id,
    name: p.name,
    indicators: p.indicators,
  }));

  const res = await fetch('http://localhost:4000/api/ai/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message,
      filters,
      data: {
        tasks: compactTasks,
        provinces: compactProvinces,
      },
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`AI request failed: ${text}`);
  }

  const json = await res.json() as { answer?: string };
  return json.answer ?? 'No answer returned from AI.';
}
