import type { InterpretedReport, UserProfile } from '@health-report/domain';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:4000';

export async function interpretReport(file: File, profile: UserProfile): Promise<InterpretedReport> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('profile', JSON.stringify(profile));

  const response = await fetch(`${API_BASE_URL}/api/reports/interpret`, {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as { message?: string } | null;
    throw new Error(payload?.message ?? '报告解读失败');
  }

  const payload = (await response.json()) as { report: InterpretedReport };
  return payload.report;
}
