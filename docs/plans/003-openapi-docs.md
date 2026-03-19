# 003 - OpenAPI Documentation

**Status:** DONE
**Created:** 2026-03-16
**Updated:** 2026-03-16

## Requirement

Tạo documentation để agents có thể hiểu và sử dụng TRPC API

## Solution

1. Tạo `openapi.json` - OpenAPI 3.0 specification
2. Tạo `docs/TRPC.md` - Hướng dẫn sử dụng chi tiết
3. Thêm Swagger UI vào server

## Completed Tasks

- [x] Create OpenAPI specification
- [x] Add Swagger UI endpoint (/docs)
- [x] Create TRPC usage documentation

## Files Created/Modified

- `openapi.json` - OpenAPI spec
- `docs/TRPC.md` - API documentation
- `index.ts` - Updated to serve OpenAPI and Swagger UI

## Notes

- Swagger UI: http://localhost:3000/docs
- OpenAPI JSON: http://localhost:3000/openapi.json
- trpc-openapi package (community version) không tương thích với tRPC v11, nên tạo manual OpenAPI spec
