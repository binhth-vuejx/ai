# 004 - Test Workflow - Add getServerTime

**Status:** DONE
**Created:** 2026-03-16
**Updated:** 2026-03-16

## Requirement

Test workflow bằng cách thêm một TRPC procedure mới

## Solution

Thêm `getServerTime` procedure vào router

## Completed Tasks

- [x] Add getServerTime procedure to router.ts
- [x] Test API
- [x] Commit changes
- [x] Update PLAN.md

## Test Result

```bash
curl "http://localhost:3001/trpc/getServerTime?input=%7B%7D"
# Response: {"result":{"data":{"iso":"2026-03-16T06:13:33.658Z","unix":1773641613658,"timezone":"Asia/Saigon"}}}
```

## Notes

- Workflow hoạt động đúng:
  1. Thêm procedure vào packages/trpc-types/service1/src/router.ts
  2. Restart backend để test
  3. Frontend tự động có types
