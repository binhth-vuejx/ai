# Spec-Kit: table_view Component

## 1. Phase: Specify
- **Goal:** Tạo một bảng hiển thị thông tin chi tiết (Info Table) với cấu trúc phân cấp, có tiêu đề chính và tiêu đề phụ vát chéo.
- **User Stories:**
  - Là một người dùng, tôi muốn thấy tiêu đề trang nổi bật màu xanh lục ở trên cùng.
  - Là một người dùng, tôi muốn thấy tiêu đề phân đoạn "Thông tin chung" có icon và góc vát chéo.
  - Là một người dùng, tôi muốn các thông tin được trình bày theo dạng Bảng (Label | Value).
  - Là một người dùng, tôi muốn các mục con (sub-items) được thụt lề để dễ phân biệt cấp bậc.
  - Là một người dùng, tôi muốn các dòng có màu nền xen kẽ để dễ đọc.
- **Acceptance Criteria:**
  - [ ] Tiêu đề chính: Căn giữa, chữ in hoa, màu xanh lục `#005A2B`, font-bold.
  - [ ] Tiêu đề phân đoạn: Nền xanh lục `#005A2B`, chữ trắng, có icon `layout-grid`, góc vát chéo bên phải.
  - [ ] Cấu trúc bảng: 2 cột (Cột Label ~30%, Cột Value ~70%).
  - [ ] Màu sắc:
    - Border trên của bảng: Dày ~2px, màu xanh lục `#005A2B`.
    - Dòng chẵn/lẻ: Xen kẽ trắng (`#FFFFFF`) và xám cực nhạt (`#F9FAFB`).
    - Chữ Label: Bold, màu đen.
    - Chữ Value: Normal, màu đen.
  - [ ] Phân cấp: Các mục con (như "Tên văn bản" dưới "Văn bản thành lập") thụt lề trái ~20px, font-style italic cho label nếu cần.
  - [ ] Responsive: Chiều rộng 100% container.

## 2. Phase: Plan
- **Component Contract (Props):**
  - `mainTitle`: string (vd: "KHU BẢO TỒN BIỂN BẠCH LONG VĨ")
  - `sectionTitle`: string (vd: "Thông tin chung")
  - `rows`: Array<{ label: string, value: any, level?: number, isItalic?: boolean }>
- **Visual Logic (Mapping Design -> Code):**
  - **Main Title:** `text-center uppercase font-bold text-[#005A2B] text-xl py-4`.
  - **Section Header:** Flexbox ngang, `bg-[#005A2B]`, `clip-path` hoặc SVG cho góc vát.
  - **Table Container:** `w-full border-t-2 border-[#005A2B]`.
  - **Row:** `flex border-b border-[#dddddd] text-[14px] font-sans` (sử dụng Inter).
  - **Label Cell:** `w-1/3 px-4 py-1.5 font-bold bg-inherit border-r border-[#dddddd]`. Các dòng con (level > 0) sử dụng icon `CornerDownRight` để phân cấp thay vì thụt lề.
  - **Value Cell:** `w-2/3 px-4 py-1.5 bg-inherit`.
  - **Min-height:** `36px` cho mỗi dòng.

## 3. Phase: Tasks
- [x] Bước 1: Thiết kế Pen 1:1 (`table_view.lib.pen`) - Đảm bảo Pixel-Perfect.
- [x] Bước 2: Chụp ảnh screenshot gửi duyệt thiết kế.
- [x] Bước 3: Triển khai code Svelte 5 (`index.svelte`) sử dụng Runes.
- [x] Bước 4: Tích hợp vào `App.svelte` để kiểm tra.

## 4. Phase: Implement
*Ghi chú: Đã triển khai hoàn tất với cỡ chữ 14px cho toàn bộ bảng.*

**Design Reference:**
- File: `src/lib/components/table_view/table_view.lib.pen`
- Root Node ID: `LXGCr`
- Theme: Light Mode
- Font: Inter (14px)
