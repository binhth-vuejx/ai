<script lang="ts">
	import { Search, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Check, X } from "@lucide/svelte";
	import { cn } from "$lib/utils.js";

	interface Province {
		id: string;
		name: string;
		count: number;
	}

	let { 
		provinces = [
			{ id: "ag", name: "Tỉnh An Giang", count: 4 },
			{ id: "bn", name: "Tỉnh Bắc Ninh", count: 1 },
			{ id: "cm", name: "Tỉnh Cà Mau", count: 0 },
			{ id: "cb", name: "Tỉnh Cao Bằng", count: 0 },
			{ id: "dl", name: "Tỉnh Đắk Lắk", count: 1 }
		],
		currentPage = 1,
		totalPages = 7
	} = $props();

	// States
	let selectedIds = $state<string[]>(["cm", "cb"]);
	let isCollapsed = $state(false);
	let isSearching = $state(false);
	let searchQuery = $state("");

	// Derived logic for local filtering (example)
	const filteredProvinces = $derived(
		searchQuery 
			? provinces.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
			: provinces
	);

	function toggleSelect(id: string) {
		if (selectedIds.includes(id)) {
			selectedIds = selectedIds.filter(i => i !== id);
		} else {
			if (selectedIds.length < 10) {
				selectedIds.push(id);
			}
		}
	}

	const isSelected = (id: string) => selectedIds.includes(id);
</script>

<!-- Main Container: MO3cS (aggs_left) -->
<div class="flex flex-col w-full bg-transparent rounded-lg overflow-hidden select-none" style="color-scheme: light; font-family: 'Inter', sans-serif;">
	
	<!-- Header: O6ENC -->
	<div class="flex items-end justify-between w-full border-b-2 border-[#2E6238] h-9 shrink-0">
		<div class="flex items-center h-full">
			<!-- Green Tab: qNNMc -->
			<div class="flex items-center bg-[#2E6238] h-full pl-2 pr-1">
				<span class="text-white font-bold text-[16px] leading-none tracking-tight">Tỉnh/Thành phố</span>
			</div>
			<!-- Tab Edge Shape: eokUF -->
			<svg width="26" height="36" viewBox="0 0 26 36" fill="none" xmlns="http://www.w3.org/2000/svg" class="block shrink-0">
				<path d="M0 0L26 36H0V0Z" fill="#2E6238"/>
			</svg>
		</div>

		<!-- Header Buttons: Egfph -->
		<div class="flex items-end gap-2 h-8 px-2 pb-2">
			<!-- Search Toggle Button -->
			<button 
				class={cn(
					"flex items-center justify-center w-9 h-[26px] border rounded-[4px] transition-colors shrink-0",
					isSearching ? "bg-[#2E6238] border-[#2E6238] text-white" : "bg-white border-[#CBCCC9] text-black hover:bg-slate-50"
				)}
				onclick={() => { isSearching = !isSearching; if (!isSearching) searchQuery = ""; }}
				title="Tìm kiếm"
			>
				{#if isSearching}
					<X class="w-4 h-4" />
				{:else}
					<Search class="w-4 h-4" />
				{/if}
			</button>
			
			<!-- Collapse Toggle Button -->
			<button 
				class="flex items-center justify-center w-9 h-[26px] bg-white border border-[#CBCCC9] rounded-[4px] hover:bg-slate-50 transition-colors shrink-0"
				onclick={() => isCollapsed = !isCollapsed}
				title={isCollapsed ? "Mở rộng" : "Thu gọn"}
			>
				{#if isCollapsed}
					<ChevronDown class="w-4 h-4 text-black" />
				{:else}
					<ChevronUp class="w-4 h-4 text-black" />
				{/if}
			</button>
		</div>
	</div>

	<!-- Interactive Search Bar (Optional UI implementation for SDD) -->
	{#if isSearching && !isCollapsed}
		<div class="flex items-center w-full px-2 py-2 bg-white border-x border-[#cbccc9]">
			<input 
				type="text" 
				bind:value={searchQuery}
				placeholder="Nhập tên tỉnh thành..."
				class="w-full h-8 px-2 text-sm border border-[#CBCCC9] rounded-[4px] outline-none focus:border-[#2E6238] transition-colors"
				autoFocus
			/>
		</div>
	{/if}

	<!-- Expandable Area (List + Footer) -->
	{#if !isCollapsed}
		<!-- List Container: Ixbgy -->
		<div class="flex flex-col border-t border-x border-[#cbccc9] pt-[1px] px-[1px] bg-white/50 backdrop-blur-sm">
			{#if filteredProvinces.length > 0}
				{#each filteredProvinces as province}
					<button 
						class={cn(
							"flex items-center gap-3 w-full h-10 p-2 border-b border-[#CBCCC9] transition-colors text-left",
							isSelected(province.id) ? "bg-[#FFFBE6]" : "bg-white hover:bg-slate-50"
						)}
						onclick={() => toggleSelect(province.id)}
					>
						<div class={cn(
							"flex items-center justify-center w-5 h-5 rounded-[4px] border transition-colors shrink-0",
							isSelected(province.id) ? "bg-[#2E6238] border-[#2E6238]" : "bg-white border-[#CBCCC9]"
						)}>
							{#if isSelected(province.id)}
								<Check class="w-3.5 h-3.5 text-white" strokeWidth={3} />
							{/if}
						</div>

						<span class="flex-1 text-black font-normal text-[16px] truncate leading-none">
							{province.name}
						</span>

						<div class="flex items-center justify-center h-6 px-2 bg-[#E6F0FF] border border-[#003366] rounded-[4px] shrink-0">
							<span class="text-[#003366] font-bold text-[14px] leading-none">
								{province.count}
							</span>
						</div>
					</button>
				{/each}
			{:else}
				<div class="flex flex-col items-center justify-center py-10 bg-white text-slate-400 border-b border-[#CBCCC9]">
					<span class="text-sm">Không tìm thấy kết quả cho "{searchQuery}"</span>
				</div>
			{/if}
		</div>

		<!-- Footer: n4TJm -->
		<div class="flex items-center justify-between w-full h-10 px-2 pt-3 pb-[13px] bg-white border-b border-x border-[#cbccc9] rounded-b-lg shrink-0">
			<button 
				class="flex items-center justify-center w-9 h-[26px] bg-[#F5F5F5] border border-[#CBCCC9] rounded-[4px] disabled:opacity-50 hover:bg-slate-100 transition-colors"
				disabled={currentPage === 1}
			>
				<ChevronLeft class="w-5 h-5 text-black" />
			</button>

			<span class="text-black font-normal text-[16px] leading-none">
				Trang {currentPage} / {totalPages}
			</span>

			<button 
				class="flex items-center justify-center w-9 h-[26px] bg-[#F5F5F5] border border-[#CBCCC9] rounded-[4px] disabled:opacity-50 hover:bg-slate-100 transition-colors"
				disabled={currentPage === totalPages}
			>
				<ChevronRight class="w-5 h-5 text-black" />
			</button>
		</div>
	{/if}
</div>

<style>
	:global(body) {
		background-color: #f8fafc;
	}
</style>
