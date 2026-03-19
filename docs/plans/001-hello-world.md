# 001 - Hello World API

**Status:** DONE
**Created:** 2026-03-16
**Updated:** 2026-03-16

## Requirement

Thêm API hello world với tên người dùng

## Solution

```typescript
hello: publicProcedure
  .input(z.object({ name: z.string().optional() }))
  .query(({ input }) => {
    return { message: `Hello, ${input.name || 'World'}!` };
  })
```

## Tasks

- [x] Add hello procedure to router.ts
- [x] Test endpoint

## Test Command

```bash
# With name
curl "http://localhost:3000/trpc/hello?input=%7B%22name%22%3A%22Binh%22%7D"

# Without name
curl "http://localhost:3000/trpc/hello?input=%7B%7D"
```

## Notes

- Dùng zod cho input validation
- Endpoint: `/trpc/hello`
- TRPC fetch adapter yêu cầu input dạng JSON encoded trong query param
