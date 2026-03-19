<script lang="ts">
	import { Menubar as MenubarPrimitive } from "bits-ui";
	import MenubarPortal from "./menubar-portal.svelte";
	import { cn, type WithoutChildrenOrChild } from "@/lib/utils.js";
	import type { ComponentProps } from "svelte";
	import { fly, fade } from "svelte/transition";

	let {
		ref = $bindable(null),
		class: className,
		sideOffset = 8,
		alignOffset = -4,
		align = "start",
		side = "bottom",
		portalProps,
		...restProps
	}: MenubarPrimitive.ContentProps & {
		portalProps?: WithoutChildrenOrChild<ComponentProps<typeof MenubarPortal>>;
	} = $props();
</script>

<MenubarPortal {...portalProps}>
	<div in:fly={{ y: 4, duration: 200 }} out:fade={{ duration: 150 }} class="z-50">
		<MenubarPrimitive.Content
			bind:ref
			data-slot="menubar-content"
			{sideOffset}
			{align}
			{alignOffset}
			{side}
			class={cn(
				"bg-popover text-popover-foreground z-50 min-w-[12rem] origin-(--bits-menubar-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-md",
				className
			)}
			{...restProps}
		/>
	</div>
</MenubarPortal>
