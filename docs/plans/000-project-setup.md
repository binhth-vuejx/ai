# 000 - Project Setup

**Status:** DONE
**Created:** 2026-03-16
**Updated:** 2026-03-16

## Requirement

Tạo project BunJS + TRPC với health check endpoint

## Solution

1. Initialize BunJS project: `bun init -y`
2. Install dependencies: `bun add @trpc/server zod`
3. Create router với health check
4. Create server entry point với Bun.serve()

## Completed Tasks

- [x] Initialize BunJS project
- [x] Install TRPC dependencies
- [x] Create TRPC router with health check
- [x] Create server entry point
- [x] Add PORT environment variable support
- [x] Add dev and start scripts

## Files Created

- `router.ts` - TRPC router
- `index.ts` - Server entry point
- `package.json` - với scripts

## Notes

- Bun version: 1.3.10
- TRPC version: 11.13.4
- Port: 3000 (có thể đổi qua env PORT)
