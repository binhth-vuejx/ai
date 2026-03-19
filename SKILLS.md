# SKILLS - Quy trình làm việc

## 1. Trước khi bắt đầu
1. Đọc `CLAUDE.md` - Hiểu quy ước project
2. Đọc `docs/PLAN.md` - Biết task hiện tại

## 2. Trong quá trình làm
- Sửa code
- Test locally trước khi commit
- Update `docs/PLAN.md` khi task hoàn thành

## 3. Sau khi hoàn thành task
1. Stage và commit với message mô tả
2. Update `docs/PLAN.md` - chuyển task từ Active sang Completed
3. Tạo plan mới trong `docs/plans/` nếu cần

---

## Commands

### Development (HOT RELOAD)
```bash
bun run dev:all        # Chạy tất cả (backend + frontend)
bun run dev:backend     # Chỉ backend (port 3001)
bun run dev:app         # Chỉ frontend (port 3000)
bun run dev:reload      # Backend với auto-reload
```

### Build
```bash
bun run build:packages   # Build package (dist)
bun run build:service1  # Build backend
bun run build:app       # Build frontend
```

---

## Cấu trúc Project

```
vibe-kanban/
├── apps/
│   ├── backend/service1/   # TRPC server
│   └── frontend/app/       # Vue app
├── packages/
│   └── trpc-types/service1/  # Router definitions
└── docs/
    ├── PLAN.md            # Danh sách plans
    └── plans/             # Chi tiết từng plan
```

---

## Thêm API mới

1. Thêm procedure vào `packages/trpc-types/service1/src/router.ts`
2. Restart backend: `bun run dev:backend` (tự hot reload)
3. Frontend tự import types qua package
4. Dùng trong frontend:
```typescript
import { client } from './utils/trpc';
await client.newProcedure.query();
```

---

## Lưu ý

- **DEV mode**: Backend và Frontend đều HOT RELOAD
- **Package**: 
  - Nếu có `dist` → dùng từ `dist` (đã build)
  - Nếu không có `dist` → dùng từ workspace source
- **Sửa router**: Build lại package rồi restart backend ( nếu không tự RELOAD thì cần restart lại )
