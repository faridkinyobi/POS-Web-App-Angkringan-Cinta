"use client";
import React from "react";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	SidebarGroup,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { ChevronRight } from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { TypeItemsMenu, TypePrefetchMenuItem } from "@/types";
import { queryClient } from "@/lib/queryClient";
type Props = { Items: TypeItemsMenu[] };

export default function SidebarMenuList({ Items }: Props) {
	const pathname = usePathname().toLowerCase();

	const handleQueryPrefetchFn = (menuItems: TypePrefetchMenuItem) => {
		if (menuItems.prefetchQueryKey && menuItems.prefetchFn) {
			// console.log("🔄 Prefetch berjalan untuk:", menuItems.prefetchQueryKey);

			return queryClient.prefetchQuery({
				queryKey: menuItems.prefetchQueryKey,
				queryFn: async () => {
					const res = await menuItems.prefetchFn!();
					return res?.data;
				},
				staleTime: 1000 * 60 * 1,
			});
		}
	};

	// console.log("pathname", pathname);
	return (
		<SidebarGroup>
			<SidebarMenu>
				{Items.map((menuItems, i) => {
					const hasChildren = menuItems.items && menuItems.items.length > 0;

					const isActive = pathname === (menuItems.url || "").toLowerCase();
					return (
						<Collapsible
							key={`menu-${menuItems.url}-${i}`}
							asChild
							defaultOpen={menuItems.isActive}
							className="group/collapsible"
						>
							<SidebarMenuItem>
								<CollapsibleTrigger asChild>
									{hasChildren ? (
										// Button untuk menu dengan submenu
										<SidebarMenuButton
											tooltip={menuItems.title}
											className="capitalize"
											isActive={isActive}
											aria-label={menuItems.title}
										>
											{menuItems.icon && <menuItems.icon />}
											<span>{menuItems.title}</span>
											<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
										</SidebarMenuButton>
									) : (
										<SidebarMenuButton
											asChild
											tooltip={menuItems.title}
											className="capitalize"
											isActive={isActive}
											aria-label={menuItems.title}
											aria-disabled={isActive}
										>
											<Link
												className={cn(
													"flex items-center gap-2",
													isActive
														? "pointer-events-none opacity-90"
														: "hover:text-sidebar-accent"
												)}
												href={`${menuItems.url?.toLocaleLowerCase().replace(/\s+/g, "-")}`}
												onMouseEnter={() => handleQueryPrefetchFn(menuItems)}
											>
												{menuItems.icon && <menuItems.icon />}
												<span>{menuItems.title}</span>
											</Link>
										</SidebarMenuButton>
									)}
								</CollapsibleTrigger>
								{hasChildren && (
									<CollapsibleContent>
										<SidebarMenuSub>
											{menuItems.items?.map((subMenuItems) => {
												const subSlug = subMenuItems.url
													.toLowerCase()
													.replace(/\s+/g, "-");
												const isSubActive = pathname === subSlug;
												return (
													<SidebarMenuSubItem
														key={`sub-${menuItems.title}-${subMenuItems.title}`}
													>
														<SidebarMenuSubButton asChild>
															<Link
																data-active={isSubActive}
																href={subSlug}
																aria-label={subMenuItems.title}
																className={cn(
																	"data-[active=true]:bg-[linear-gradient(125deg,#109900_0%,var(--primary)_70%)]",
																	"data-[active=true]:hover:bg-[linear-gradient(125deg,#109900_0%,var(--btn-hover)_70%)]",
																	"data-[active=true]:text-sidebar-primary-foreground"
																)}
																onMouseEnter={(e) => {
																	e.preventDefault(); // kalau perlu
																	handleQueryPrefetchFn(subMenuItems);
																}}
															>
																<span>{subMenuItems.title}</span>
															</Link>
														</SidebarMenuSubButton>
													</SidebarMenuSubItem>
												);
											})}
										</SidebarMenuSub>
									</CollapsibleContent>
								)}
							</SidebarMenuItem>
						</Collapsible>
					);
				})}
			</SidebarMenu>
		</SidebarGroup>
	);
}
