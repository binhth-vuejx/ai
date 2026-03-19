# Walkthrough: aggs_left Component (ProvincePicker_Custom)

Tài liệu này hướng dẫn chi tiết về Component `aggs_left` (Province Picker Custom) trong file `vuejx.pen`.

## 1. Thông tin chung
- **Node ID:** `l:MO3cS`
- **Tên Component:** `aggs_left`
- **Vị trí trong Pen:** `design/vuejx.pen` -> `Frame 1` (`l:TzgK6`)
- **Đặc điểm:** 
  - Layout: `vertical`
  - Sizing: Rộng tự động theo vùng chứa, cao tự động theo nội dung.
  - Bo góc: `8px`.
  - Clip Content: `true`.

## 2. Thông số thiết kế chuẩn (Pixel Perfect)

### A. Header (`l:O6ENC`)
- **Layout:** `horizontal`, `justifyContent: space_between`, `alignItems: end`.
- **Border Bottom:** `2px`, màu `#2E6238` (Xanh lá đậm).
- **Tab (Green Tab):** 
  - Nền: `#2E6238`.
  - Padding: `0 4px 0 8px`.
  - Text: "Tỉnh/Thành phố" (Trắng, Font: Inter, 16px).
- **Header Buttons:**
  - 2 Nút (Search, Collapse): 36x26px, nền trắng, border `#CBCCC9`.
  - Icon: `lucide/search` và `lucide/chevron-up`.

### B. List Container (`l:Ixbgy`)
- **Layout:** `vertical`.
- **Border:** `1px`, màu `#cbccc9` (Trái, Phải, Trên).
- **Padding:** `1px 1px 0 1px`.
- **Row Item:**
  - Kích thước: Rộng `fill_container`, Cao `40px`.
  - Padding: `8px`.
  - Gap giữa checkbox và text: `12px`.
  - **Màu nền:** 
    - Default: `#FFFFFF`.
    - Selected: `#FFFBE6` (Vàng nhạt).
  - **Checkbox:** 20x20px, bo góc 4px.
  - **Badge:** Nền `#E6F0FF`, Text `#003366`, Border `#003366`.

### C. Footer (`l:n4TJm`)
- **Layout:** `horizontal`, `justifyContent: space_between`, `alignItems: center`.
- **Border:** `1px`, màu `#cbccc9` (Trái, Phải, Dưới).
- **Bo góc dưới:** `8px` (để khớp với container chính).
- **Padding:** `12px 8px 13px 8px`.
- **Navigation:**
  - Prev/Next Buttons: 36x26px, nền `#F5F5F5`, border `#CBCCC9`.
  - Text: "Trang 1 / 7" (Font: Inter, 16px).

## 3. Các trạng thái (States)
- **Checkbox Default:** Nền trắng, border xám.
- **Checkbox Selected:** Nền `#2E6238`, border xanh lá, có dấu tích trắng.
- **Row Hover/Active:** Thay đổi màu nền sang vàng nhạt `#FFFBE6`.

## 4. Logic & Interaction (Svelte 5)

### A. Quản lý trạng thái (Reactivity)
- **Selection Logic:** Sử dụng Runes `$state<string[]>(selectedIds)` để quản lý danh sách ID tỉnh thành đang chọn. Cho phép chọn nhiều (Multiple Selection).
- **Active State:** Tự động đổi màu nền hàng sang vàng nhạt `#FFFBE6` và checkbox sang xanh lá `#2E6238` khi ID có trong danh sách chọn.
- **Validation:** không có.

### B. Tương tác & Phân trang
- **Pagination Logic:**
  - Nút `Prev` tự động vô hiệu hóa (`disabled`) khi ở trang 1.
  - Nút `Next` vô hiệu hóa khi ở trang cuối cùng.
- **Search Logic:** Khi tìm kiếm không có kết quả, hiển thị giao diện Trống (Empty State) theo thiết kế.

### C. Dữ liệu & API
- **Endpoint:** `trpc.province.list` (tRPC).
- **Request Params:** `page`, `limit`, `search`.
- **Lưu ý render:** Luôn thiết lập `stroke-align: inside` cho các đường viền trong mã nguồn Svelte để đảm bảo hiển thị đúng như thiết kế 1:1.

---
*Tài liệu này được tạo tự động bởi Gemini CLI.*
