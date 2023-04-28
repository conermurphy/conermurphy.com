import React, { useEffect } from 'react';

export default function EngagementCounter({ UUID }: { UUID: string }) {
  const [viewCount, setViewCount] = React.useState<null | number>(null);

  useEffect(() => {
    if (!UUID) return;

    async function updateData() {
      const res = await fetch(`/api/engagementCount`, {
        method: 'PUT',
        body: JSON.stringify({ UUID }),
      });

      const data = (await res.json()) as { viewCount: number };

      setViewCount(data.viewCount);
    }

    updateData();
  }, [UUID]);

  return viewCount ? (
    <p className="mt-6 text-xl">
      <strong>👥 {viewCount}</strong>
    </p>
  ) : null;
}
