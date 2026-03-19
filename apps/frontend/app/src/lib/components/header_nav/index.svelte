<script lang="ts">
	import { cn } from "@/lib/utils.js";
	import * as Menubar from "$lib/components/ui/menubar/index.js";
	import { ChevronDown } from "@lucide/svelte";

	interface NavItem {
		id: string;
		label: string;
		href: string;
		hasSubmenu?: boolean;
	}

	let {
		items = [
			{
				id: "getting_started",
				label: "Getting started",
				href: "#/getting_started",
				hasSubmenu: true,
			},
			{
				id: "components",
				label: "Components",
				href: "#/components",
				hasSubmenu: true,
			},
			{
				id: "documentation",
				label: "Documentation",
				href: "#/documentation",
				hasSubmenu: true,
			},
		],
	} = $props();

	let currentPath = $state(
		typeof window !== "undefined" ? window.location.hash : "",
	);

	$effect(() => {
		const handleHashChange = () => {
			currentPath = window.location.hash;
		};
		window.addEventListener("hashchange", handleHashChange);
		return () => window.removeEventListener("hashchange", handleHashChange);
	});

	const isActive = (href: string) => currentPath === href;
</script>

<div
	class="flex items-center w-full h-12 bg-white select-none relative z-[100] border-b border-slate-100 px-2"
>
	<Menubar.Root class="flex h-full bg-transparent border-none p-0 space-x-0">
		{#each items as item, index}
			<Menubar.Menu>
				<Menubar.Trigger
					class={cn(
						"h-full px-4 rounded-none bg-transparent hover:bg-transparent focus:bg-transparent transition-all cursor-pointer group flex items-center gap-1",
						"text-[#2E6238] font-bold text-[14px] uppercase tracking-wide border-b-2 border-transparent",
						"data-[state=open]:border-[#2E6238] data-[highlighted]:bg-transparent hover:border-[#2E6238]",
						isActive(item.href) && "border-[#2E6238]",
					)}
				>
					{item.label}
					{#if item.hasSubmenu}
						<ChevronDown
							class="w-4 h-4 transition-transform duration-300 group-data-[state=open]:rotate-180 opacity-70"
						/>
					{/if}
				</Menubar.Trigger>

				{#if item.hasSubmenu}
					<Menubar.Content
						class="min-w-none p-0 border-none shadow-none bg-transparent mt-2"
						sideOffset={0}
					>
						<!-- Updated Shadow: multi-layered for professional depth -->
						<div
							class="submenu-animate flex flex-row w-[600px] gap-4 p-2 bg-white items-stretch rounded-xl border border-slate-200"
						>
							<a
								href={item.href}
								class="flex-1 flex flex-col gap-2 p-4 rounded-lg hover:bg-[#F0F7ED] hover:ring-1 hover:ring-[#2E6238]/20 transition-all group outline-none"
							>
								<h4
									class="text-[#2E6238] font-bold text-[14px] uppercase tracking-tight leading-none"
								>
									Introduction
								</h4>
								<p
									class="text-[#2E6238]/70 text-[13px] font-normal leading-relaxed"
								>
									Re-usable components built using Radix UI
									and Tailwind CSS.
								</p>
							</a>
							<a
								href={item.href}
								class="flex-1 flex flex-col gap-2 p-4 rounded-lg bg-[#FFFBE6] ring-1 ring-[#FADB14]/30 transition-all group outline-none"
							>
								<h4
									class="text-[#2E6238] font-bold text-[14px] uppercase tracking-tight leading-none"
								>
									Installation
								</h4>
								<p
									class="text-[#2E6238]/70 text-[13px] font-normal leading-relaxed"
								>
									How to install dependencies and structure
									your app.
								</p>
							</a>
						</div>
					</Menubar.Content>
				{/if}
			</Menubar.Menu>

			{#if index < items.length - 1}
				<div
					class="w-[1px] h-4 bg-[#2E6238] opacity-20 self-center"
					aria-hidden="true"
				></div>
			{/if}
		{/each}
	</Menubar.Root>
</div>

<style>
	:global([data-slot="menubar-trigger"]) {
		outline: none !important;
	}

	/* Forceful CSS Animation for professional slide effect */
	@keyframes submenuSlideDown {
		from {
			opacity: 0;
			transform: translateY(-8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.submenu-animate {
		animation: submenuSlideDown 0.4s cubic-bezier(0.23, 1, 0.32, 1) forwards;
	}
</style>
