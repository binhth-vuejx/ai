# SDD Specification: table_simple Component

**Phase:** Implement
**Status:** Approved
**Design Reference:** Bỏ qua Pen - Chuyển sang Tailwind CSS dựa trên `Screenshot 2026-03-19 at 05.11.41.png`

---

## 1. Phase: Specify (`/specify`)

### 1.1 Goal
Cung cấp component bảng dữ liệu phức hợp (Complex Table) hiển thị danh sách khu bảo tồn với độ hoàn thiện cực cao (Pixel-Perfect). Tích hợp Toolbar (Tab xanh, Search, Action Buttons) và Footer phân trang chuyên sâu.

### 1.2 User Stories
- **As a User:** Tôi muốn thanh công cụ có điểm nhấn màu xanh nổi bật để nhận diện bộ lọc.
- **As a User:** Tôi muốn các cột trong bảng được phân tách bằng đường kẻ dọc rõ ràng để dễ theo dõi dữ liệu chéo.
- **As a User:** Tôi muốn cụm phân trang đầy đủ các nút First, Prev, Next, Last kèm tùy chọn hiển thị.

### 1.3 Acceptance Criteria (Dựa trên ảnh)
- **Toolbar:** Có Tab "Khu bảo tồn... Tổng số: 190" màu nền xanh `#005A2B` (xanh lục đậm), hình thang vát góc phải.
- **Bảng:** Header text màu xanh lá `#005A2B`, in đậm, căn giữa. Dòng kẻ (border) mảnh màu `#E5E7EB`.
- **Dữ liệu:** Text đen nhạt, STT và Thao tác căn giữa, text căn trái, số liệu căn phải.
- **Phân trang:** Nút mũi tên vuông vức, hiển thị tổng số ở giữa.

---

## 2. Phase: Plan (`/plan`)

### 2.1 Visual Style (Mã màu chính xác từ ảnh)

| Element | Property | Value (Tailwind/Hex) |
| :--- | :--- | :--- |
| **Primary Color** | Nền Tab, Nút, Text Header | `#005A2B` (Xanh lục đậm, không phải xanh nhạt) |
| **Borders** | Phân cách cột, dòng | `border-slate-200` (`#E5E7EB`) |
| **Toolbar Bg** | Nền thanh tìm kiếm | `bg-[#F5F5F5]` |
| **Row Hover** | Nền dòng dữ liệu | `hover:bg-slate-50` |

### 2.2 Table Layout Architecture
- `border-collapse` để đảm bảo các nét kẻ dọc (`border-r`) và ngang (`border-b`) hòa làm một.
- Column widths: `w-[60px]` (STT), `w-auto` (Tên), `w-[220px]` (Loại hình), `w-[180px]` (Tỉnh thành), `w-[220px]` (Cấp di sản), `w-[160px]` (Diện tích), `w-[100px]` (Thao tác).

---

## 3. Phase: Tasks (`/tasks`)

1. [x] Đánh giá lại sai sót trong thiết kế Pen.
2. [x] Chốt mã màu chuẩn từ ảnh (`#005A2B`).
3. [x] Triển khai mã nguồn Svelte `table_simple/index.svelte` với Tailwind CSS Pixel-Perfect.
4. [ ] Kiểm tra thực tế trên trình duyệt.

---

## 4. Phase: Implement
Mã nguồn đang được viết tại `index.svelte`.
