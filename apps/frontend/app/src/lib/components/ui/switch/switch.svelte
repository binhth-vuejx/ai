<script lang="ts">
	import { Switch as SwitchPrimitive } from "bits-ui";
	import { cn, type WithoutChildrenOrChild } from "@/lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		checked = $bindable(false),
		...restProps
	}: WithoutChildrenOrChild<SwitchPrimitive.RootProps> = $props();
</script>

<SwitchPrimitive.Root
	bind:ref
	bind:checked
	data-slot="switch"
	class={cn(
		"data-[state=checked]:bg-primary data-[state=unchecked]:bg-slate-200 focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-slate-800 peer inline-flex h-[var(--switch-height)] w-[var(--switch-width)] shrink-0 items-center rounded-full p-[2px] shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
		className
	)}
	{...restProps}
>
	<SwitchPrimitive.Thumb
		data-slot="switch-thumb"
		class={cn(
			"bg-background block size-[var(--switch-thumb-size)] rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[var(--switch-thumb-translate)] data-[state=unchecked]:translate-x-0 rtl:data-[state=checked]:translate-x-[calc(-1*var(--switch-thumb-translate))]"
		)}
	/>
</SwitchPrimitive.Root>
