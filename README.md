# High-Scale Laravel + React (Inertia v3) Architecture

An enterprise-grade Laravel 11/13 + React 19 application built with Inertia.js v3, Tailwind CSS v4, and Wayfinder, architected to scale reliably to **10 million+ users**.

---

## 1. Architecture Overview

To achieve sub-50ms response times, zero N+1 bottlenecks, and seamless developer velocity across large teams, the project adheres to two structural paradigms:
1. **Backend**: Domain-Driven Modular Monolith (Action-Domain-Responder pattern).
2. **Frontend**: Feature-Sliced Architecture with strict 3-tier component hierarchy.

```
                              [ Cloudflare / Edge CDN ]
                                          │
                                          ▼
                             [ Nginx / Load Balancer ]
                                          │
                  ┌───────────────────────┴───────────────────────┐
                  ▼                                               ▼
     [ Laravel App Node 1 ]                          [ Laravel App Node N ]
       (PHP 8.4 + Octane)                              (PHP 8.4 + Octane)
                  │                                               │
       ┌──────────┴──────────┐                         ┌──────────┴──────────┐
       ▼                     ▼                         ▼                     ▼
[ Redis Cluster ]    [ Horizon Queue ]          [ Redis Cluster ]    [ Horizon Queue ]
 (Cache/Session)       (Async Jobs)              (Cache/Session)       (Async Jobs)
       │                                               │
       └───────────────────────┬───────────────────────┘
                               │
                 ┌─────────────┴─────────────┐
                 ▼                           ▼
        [ Primary DB (Write) ]      [ Read Replicas (Pool) ]
```

---

## 2. Project Folder Structure

### 2.1 Backend: Domain-Driven Modular Monolith (`app/`)

Core business logic is encapsulated within self-contained **Domains**, while `app/Http/` acts purely as an HTTP transport layer.

```
app/
├── Domains/                              # Core Business Logic by Domain
│   ├── Catalog/                          # Products & Categories Domain
│   │   ├── Actions/                      # Single-responsibility use cases
│   │   │   ├── ListProductsAction.php
│   │   │   └── GetProductDetailsAction.php
│   │   ├── Data/                         # Typed Data Transfer Objects (DTOs)
│   │   │   ├── ProductData.php
│   │   │   └── ProductFilterData.php
│   │   ├── Events/                       # Asynchronous domain events
│   │   │   └── ProductViewed.php
│   │   ├── Models/                       # Eloquent Models
│   │   │   ├── Product.php
│   │   │   └── Category.php
│   │   ├── Queries/                      # High-performance DB queries (Keyset/Replica)
│   │   │   └── ProductSearchQuery.php
│   │   └── Services/                     # Multi-action domain orchestrators
│   │
│   ├── Identity/                         # Users, Auth, Passkeys & 2FA Domain
│   │   ├── Actions/
│   │   ├── Data/
│   │   ├── Models/
│   │   └── Queries/
│   │
│   └── Cart/                             # Cart & Checkout Domain
│       ├── Actions/
│       ├── Data/
│       └── Models/
│
├── Http/                                 # HTTP Transport Layer
│   ├── Controllers/                      # Thin controllers delegating to Actions/Queries
│   │   ├── Controller.php
│   │   ├── Catalog/
│   │   │   └── ProductController.php
│   │   ├── Identity/
│   │   └── Cart/
│   ├── Requests/                         # Form Requests (Strict authorization & validation)
│   │   ├── Catalog/
│   │   └── Identity/
│   ├── Resources/                        # Inertia / API JSON transformers (Lean payloads)
│   │   ├── Catalog/
│   │   │   ├── ProductSummaryResource.php
│   │   │   └── ProductDetailResource.php
│   │   └── Identity/
│   └── Middleware/                       # Inertia sharing, Appearance, Rate limiting
│       ├── HandleAppearance.php
│       └── HandleInertiaRequests.php
│
└── Support/                              # Shared cross-domain helpers & traits
    ├── Caching/                          # Tagged cache keys & invalidation helpers
    └── Pagination/                       # Keyset & cursor pagination helpers
```

---

### 2.2 Frontend: Feature-Sliced Architecture (`resources/js/`)

Components are partitioned into 3 clear tiers to prevent monolithic coupling, naming collisions, and bundle bloat.

```
resources/js/
├── components/                           # Design System & Shared Primitives
│   ├── ui/                               # Headless / Atomic UI (Radix + Tailwind v4)
│   │   ├── button.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── form/                             # Standardized form controls
│   │   ├── form-field.tsx                # Label + Input + Error wrapper
│   │   ├── field-error.tsx
│   │   ├── password-input.tsx            # Single consolidated password input
│   │   ├── single-file-upload.tsx
│   │   ├── multiple-file-upload.tsx
│   │   ├── otp-input.tsx
│   │   └── switch.tsx
│   └── common/                           # Generic shared components
│       ├── app-heading.tsx
│       ├── app-modal.tsx
│       ├── app-pagination.tsx
│       ├── empty-state.tsx
│       └── seo.tsx
│
├── features/                             # Domain-Specific Feature Slices
│   ├── catalog/                          # Products & Categories feature
│   │   ├── components/                   # Feature-bound UI
│   │   │   ├── product-card.tsx
│   │   │   ├── product-grid.tsx
│   │   │   ├── product-filters.tsx
│   │   │   └── product-gallery.tsx
│   │   ├── hooks/                        # Feature-bound hooks
│   │   │   └── use-product-filters.ts
│   │   ├── types/                        # Feature TypeScript types
│   │   │   └── product.types.ts
│   │   └── constants/
│   │
│   ├── cart/                             # Cart & Checkout feature
│   │   ├── components/
│   │   │   ├── cart-drawer.tsx
│   │   │   ├── cart-item.tsx
│   │   │   └── cart-summary.tsx
│   │   └── hooks/
│   │
│   ├── security/                         # 2FA & Passkey management
│   │   └── components/
│   │       ├── passkey-item.tsx
│   │       ├── passkey-verify.tsx
│   │       └── two-factor-setup-modal.tsx
│   │
│   └── dashboard/                        # Layout components & Navigation
│       └── components/
│           ├── app-content.tsx
│           ├── app-header.tsx
│           ├── app-sidebar.tsx
│           └── nav-user.tsx
│
├── layouts/                              # Full-page shells
│   ├── app-layout.tsx                    # Authenticated dashboard layout
│   ├── auth-layout.tsx                   # Guest authentication layout
│   └── settings-layout.tsx               # Settings layout
│
├── pages/                                # Inertia Route Endpoints (Thin orchestrators)
│   ├── auth/                             # Login, register, password reset
│   ├── products/
│   │   ├── index.tsx                     # Imports <ProductGrid /> from features/catalog
│   │   └── show.tsx                      # Imports <ProductGallery /> from features/catalog
│   ├── cart/
│   │   └── index.tsx
│   ├── settings/
│   ├── dashboard.tsx
│   ├── example.tsx
│   └── welcome.tsx
│
├── hooks/                                # Global cross-cutting hooks (use-mobile, use-clipboard)
├── lib/                                  # Utilities (utils.ts, cn)
├── constants/                            # Global app settings & navigation items
└── types/                                # Global ambient TypeScript declarations
```

---

## 3. Standards & Naming Conventions

| Category | Standard | Example |
| :--- | :--- | :--- |
| **PHP Classes** | `PascalCase` | `ProductController`, `ListProductsAction` |
| **PHP Methods / Properties** | `camelCase` | `getActiveProducts()`, `$categorySlug` |
| **Database Tables** | `snake_case` (plural) | `products`, `product_categories` |
| **Database Columns** | `snake_case` | `is_featured`, `category_id`, `created_at` |
| **Frontend Files & Folders** | `kebab-case` | `product-card.tsx`, `use-product-filters.ts` |
| **React Components** | `PascalCase` | `export function ProductCard() {}` |
| **React Hooks / Props** | `camelCase` | `const { activeCategory } = useProductFilters()` |
| **TypeScript Types** | `PascalCase` | `Product`, `ProductFiltersProps` |

---

## 4. High-Scale Engineering Patterns (10M+ Users)

1. **Keyset / Cursor Pagination**:
   Avoid `OFFSET` SQL scans. Use `cursorPaginate()` for high-volume catalog feeds to maintain $O(1)$ query execution times regardless of page depth.
2. **Lean Inertia Payloads via Eloquent Resources**:
   Never return raw Eloquent models directly to Inertia views. Use `JsonResource` to whitelist only required fields, keeping payload sizes small and preserving client network bandwidth.
3. **Database Read/Write Replicas**:
   Configure read pools in `config/database.php` with `sticky => true` to route read-heavy catalog traffic away from the primary write node.
4. **Tagged Redis Caching & Stale-While-Revalidate**:
   Cache hot product queries using Redis cache tags (`Cache::tags(['catalog', 'products'])->remember(...)`) to achieve sub-5ms responses with instant targeted invalidation.
5. **Inertia v3 Deferred Props**:
   Use `Inertia::defer()` for secondary data (reviews, charts, recommended items) so the primary viewport renders instantly.

---

## 5. Development & Database Setup

### Database Configuration (MySQL)

```sql
CREATE DATABASE IF NOT EXISTS chore_repo_standards
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

CREATE USER IF NOT EXISTS 'chore_repo_user'@'localhost'
IDENTIFIED BY 'ChoreRepo_2026';

ALTER USER 'chore_repo_user'@'localhost'
IDENTIFIED BY 'ChoreRepo_2026';

GRANT ALL PRIVILEGES ON chore_repo_standards.* 
TO 'chore_repo_user'@'localhost';

FLUSH PRIVILEGES;
EXIT;
```

### Environment Settings (`.env`)

```dotenv
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=chore_repo_standards
DB_USERNAME=chore_repo_user
DB_PASSWORD=ChoreRepo_2026
```

### Quick Start Commands

```bash
# Install dependencies & prepare environment
composer run setup

# Run dev server with hot reload
composer run dev

# Run formatting & code style check
composer run lint
npm run check

# Run Pest test suite
php artisan test --compact
```