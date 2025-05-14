'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ADMIN_NAV_ITEMS, NavItem } from '@/lib/constants';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useSidebar } from '@/components/ui/sidebar';

export function AdminNav() {
  const pathname = usePathname();
  const { state: sidebarState, isMobile } = useSidebar();

  return (
    <SidebarMenu>
      {ADMIN_NAV_ITEMS.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Tooltip>
            <TooltipTrigger asChild>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href || (item.href !== '/admin/dashboard' && pathname.startsWith(item.href))}
                 className={cn(
                  "justify-start",
                  (sidebarState === 'collapsed' && !isMobile) && "justify-center"
                )}
              >
                <Link href={item.href}>
                  <item.icon className="h-5 w-5 shrink-0" />
                   <span className={cn("truncate", (sidebarState === 'collapsed' && !isMobile) && "sr-only")}>
                    {item.title}
                  </span>
                </Link>
              </SidebarMenuButton>
            </TooltipTrigger>
            {(sidebarState === 'collapsed' && !isMobile) && (
              <TooltipContent side="right" align="center">
                {item.title}
              </TooltipContent>
            )}
          </Tooltip>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
