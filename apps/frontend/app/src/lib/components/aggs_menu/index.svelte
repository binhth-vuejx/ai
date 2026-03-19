<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Undo } from "lucide-svelte";

  interface Item {
    label: string;
    href: string;
    active?: boolean;
  }

  interface Props {
    title?: string;
    items?: Item[];
    onBack?: () => void;
  }

  let {
    title = "THÔNG TIN DI SẢN",
    items = [
      { label: "Thông tin chung", href: "#", active: true },
      { label: "Hồ sơ văn bản", href: "#" },
      { label: "Hệ sinh thái", href: "#" },
      { label: "Loài", href: "#" },
      { label: "Bảo tồn gen", href: "#" },
      { label: "Vị trí địa lý", href: "#" }
    ],
    onBack = () => {}
  }: Props = $props();
</script>

<div class="flex flex-col w-full bg-transparent">
  <!-- Header Wrapper (Includes Border Line for Vertical Alignment) -->
  <div class="relative w-full h-[40px] flex items-center justify-between pr-2">
    <!-- Background Layer (Slant 36px + Bottom Line 4px) -->
    <div class="absolute inset-0 flex flex-col pointer-events-none z-0">
      <div class="flex items-center h-[36px]">
        <div class="h-full bg-[#005A2B] pl-4 flex-shrink min-w-0" style="width: fit-content;">
          <!-- Invisible Title for Auto-Width Scaling -->
          <h2 class="text-[16px] font-bold text-transparent leading-none m-0 pointer-events-none px-4">
            {title}
          </h2>
        </div>
        <svg width="40" height="36" viewBox="0 0 40 36" class="flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0 L40 36 H0 Z" fill="#005A2B"/>
        </svg>
      </div>
      <div class="w-full h-[4px] bg-[#005A2B]"></div>
    </div>

    <!-- Content Layer -->
    <div class="relative flex w-full h-full items-center justify-between z-10 pl-4">
      <h2 class="text-[16px] font-bold text-white leading-none tracking-normal m-0 truncate pr-4">
        {title}
      </h2>
      
      <Button 
        variant="outline" 
        size="icon" 
        class="h-7 w-9 bg-white shadow-sm hover:bg-gray-50 border-[#E5E7EB] rounded-md flex-shrink-0 mb-1"
        onclick={onBack}
      >
        <Undo class="h-4 w-4 text-[#003366]" />
      </Button>
    </div>
  </div>

  <!-- Menu List -->
  <div class="flex flex-col w-full">
    {#each items as item}
      <a 
        href={item.href}
        class="flex items-center w-full min-h-[40px] px-4 py-0 border-b border-x border-[#dddddd] text-[16px] 
               transition-colors hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#005A2B]
               {item.active ? 'bg-[#FFF9E5] font-medium text-black' : 'bg-white text-black font-normal'}"
      >
        <span class="break-words w-full">{item.label}</span>
      </a>
    {/each}
  </div>
</div>

<style>
  /* Ensure the background scales with the title content */
  h2 {
    max-width: calc(100% - 60px); /* Leave space for back button */
  }
</style>
