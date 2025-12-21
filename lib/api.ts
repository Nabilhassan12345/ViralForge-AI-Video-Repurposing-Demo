// ViralForge API utility for frontend-backend integration

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

export async function uploadVideo(file: File, platforms: string[]): Promise<{ job_id: string }> {
  const formData = new FormData();
  formData.append('video', file);
  formData.append('platforms', platforms.join(','));
  const res = await fetch(`${API_BASE}/jobs`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) throw new Error('Failed to upload video');
  return res.json();
}

export function getJobEvents(job_id: string): EventSource {
  return new EventSource(`${API_BASE}/jobs/${job_id}/events`);
}

export async function getJobResults(job_id: string) {
  const res = await fetch(`${API_BASE}/jobs/${job_id}/results`);
  if (!res.ok) throw new Error('Failed to fetch results');
  return res.json();
}
