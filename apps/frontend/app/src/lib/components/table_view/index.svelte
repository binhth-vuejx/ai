<script lang="ts">
  import { LayoutGrid, CornerDownRight } from "@lucide/svelte";

  interface Row {
    label: string;
    value: string | number;
    level?: number; // Cấp bậc phân cấp (0, 1, 2...)
    isItalic?: boolean; // In nghiêng nhãn
  }

  interface Props {
    mainTitle?: string;
    sectionTitle?: string;
    rows?: Row[];
  }

  let {
    mainTitle = "KHU BẢO TỒN BIỂN BẠCH LONG VĨ",
    sectionTitle = "Thông tin chung",
    rows = [
      {
        label: "Tên di sản thiên nhiên",
        value: "Khu bảo tồn biển Bạch Long Vĩ",
        level: 0,
      },
      { label: "Văn bản thành lập", value: "", level: 0 },
      {
        label: "Tên văn bản",
        value: "Quyết định về việc thành lập khu bảo tồn biển Bạch Long Vĩ",
        level: 1,
        isItalic: true,
      },
      {
        label: "Số hiệu văn bản",
        value: "2630/QĐ-TTg",
        level: 1,
        isItalic: true,
      },
      { label: "Ngày ban hành", value: "31/12/2013", level: 1, isItalic: true },
      {
        label: "Cơ quan ban hành",
        value: "Thủ tướng Chính phủ",
        level: 1,
        isItalic: true,
      },
      { label: "Thông tin vị trí địa lý", value: "", level: 0 },
      { label: "Kinh độ", value: "107.72783", level: 1, isItalic: true },
      { label: "Vĩ độ", value: "20.13111", level: 1, isItalic: true },
      {
        label: "Thông tin mô tả",
        value:
          "Đảo Bạch Long Vĩ nằm giữa vịnh Bắc bộ và cách cảng Hải Phòng khoảng 135km. Năm 1995, Viện Hải dương học Hải Phòng đã tiến hành khảo sát hệ sinh thái biển và trên đảo thuộc khu vực đề xuất xây dựng khu bảo tồn biển Đảo Bạch Long Vĩ. Trong đợt khảo sát này đã phát hiện được 126 loài thực vật trên đảo và 17 loài thực vật ngập mặn.",
        level: 0,
      },
      { label: "Tổng diện tích (ha)", value: "27.008,93", level: 0 },
      {
        label: "Diện tích vùng lõi (ha)",
        value: "<Đang cập nhật>",
        level: 1,
        isItalic: true,
      },
      { label: "Hình ảnh sưu tập", value: "<Đang cập nhật>", level: 0 },
      { label: "Tình trạng quy hoạch", value: "Chuyển tiếp", level: 0 },
    ],
  }: Props = $props();
</script>

<div class="flex flex-col w-full bg-transparent font-sans text-black">
  <!-- Main Title -->
  <h1
    class="text-center uppercase font-bold text-[#005A2B] text-2xl py-6 tracking-wide"
  >
    {mainTitle}
  </h1>

  <!-- Section Header -->
  <div class="flex items-center h-[40px]">
    <div class="flex items-center h-full bg-[#005A2B] pl-4 pr-2 text-white">
      <LayoutGrid class="w-5 h-5 mr-2" />
      <span class="font-bold text-[14px] whitespace-nowrap">{sectionTitle}</span
      >
    </div>
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      class="flex-shrink-0"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0 L40 40 H0 Z" fill="#005A2B" />
    </svg>
  </div>

  <!-- Table Container -->
  <div class="w-full border-t-2 border-[#005A2B]">
    {#each rows as row, i}
      <div 
        class="flex min-h-[36px] border-b border-[#dddddd] transition-colors hover:bg-gray-100
               {i % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'}"
      >
        <!-- Label Cell (30%) -->
        <div 
          class="w-[30%] px-4 py-1.5 border-r border-[#dddddd] flex items-center shrink-0"
        >
          {#if row.level && row.level > 0}
            <CornerDownRight class="w-3.5 h-3.5 mr-2 text-gray-400 shrink-0 mb-0.5" />
          {/if}
          <span class="text-[14px] leading-snug {row.level === 0 ? 'font-bold' : 'font-normal text-gray-700'} {row.isItalic ? 'italic' : ''}">
            {row.label}
          </span>
        </div>

        <!-- Value Cell (70%) -->
        <div class="w-[70%] px-4 py-1.5 flex items-center">
          <span class="text-[14px] leading-relaxed break-words whitespace-pre-wrap">
            {row.value}
          </span>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  :global(.font-sans) {
    font-family:
      "Inter",
      system-ui,
      -apple-system,
      sans-serif;
  }
</style>
