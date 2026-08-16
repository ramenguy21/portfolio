---
title: Agritech Portal
date: 2025-10-06
slug: agritech-portal
order: 2
year: "2023"
stack: "React · GraphQL · Hasura — agri supply chain"
blurb: "Farm operations management for farmers and contractors: field jobs, fleet and inventory, invoicing, and role-based access for four user types enforced at both the API and database layers."
caption: "portal dashboard"
image: /case-studies/farmevo/dashboard.webp
tags: [Agritech, GraphQL, Multi-tenant, Geospatial]
---

## Overview

Farmevo was a farm operations management platform designed for farmers and agricultural contractors. The system provided a unified portal where farm managers could plan and track field operations (spraying, harvesting, drilling), manage their fleet, assign jobs to operators and contractors, track field data across growing seasons, manage inventory, and generate invoices. The platform supported role-based access for four distinct user types — Farmers, Contractors, Managers, and Operators — each with tailored views and permission boundaries enforced at both the API and database layers.

![Account creation](/case-studies/farmevo/signup-create-account.png)

## Tech Stack

- Fastify + Mercurius (GraphQL API)
- React (Frontend SPA)
- Hasura GraphQL Engine
- PostgreSQL
- URQL + Graphcache (normalised client cache)
- Chakra UI
- Google Maps API (field polygons & geospatial)
- Firebase Hosting
- AWS Elastic Beanstalk + ECS

## Key Challenges

### 01 — Role-Based Multi-Tenant Architecture

The platform served four user roles — Farmer, Contractor, Manager, and Operator — each with fundamentally different views of the same data. Farmers saw all their fields and team members; Contractors managed their own operations while appearing as assignees on Farmer jobs; Operators could only see jobs they were assigned and were restricted to updating extras and product values.

**The Solution.** Hasura's role-based permission system enforced row-level security at the database layer. Three permission tiers (admin, user, operator) were configured with column-level and row-level filters. The frontend applied a GraphQL `@skip(if: $isOperator)` directive pattern to strip sensitive fields (billing rates, cost data) from queries at the network layer. JWT claims signed with RS256 keys were shared between Fastify and Hasura, ensuring both layers enforced identical identity guarantees.

### 02 — Interactive Geospatial Field Management

Farm fields were geo-referenced polygons drawn on a satellite map. Users needed to create, edit, and version fields across growing seasons — each "season shot" was a snapshot linked to a polygon with computed acreage. When creating a job, users selected fields by clicking polygons directly on the map with real-time area calculations.

**The Solution.** PostgreSQL's native polygon and point types stored geometries directly. On the frontend, the Google Maps JavaScript API rendered polygons parsed via a custom `fromDbPolygonToPathArray` utility, with area computed using `google.maps.geometry.spherical.computeArea()` converted to acres. Fields were versioned via a `field_season_shot` table with a unique constraint on `(field_id, season)`, allowing the same physical field to have different crop data per season while maintaining a single polygon reference.

### 03 — Complex Job Orchestration

A single job involved up to eight related entities: an operation type, a contractor, multiple operators with assigned vehicles and implements, multiple field selections, product applications, custom extras, and GPS pin locations. Creating or editing a job required orchestrating inserts and upserts across seven junction tables in a single mutation.

**The Solution.** Hasura's nested insert with `on_conflict` upsert handled the creation path atomically. For edits, a custom `generateUpdateJobMutation` function computed the diff between existing job state and new form state, producing targeted `delete_*` operations for removed associations and an `insert_jobs_one` with `on_conflict` for upserted data — all within one request, preventing race conditions and partially updated states.

![Job assignment and operations view](/case-studies/farmevo/ops.webp)

![Adding an operation, with billing rate and unit](/case-studies/farmevo/operations-add-operation.png)

### 04 — Client-Side Normalised Cache

With deeply nested, relational data flowing through GraphQL, maintaining cache consistency after mutations was critical. Adding a job needed it to appear immediately in the jobs table; editing a field polygon needed to reflect across the field list, snapshot history, and all referencing jobs.

**The Solution.** URQL's `@urql/exchange-graphcache` was configured with a full normalised cache backed by the introspected Hasura schema. Custom keys were defined for every entity to handle composite primary keys (e.g., `job_products` keyed by `jobId:productId`). Twelve custom `UpdateResolver` functions handled post-mutation cache writes — inspecting existing cache entries via `cache.inspectFields` and surgically updating query results without a network refetch.

### 05 — Multi-Step Onboarding Flow

New users needed to complete a four-step onboarding: email verification (OTP), business details, preferences (currency, timezone, default map location, field colour), and tax/invoicing setup — spanning three database tables and requiring atomic submission.

**The Solution.** The onboarding was built as a stepped form with state accumulated in a parent component via `parseFormData` from the native FormData API. On final submission, a single `SaveUserProfile` mutation used Hasura's `on_conflict` upsert on all three tables simultaneously. Email verification used a server-generated 4-digit OTP with a 5-minute TTL (enforced via `WHERE now() < expires_at`), with OTP deletion and email verification set in a single transaction.

The four steps, in order:

![Step one — email verification by OTP](/case-studies/farmevo/onboarding-verify-email.png)

![Step two — business details](/case-studies/farmevo/onboarding-business-details.png)

![Step four — invoicing and tax setup](/case-studies/farmevo/signup.webp)

### 06 — Invoice Generation

Completed jobs needed printable invoices calculating costs from operation billing rates, product prices, and billable area — pulling contractor and customer details, addresses, and line-item breakdowns.

**The Solution.** A `JobInvoiceModal` component rendered a fully formatted invoice within a ref-tracked DOM element, then used `react-to-print` to generate a downloadable PDF. Operation costs supported both auto-calculated acre-based billing and manual entry. Invoice data was sourced entirely from the existing GraphQL cache, requiring no additional API calls.

### 07 — CI/CD & Deployment Pipeline

The monorepo used Yarn Workspaces with three packages (`@farmevo/api`, `@farmevo/web`, `@farmevo/common`). The common package needed to be compiled before either app started, with separate staging and production environments for API and frontend.

**The Solution.** The API deployed to AWS Elastic Beanstalk via `eb deploy` with staging/prod environments toggled through Makefile targets. The frontend deployed to Firebase Hosting via `env-cmd`. Hasura and Postgres ran on AWS ECS with migrations tracked locally through the Hasura CLI. GraphQL codegen introspected the live Hasura schema and generated TypeScript types shared across the monorepo through the common package.

## Impact & Reflection

The Farmevo Portal demonstrated that a small team could build a feature-rich, enterprise-grade farm management system by leaning heavily on Hasura as the data layer — eliminating the need for hand-written CRUD endpoints and getting real-time subscriptions, role-based permissions, and a fully typed GraphQL API essentially for free.

**Type Safety End-to-End.** From database columns through Hasura's auto-generated schema, through graphql-codegen into TypeScript types, into URQL's typed hooks — a column rename in a migration would surface as a compile error in the React component rendering it.

**Geospatial Without GIS Overhead.** By using PostgreSQL's native geometry types and Google Maps for rendering, the platform handled polygon-based field management without requiring PostGIS or a dedicated mapping backend.

**Role Isolation Without Code Duplication.** The same React components served Farmers, Contractors, and Operators, with Hasura permissions ensuring data isolation and frontend conditional rendering adapting the UI — rather than maintaining separate applications per role.
