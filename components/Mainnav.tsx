"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"

export function Mainnav({className, ...props}: React.HTMLAttributes<HTMLElement>){
  const pathname = usePathname()
  const params = useParams()

  const  routes = [
    {
      href: `/${params.storeId}`,
      label: 'Overview',
      action: pathname === `/${params.storeId}`,
    },
    {
        href: `/${params.storeId}/billboards`,
        label: 'Billboards',
        action: pathname === `/${params.storeId}/billboards`,
    },
    {
        href: `/${params.storeId}/settings`,
        label: 'Settings',
        action: pathname === `/${params.storeId}/settings`,
    }
  ] 
  
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((route) => (
        <Link className={cn("text-sm text-medium transition-colors hover:text-primary",
                        route.action ? "text-black dark:text-white":"text-muted-foreground")} 
                        key={route.href} href={route.href}>
            {route.label}
        </Link>
      ))}
    </nav>
  )
}

export default Mainnav