# Spec-Kit: aggs_menu Component

## 1. Phase: Specify
- **Goal:** Tạo một menu điều hướng dọc (sidebar/aggs_menu) linh hoạt (fluid width), tiêu đề vát chéo tự động co giãn theo nội dung chữ, và danh sách các mục hỗ trợ xuống dòng.
- **User Stories:**
  - Là một người dùng, tôi muốn thấy tiêu đề tự động mở rộng theo độ dài chữ mà không bị đè lên nút Back.
  - Là một người dùng, tôi muốn component chiếm trọn chiều ngang của vùng chứa nó (100% width).
  - Là một người dùng, tôi muốn tiêu đề và nút Back nằm cân đối chính giữa phần dải màu xanh (bao gồm cả đường viền xanh dưới cùng).
- **Acceptance Criteria:**
  - [x] Header tổng cao **40px** (bao gồm dải tiêu đề 36px và đường viền xanh 4px ở dưới).
  - [x] Khối xanh tiêu đề tự động co giãn theo chữ, có góc vát chéo bằng SVG khít với đường viền.
  - [x] Tiêu đề chữ trắng và nút Back được căn giữa theo chiều dọc của tổng 40px.
  - [x] Nút Back nằm cách biên phải, được đẩy lên nhẹ để không dính vào đường viền 4px.
  - [x] Danh sách mục menu có độ rộng 100%, viền màu **#dddddd**.
  - [x] Các mục menu cao tối thiểu **40px**, hỗ trợ xuống dòng tự động (`text-wrap`).
  - [x] Container tổng trong suốt, không có đổ bóng.

## 2. Phase: Plan
- **Component Contract (Props):**
  - `title`: string (mặc định: "THÔNG TIN DI SẢN")
  - `items`: Array<{ label: string, href: string, active?: boolean }>
  - `onBack`: () => void
- **Visual Logic (Mapping Design -> Code):**
  - **Root Container:** `w-full` (100% width), `bg-transparent`, `shadow-none`.
  - **Header Layout:** `relative flex h-[40px] items-center justify-between`.
  - **Dynamic Header BG:** 
    - Lớp nền (absolute): Gồm dải xanh `h-[36px]` (chiều rộng auto theo chữ) nối với SVG tam giác vát `40x36px`.
    - Đường viền xanh dưới: `w-full h-[4px] bg-[#005A2B]`.
  - **Header Content:** `relative z-10`, tiêu đề dùng `truncate` để bảo vệ layout, nút Back dùng `mb-1` để căn chỉnh thị giác cao hơn border.
  - **Menu Item:** 
    - `padding: 0 16px` (`px-4 py-0`), `bg-white`.
    - `min-height: 40px`, `height: fit-content` kết hợp `text-wrap`.
    - `border-x: 1px solid #dddddd`, `border-b: 1px solid #dddddd`.
    - `Active`: `bg-[#FFF9E5]`, `font-medium`.
    - `Hover`: `bg-gray-50`.

## 3. Phase: Tasks
- [x] Bước 1: Thiết kế Pen 1:1 (`aggs_menu.lib.pen`) - Đảm bảo Pixel-Perfect.
- [x] Bước 2: Chụp ảnh screenshot gửi duyệt thiết kế.
- [x] Bước 3: Triển khai code Svelte 5 (`index.svelte`) sử dụng Runes.
- [x] Bước 4: Tích hợp vào `App.svelte` để kiểm tra.

## 4. Phase: Implement
*Ghi chú: Đã triển khai hoàn tất với cấu trúc Flexbox động cho Header và Fluid Width cho container.*

**Design Reference:**
- File: `src/lib/components/aggs_menu/aggs_menu.lib.pen`
- Root Node ID: `rUoOI`
- Theme: Light Mode
- Font: Sans-serif (Inter/System-ui)
