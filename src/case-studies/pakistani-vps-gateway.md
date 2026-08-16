---
title: Pakistani VPS Gateway
date: 2021-12-09
slug: pakistani-vps-gateway
order: 4
year: "2021"
stack: "Temporal · Go · NestJS — Elphinstone"
blurb: "A voluntary pension scheme delivered as a third-party service: employees track portfolio status and risk appetite while an ops dashboard handles verification and member mutations. SECP-mandated KYC modelled as a durable workflow."
caption: "kyc workflow states"
tags: [Fintech, Pension, SECP, B2B/B2C]
---

## Overview

The VPS product was a gateway for registered companies in Pakistan to provide a voluntary pension scheme to their employees as a third-party service. Employees of onboarded companies could log in to view their portfolio status and manage their risk appetite. Administrative users — members of the internal Operations team — managed employee records, manual verifications, and approvals through a dedicated Admin Dashboard. B2C functionality served individuals who signed up independently and shared the same core dashboard.

## Tech Stack

- NestJS (Backend API)
- React + Vite (Frontend)
- Temporal + GoLang (Integration services)
- MongoDB
- AWS ECS (staging → prod)
- GitHub Actions (CI/CD)
- Docker + ECR

## Key Challenges

### 01 — KYC State Machine

SECP regulatory requirements mandated four sequential verifications per onboarding: AML/CFT (finance blacklist), MSISDN (phone number against CNIC), NADRA (CNIC scan matching), and IBFT (bank account validity). Pakistani third-party APIs had notoriously unreliable uptime, and each check had to complete before the next could begin — making standard exponential-backoff retry strategies unviable.

**The Solution.** The process was modelled as a Temporal state machine. A GoLang workflow spawned each verification as an asynchronous Activity. Temporal tracked state across the entire workflow, resuming automatically after API outages without data loss. On a successful response, the result was persisted to a MongoDB verification collection that also served as the compliance source of truth.

### 02 — Asset Allocation Engine

Users could modify their asset allocation based on risk appetite — e.g., shifting from High Risk to Conservative. A single user action on the frontend triggered a complete portfolio recalculation and net asset value readjustment across all holdings.

**The Solution.** A recalculation engine triggered on-demand, reconciling the user's current holdings against the latest fund prices. All operations associated with the user were locked until recalculations completed, preventing race conditions against concurrent portfolio mutations.

### 03 — Multistep Onboarding Flow

The signup process averaged 15–20 minutes across three major forms: Personal, Company, and Signatures. The system needed to track where users dropped off and prefill completed fields when they returned.

**The Solution.** State was accumulated via exposed handlers from the `useFormik()` hook. A custom file input component cached uploaded files on the backend and restored them on subsequent sessions. The entire flow was covered by Jest unit tests and Puppeteer end-to-end tests.

### 04 — Pro-Rata Payout Algorithm

Company-wide fund distribution required programmatic allocation of the total stock value held by a company across its entire employee base, respecting each employee's individual Asset Profile down to the decimal point.

**The Solution.** The algorithm factored in each employee's Asset Profile, ensuring allocations cleared mathematically across hundreds of accounts simultaneously. Each distribution output doubled as an immutable audit log for the Operations team.

### 05 — CI/CD Pipeline

Deployments needed to be fully automated across staging and production environments with no manual steps.

**The Solution.** GitHub Actions triggered on push to the staging and main branches respectively. Each run built a Docker image, pushed it to ECR, then containerised, tagged, and deployed the image to the corresponding ECS environment.

## Impact & Reflection

The product was ultimately sunset following a strategic pivot at the executive level. The technical foundation, however, remained a success.

**Zero Data Loss.** Despite the unreliable uptime of external Pakistani APIs, the Temporal integration ensured 100% KYC completion across all onboarding attempts.

**Operational Efficiency.** The Admin Dashboard enabled the Ops team to manage manual verifications and payouts without developer intervention, reducing overhead by roughly 40%.
