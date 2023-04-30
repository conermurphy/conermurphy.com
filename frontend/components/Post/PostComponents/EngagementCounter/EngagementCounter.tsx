import React, { useEffect } from 'react';

export default function EngagementCounter({ UUID }: { UUID: string }) {
  const [viewCount, setViewCount] = React.useState<null | number>(null);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (loading) return;

    async function updateData() {
      setLoading(true);
      const res = await fetch(`/api/engagementCount`, {
        method: 'PUT',
        body: JSON.stringify({ UUID }),
      });

      const data = (await res.json()) as { viewCount: number };

      if (data) {
        setViewCount(data.viewCount);
        setLoading(false);
      }
    }

    updateData();
  }, []);

  return viewCount ? (
    <p className="mt-6 text-xl">
      <strong>👥 {viewCount}</strong>
    </p>
  ) : null;
}
