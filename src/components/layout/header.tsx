import Link from 'next/link';
import { FeastForBeastsLogo } from '@/components/icons/logo';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { UserNav } from './user-nav';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type HeaderProps = {
  isAdmin?: boolean;
};

export function Header({ isAdmin = false }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="md:hidden" />
          <Link href={isAdmin ? "/admin/dashboard" : "/dashboard"} className="flex items-center space-x-2">
            <FeastForBeastsLogo className="h-8 w-auto" />
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          {!isAdmin && (
            <Button asChild className={cn(
                "bg-primary hover:bg-primary/90 text-primary-foreground",
                "dark:bg-primary dark:hover:bg-primary/90 dark:text-primary-foreground"
              )}>
              <Link href="/donate">Donate Food</Link>
            </Button>
          )}
          <UserNav />
        </div>
      </div>
    </header>
  );
}
