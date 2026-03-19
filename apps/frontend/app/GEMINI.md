# PROJECT MANDATES (QUY ĐỊNH BẮT BUỘC)

File này chứa các chỉ thị tối cao cho mọi Agent khi làm việc trong dự án này. Bất kỳ hành động nào vi phạm các quy định dưới đây đều bị coi là lỗi nghiêm trọng.

## 1. Quy trình Xây dựng Component (SDD Workflow)
Mọi yêu cầu tạo mới hoặc chỉnh sửa component UI đều phải tuân thủ tuyệt đối quy trình **Spec-Driven Development (SDD)** được đặc tả tại:
`design/skills/svelte-component-builder/SKILL.md`

### Các nguyên tắc không được vi phạm:
1. **Cấu trúc Thư mục Độc lập:** Mỗi component phải nằm trong thư mục riêng tại `src/lib/components/[name]/` và chứa đủ 3 file: `index.md` (SPECS), `index.svelte` (Code), `[name].lib.pen` (Design).
2. **Thứ tự thực hiện:** 
   - **BƯỚC 1:** Viết đặc tả SDD (`index.md`) -> Báo cáo.
   - **BƯỚC 2:** Thiết kế Pen 1:1 (`.lib.pen`) -> Gửi screenshot -> Chờ người dùng duyệt.
   - **BƯỚC 3:** Triển khai code Svelte (`index.svelte`) **CHỈ KHI** có lệnh "OK thiết kế" hoặc "Làm code đi" từ người dùng.
3. **Ưu tiên Shadcn UI:** Phải sử dụng Shadcn UI làm nền tảng cho cả thiết kế Pen và mã nguồn Svelte để đảm bảo tính sẵn dùng.
4. **Độc lập Thiết kế:** Chỉ được đọc và tham chiếu file `.lib.pen` trong chính thư mục của component đó. Tuyệt đối không đọc nhầm tệp thiết kế khác.

## 2. Tiêu chuẩn Thẩm mỹ (Pixel-Perfect)
- Thiết kế phải khớp 1:1 với hình ảnh cung cấp (Padding, Gap, Font-size, Border).
- Màu sắc phải sử dụng chính xác mã HEX bóc tách từ ảnh (vd: Xanh lục đậm `#005A2B`).
- Mọi lề lối (Alignment) trong bảng phải đồng nhất và cân đối.

---
*Mọi Agent bắt buộc phải xác nhận đã đọc và hiểu các quy tắc này trước khi bắt đầu nhiệm vụ.*
