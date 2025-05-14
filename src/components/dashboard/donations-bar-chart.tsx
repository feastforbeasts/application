
"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";

const chartData = [
  { month: "January", donations: 12 },
  { month: "February", donations: 19 },
  { month: "March", donations: 10 },
  { month: "April", donations: 22 },
  { month: "May", donations: 15 },
  { month: "June", donations: 25 },
];

const chartConfig = {
  donations: {
    label: "Donations",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export function DonationsBarChart() {
  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
          <YAxis tickLine={false} axisLine={false} tickMargin={8} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="donations" fill="var(--color-donations)" radius={4} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
