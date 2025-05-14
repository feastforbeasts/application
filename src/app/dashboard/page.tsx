import { AppShell } from "@/components/layout/app-shell";
import { StatCard } from "@/components/dashboard/stat-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Gift, TrendingUp, Utensils, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
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

const recentDonations = [
  { id: "DN001", foodType: "Cooked Meals", quantity: "10 kg", status: "Delivered", date: "2024-07-15" },
  { id: "DN002", foodType: "Canned Goods", quantity: "25 items", status: "Picked Up", date: "2024-07-20" },
  { id: "DN003", foodType: "Bakery Products", quantity: "5 kg", status: "Pending", date: "2024-07-22" },
];

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
          <Button asChild>
            <Link href="/donate">
              <Gift className="mr-2 h-4 w-4" /> Make a New Donation
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Donations" value="27" icon={Gift} description="+5 this month" />
          <StatCard title="Food Donated (Est.)" value="152 kg" icon={Utensils} description="Equivalent to ~300 meals" />
          <StatCard title="Impact Score" value="850" icon={TrendingUp} description="Helping our community" iconColor="text-accent" />
          <StatCard title="Successful Deliveries" value="25" icon={CheckCircle2} description="2 pending" />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Donations Overview</CardTitle>
              <CardDescription>Your donation activity over the last 6 months.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
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
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Recent Donations</CardTitle>
              <CardDescription>A quick look at your latest donation activities.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Food Type</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentDonations.map((donation) => (
                    <TableRow key={donation.id}>
                      <TableCell className="font-medium">{donation.id}</TableCell>
                      <TableCell>{donation.foodType}</TableCell>
                      <TableCell>{donation.quantity}</TableCell>
                      <TableCell>
                        <Badge variant={donation.status === 'Delivered' ? 'default' : donation.status === 'Pending' ? 'outline' : 'secondary'}
                               className={donation.status === 'Delivered' ? 'bg-green-500/20 text-green-700' : donation.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-700' : 'bg-blue-500/20 text-blue-700'}>
                          {donation.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{donation.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button variant="link" asChild className="mt-4 float-right text-primary">
                <Link href="/history">View All Donations &rarr;</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
