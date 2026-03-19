---
name: svelte-component-builder
description: Chuyên gia xây dựng component Svelte 5 dựa trên phương pháp Spec-Driven Development (SDD). Bắt buộc tuân thủ quy trình 4 pha (Specify -> Plan -> Tasks -> Implement) và cấu trúc thư mục độc lập cho từng component.
---

# Quy trình xây dựng Component Svelte 5 chuẩn SDD & Pixel-Perfect

Kỹ năng này định nghĩa quy trình BẮT BUỘC để xây dựng bất kỳ component UI nào trong dự án, đảm bảo tính minh bạch, độc lập và độ chính xác 1:1 so với thiết kế.

## 1. Quy hoạch thư mục Độc lập (Mandatory Structure)
Mỗi component MỚI bắt buộc phải được đóng gói trong một thư mục riêng biệt tại `src/lib/components/[tên_component]/`. Tuyệt đối không để file trôi nổi.

Cấu trúc bắt buộc bên trong thư mục `[tên_component]`:
```text
src/lib/components/[tên_component]/
├── [tên_component].lib.pen  # (1) File thiết kế gốc bằng Pencil
├── index.md                 # (2) Tài liệu đặc tả SDD (Spec-Kit)
└── index.svelte             # (3) Mã nguồn Svelte 5
```

## 2. Quy trình Spec-Driven Development (SDD Workflow)

Agent **BẮT BUỘC BÁO CÁO VÀ XIN PHÉP** người dùng khi chuyển giao giữa các bước. Không được tự ý nhảy cóc từ yêu cầu sang viết code.

### Bước 1: Viết đặc tả SDD (`index.md`)
- Phân tích hình ảnh/yêu cầu và tạo ngay file `index.md` theo chuẩn Spec-Kit gồm 4 phần:
  1. `Phase: Specify`: Goal, User Stories, Acceptance Criteria.
  2. `Phase: Plan`: Component Contract (Props/State), Visual Logic (Mapping Design -> Code).
  3. `Phase: Tasks`: Danh sách các đầu việc checkbox `[ ]`.
  4. `Phase: Implement`: Ghi rõ "Chỉ thực hiện khi có yêu cầu chuyển đổi từ file .pen".

### Bước 2: Thiết kế Pixel-Perfect (`[tên_component].lib.pen`)
- **Tệp thiết kế Độc lập (Critical):** Bắt buộc tạo và sử dụng duy nhất tệp `.lib.pen` nằm trong thư mục của chính component đó (ví dụ: `src/lib/components/table_simple/table_simple.lib.pen`).
- **Phạm vi tham chiếu:** Tuyệt đối KHÔNG đọc hoặc sử dụng thông số từ các tệp `.pen` khác ngoài thư mục của component đang thực hiện. Việc này nhằm đảm bảo Agent không bị nhầm lẫn giữa các phiên bản thiết kế khác nhau.
- Vẽ thiết kế 1:1 dựa trên thông số đã chốt trong `index.md`.
- Sử dụng cấu trúc lồng nhau (Nested Frames/Flexbox) rõ ràng, tuyệt đối không dùng Absolute Positioning bừa bãi gây sập layout.
- Sau khi thiết kế xong, dùng công cụ `get_screenshot` gửi ảnh cho người dùng duyệt.
- Cập nhật ID của bản thiết kế vào mục `Design Reference` trong `index.md`.

### Bước 3: Triển khai Code Svelte (`index.svelte`)
**Tín hiệu kích hoạt (Trigger):** CHỈ BẮT ĐẦU KHI người dùng xác nhận "OK thiết kế" hoặc yêu cầu "Triển khai code".
- Viết mã Svelte 5 (sử dụng Runes `$props`, `$state`).
- Áp dụng Tailwind CSS theo đúng các thông số Pixel-Perfect (Hex colors, padding, gap) đã ghi trong `index.md`.
- Tích hợp Shadcn-svelte nếu cần, nhưng BẮT BUỘC ghi đè (override) margin/padding mặc định để giống thiết kế 100%.

### Bước 4: Đóng gói và Kiểm tra
- Tích hợp component vào `src/App.svelte` (bằng cách khai báo router `#/[tên_component]`).
- Đánh dấu hoàn thành `[x]` tất cả các task trong `index.md`.

## 3. Tiêu chuẩn Mã nguồn & Thiết kế
- **Ưu tiên Shadcn UI (Critical):** Luôn luôn ưu tiên sử dụng các thành phần từ thư viện **Shadcn UI** (như Button, Table, Checkbox, Pagination, v.v.) cho cả bản thiết kế trên Pen và mã nguồn Svelte. Việc này đảm bảo code sinh ra là "dùng được luôn" và đồng bộ với hệ thống UI của dự án.
- **Màu sắc & Theme:** Cưỡng bức Light Mode nếu cần (vd: `color-scheme: light`). Tuân thủ nghiêm ngặt mã màu HEX đã bóc tách từ ảnh.
- **Biểu tượng:** Sử dụng `lucide-svelte` (Code) và `icon_font` (trong thiết kế Pen).
- **Trạng thái:** Bắt buộc thiết kế và lập trình đầy đủ các trạng thái `Default`, `Hover`, `Active/Selected`.
