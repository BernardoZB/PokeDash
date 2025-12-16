import React from 'react';

export default function StatsChart({ stats }) {
  return <div>Stats: {stats ? stats.length : 0}</div>;
}
