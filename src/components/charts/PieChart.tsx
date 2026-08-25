'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { Center, Spinner } from '@chakra-ui/react';

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const PieChart = (props: any) => {
  const { chartData, chartOptions } = props;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Center w="100%" h="100%" minH="240px">
        <Spinner size="md" color="brand.500" />
      </Center>
    );
  }

  return (
    <Chart
      options={chartOptions}
      type="pie"
      width="100%"
      height="100%"
      series={chartData}
    />
  );
};

export default PieChart;
