import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Header } from './header';
import { MainNav } from './main-nav';
import { APP_NAME } from '@/lib/constants';
import { FeastForBeastsLogo, IconFeast } from '@/components/icons/logo';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <SidebarProvider defaultOpen>
      <Sidebar collapsible="icon">
        <SidebarHeader className="p-4">
           <Link href="/dashboard" className="flex items-center gap-2 group-data-[collapsible=icon]:hidden">
             <FeastForBeastsLogo className="h-8 w-auto text-primary" />
           </Link>
           <Link href="/dashboard" className="hidden items-center gap-2 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center">
             <IconFeast className="h-8 w-8 text-primary" />
           </Link>
        </SidebarHeader>
        <SidebarContent>
          <MainNav />
        </SidebarContent>
        <SidebarFooter className="p-2">
          <Button variant="ghost" asChild className="w-full justify-start gap-2 group-data-[collapsible=icon]:justify-center">
            <Link href="/">
              <LogOut className="h-5 w-5 shrink-0" />
              <span className="group-data-[collapsible=icon]:sr-only">Log Out</span>
            </Link>
          </Button>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <Header />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-secondary/40 min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
