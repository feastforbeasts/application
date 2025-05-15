
import { AdminShell } from "@/components/layout/admin-shell";
import { StatCard } from "@/components/dashboard/stat-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Package, Users, AlertTriangle, CheckSquare } from "lucide-react";
import Link from "next/link";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import type { ChartConfig } from "@/components/ui/chart";

const donationStatusData = [
  { name: "Pending", value: 12, fill: "hsl(var(--chart-4))" }, // Orange
  { name: "Approved", value: 35, fill: "hsl(var(--chart-2))" }, // Gold/Yellow
  { name: "Picked Up", value: 25, fill: "hsl(var(--chart-3))" }, // Blue
  { name: "Delivered", value: 88, fill: "hsl(var(--chart-1))" }, // Green
];

const chartConfig = {
  value: {
    label: "Count",
  },
  pending: { label: "Pending", color: "hsl(var(--chart-4))" },
  approved: { label: "Approved", color: "hsl(var(--chart-2))" },
  picked_up: { label: "Picked Up", color: "hsl(var(--chart-3))" },
  delivered: { label: "Delivered", color: "hsl(var(--chart-1))" },
} satisfies ChartConfig;


const recentDonationRequests = [
  { id: "DN101", user: "Alice Smith", foodType: "Leftover Catering", status: "Pending", date: "2024-07-22" },
  { id: "DN102", user: "Bob Johnson", foodType: "Canned Soups", status: "Approved", date: "2024-07-21" },
  { id: "DN103", user: "Charlie Brown", foodType: "Fresh Vegetables", status: "Pending", date: "2024-07-22" },
];

export default function AdminDashboardPage() {
  return (
    <AdminShell>
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Admin Dashboard</h1>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Pending Donations" value="12" icon={AlertTriangle} description="Awaiting approval" iconColor="text-orange-500" />
          <StatCard title="Active Volunteers" value="45" icon={Users} description="+3 this week" />
          <StatCard title="Total NGOs Partnered" value="18" icon={Package} description="Verified partners" />
          <StatCard title="Donations Processed (Month)" value="160" icon={CheckSquare} description="Successfully delivered" iconColor="text-green-500" />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="shadow-md md:col-span-2">
            <CardHeader>
              <CardTitle>Recent Donation Requests</CardTitle>
              <CardDescription>New and pending donation requests requiring action.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow><TableHead>ID</TableHead><TableHead>User</TableHead><TableHead>Food Type</TableHead><TableHead>Status</TableHead><TableHead>Date</TableHead></TableRow>
                </TableHeader>
                <TableBody>
                  {recentDonationRequests.map((donation) => (
                    <TableRow key={donation.id}><TableCell className="font-medium">
                        <Link href={`/admin/donations/${donation.id}`} className="text-primary hover:underline">
                            {donation.id}
                        </Link>
                      </TableCell><TableCell>{donation.user}</TableCell><TableCell>{donation.foodType}</TableCell><TableCell>
                        <Badge variant={donation.status === 'Pending' ? 'destructive' : 'default'}
                               className={donation.status === 'Pending' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}>
                          {donation.status}
                        </Badge>
                      </TableCell><TableCell>{donation.date}</TableCell></TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Donation Status Distribution</CardTitle>
              <CardDescription>Overview of current donation statuses.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <RechartsTooltip content={<ChartTooltipContent hideLabel />} />
                    <Pie data={donationStatusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                      {donationStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminShell>
  );
}
