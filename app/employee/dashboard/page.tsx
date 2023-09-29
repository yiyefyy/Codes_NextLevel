'use client';

import { Card, Metric, Text, Title, BarList, Flex, Grid } from '@tremor/react';
import CustomCard from '../../components/custom-card';
import CustomButton from '../../components/custom-button';

export default function Dashboard() {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <CustomCard
        title="Workshop"
        description="Workshop Workshop"
        date="1 Oct 2023"
        status="Open"
        style={{ marginBottom: '16px' }}
      />
      <CustomCard
        title="Workshop"
        description="Workshop Workshop"
        date="1 Oct 2023"
        status="Registered"
        style={{ marginBottom: '16px' }}
      />
      <CustomCard
        title="Workshop"
        description="Workshop Workshop"
        date="1 Oct 2023"
        status="Cancelled"
        style={{ marginBottom: '16px' }}
      />
    </main>
  );
}
