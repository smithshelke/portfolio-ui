'use client'

import * as React from "react"
import { usePathname } from "next/navigation"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { data } from "@/lib/nav-data"

export function AppBreadcrumb() {
  const pathname = usePathname()

  const { parent, child } = React.useMemo(() => {
    for (const section of data.navMain) {
      const foundItem = section.items?.find((item) => item.url === pathname)
      if (foundItem) {
        return { parent: section, child: foundItem }
      }
    }
    return { parent: null, child: null }
  }, [pathname])

  if (!parent || !child) {
    return null
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href={parent.url}>{parent.title}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem>
          <BreadcrumbPage>{child.title}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
