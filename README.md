# 🧑‍🍳 Odyssey Restaurant Operations Dashboard

A fullstack restaurant operations system built with a strict contract-first architecture using **Turborepo, Expo, Hono, Drizzle ORM, and Orval-generated API clients**.

This project demonstrates a production-grade approach to building scalable fullstack systems with strong type safety, clean architecture, and reusable design systems.

---

# 📦 Tech Stack

### Monorepo

* pnpm workspaces
* Turborepo

### Frontend

* Expo (React Native + Web)
* React Query
* Orval-generated API hooks
* Shared design system

### Backend

* Hono (Cloudflare Workers)
* PostgreSQL
* Drizzle ORM
* drizzle-zod
* OpenAPI generation

### Contract & Types

* OpenAPI-first design
* Orval client generation
* Shared types package

---

# 🏗️ Repository Structure

```
apps/
  dashboard/        # Expo React Native + Web dashboard

services/
  backend/          # Hono API on Cloudflare Workers

packages/
  shared/           # UI primitives, utils, design system
  types/            # shared domain types
  api-client/       # Orval generated API hooks
```

---

# 🚀 Getting Started

## 1. Install dependencies

```bash
pnpm install
```

---

## 2. Run backend

```bash
pnpm dev:backend
```

Runs Hono API on Cloudflare Workers local environment.

---

## 3. Run dashboard

```bash
pnpm dev:dashboard
```

Runs Expo Web dashboard.

---

## 4. Generate API contracts

```bash
pnpm gen:contract
```

Generates:

* OpenAPI spec
* Orval API client
* Typed hooks for frontend

---

## 5. Lint / Typecheck / Test

```bash
pnpm lint
pnpm typecheck
pnpm test
```

---

# 🌱 Seed Data

To bootstrap the system:

```bash
pnpm seed
```

Seeds:

* Menu categories & items
* Customers with order history
* Orders with different statuses
* Business settings

---

# 🧠 Architecture Overview

This project follows a strict **contract-first fullstack architecture**:

```
Drizzle Schema
    ↓
drizle-zod validation layer
    ↓
Hono OpenAPI routes
    ↓
OpenAPI contract generation
    ↓
Orval client + hooks
    ↓
React Query frontend consumption
```

---

## 🔐 Key Principles

* Database schema is the **source of truth**
* API contracts are **generated, not handwritten**
* Frontend never defines backend DTOs manually
* All API calls use **generated hooks**
* Business logic lives in backend + services, not UI
* UI remains purely presentational where possible

---

# 🎨 Design System

A fully reusable design system is implemented in `packages/shared`.

## Design Tokens

### Colors

* Background
* Surface
* Primary
* Secondary
* Success / Warning / Error
* Muted / Border

### Typography

* Display
* Heading
* Body
* Caption

### Spacing

* 4px base scale
* 8 / 12 / 16 / 24 / 32 / 48

### UI Rules

* consistent radius scale
* elevation shadows
* semantic states (hover, active, disabled)

---

## 🧩 UI Primitives

* Button
* Input
* Select / Dropdown
* Modal / Dialog
* Card
* Table / List
* Badge / Status pill
* Navigation sidebar
* Toast / Notifications
* Skeleton loaders

---

# 📊 Dashboard Pages

## 1. Home

* Total orders
* Revenue
* Pending orders
* Popular items

## 2. Orders

* Order list
* Filters (status, date)
* Order detail view
* Status transitions (server-controlled)

## 3. CRM

* Customer list
* Order count
* Spend per customer
* Recent orders

## 4. Menu

* Categories
* Menu items
* Price + availability
* Create / edit menu items via modal

## 5. Settings

* Prep time
* Auto-accept orders
* Accepting orders toggle
* Opening hours
* Save via PUT `/settings`

---

# ⚙️ Backend System

Built using **Hono + Drizzle ORM + PostgreSQL**

## Core Entities

### Menu

* categories
* items
* availability rules

### Orders

* order items
* status lifecycle (STRICT transitions)
* server-side total validation
* rejection of unavailable items

### Customers

* order history
* total spend aggregation

### Settings

* prep time
* auto accept
* opening hours
* ordering availability

---

## 🔒 Backend Rules

* Order totals are calculated server-side
* Invalid items are rejected
* Order status transitions are validated
* No client-controlled state mutation
* Strong request validation via drizzle-zod

---

# 🔄 Order Lifecycle

```
PENDING → ACCEPTED → PREPARING → COMPLETED
PENDING → CANCELLED
```

Invalid transitions are rejected by backend.

---

# 📡 API Contract Flow

```
Drizzle Schema → drizzle-zod → OpenAPI → Orval → React Query hooks
```

No manual duplication of types across frontend/backend.

---

# 🧪 Testing Strategy

## Backend Tests

* order creation validation
* invalid menu item rejection
* order state transition rules
* total calculation correctness

## Frontend Tests

* component rendering states
* loading / error UI handling
* key interaction flows

---

# 🧰 Scripts

```bash
pnpm dev:dashboard
pnpm dev:backend
pnpm gen:contract
pnpm lint
pnpm typecheck
pnpm test
pnpm seed
```

---

# 📱 UX Expectations

* smooth loading states
* skeleton UI for tables/cards
* empty states with guidance
* error boundaries for API failures
* modals for create/edit flows
* responsive layout (web-first)

---

# ⚖️ Tradeoffs / Notes

* Focused on contract correctness over UI complexity
* Minimal external UI libraries to keep design system controlled
* Some advanced analytics intentionally left out due to time scope
* Web-first implementation; native parity is secondary

---

# 🧠 Key Engineering Decisions

* Contract-first architecture ensures zero type drift
* Orval prevents manual API coupling
* Drizzle chosen for schema-first backend modeling
* Hono used for lightweight, fast API layer
* React Query used for caching + sync layer
* Design system centralized for scalability

---

# 🏁 Summary

This project demonstrates:

* production-grade fullstack architecture
* strict type safety across stack
* clean separation of concerns
* reusable UI system design
* backend-driven business logic
* scalable API contract pipeline
