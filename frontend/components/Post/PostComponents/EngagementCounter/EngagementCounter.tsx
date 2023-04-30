import React, { useEffect } from 'react';
import { useTransition } from '../../../../context/page-transition-context';

export default function EngagementCounter({ UUID }: { UUID: string }) {
  const [viewCount, setViewCount] = React.useState<null | number>(null);
  const { transitionFinished } = useTransition();

  useEffect(() => {
    if (!transitionFinished || !UUID) return;

    async function updateData() {
      const res = await fetch(`/api/engagementCount`, {
        method: 'PUT',
        body: JSON.stringify({ UUID }),
      });

      const data = (await res.json()) as { viewCount: number };

      if (data) {
        setViewCount(data.viewCount);
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
