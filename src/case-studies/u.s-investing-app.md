---
title: U.S. Investing App
date: 2022-10-06
slug: us-investing-app
order: 3
year: "2022"
stack: "React Native · Go · EKS — Elphinstone"
blurb: "Investing in U.S. stocks and ETFs from Pakistan. Microservices with no cross-database reads, APISIX at the edge and ORY for identity — a compliant bridge between two banking environments."
caption: "portfolio + order flow"
tags: [Fintech, Microservices, Mobile]
---

## Overview

A mobile application that allows you to invest in U.S. stocks and ETFs as a Pakistani citizen. Hosted on a microservices-based architecture, it manages users, reconciles their portfolios, and allows them to create their own portfolios. The core challenge was building a high-trust, compliant, and resilient financial bridge between two vastly different regulatory and banking environments.

## Tech Stack

- React Native (Mobile clients)
- Node.js & GoLang services
- EKS (managed deployment)
- ORY identity management
- APISIX API gateway
- Kafka event streaming
- Prometheus + Grafana

## The Architecture

In this financial system, we focused first and foremost on data integrity. To prevent cascading failures and interlinked dependencies, we designed a system where no two services could query each other's databases directly. We utilised Kubernetes via Helm charts for reproducible, versioned deployments. APISIX, an open-source network gateway, served as the high-performance traffic controller, distributing application load evenly and boosting performance via rate limiting. ORY was leveraged for cloud-native identity management — allowing users to log in via OAuth / OpenID accounts while maintaining an "Elphinstone identity" reusable across our other products.

### Core Services

- **User Service** — source of truth for identity and profile state.
- **Finance Service** — an interface to the Alpaca Broker API, managing orders and market data.
- **Accounting Service** — the ledger. Purely consumed events to maintain a deterministic record of all transactions.
- **KYC Service** — a specialised engine for regulatory compliance and identity verification.
- **Observability Suite** — a Prometheus + Grafana stack for real-time monitoring and log aggregation.

## Implementation

To solve data consistency across services we implemented a Pub/Sub architecture via Kafka. A user buys a stock → Finance Service emits a `TRADE_EXECUTED` event → Accounting Service processes it asynchronously, updating the ledger. The decoupled communication meant that even if the Accounting Service went down, no financial data was lost.

Instead of a standard users table, we used ORY to separate identity from application logic — enabling complex flows like multi-factor authentication and session management that met the high security standards required for an investment platform.

Integrating Pakistani banks with a U.S. broker is a nightmare of context-driven payments. We built a multi-channel solution that handles the nuances of local bank transfers while reconciling them against the U.S. dollar-denominated accounts at the broker level.

## Key Challenges

### 01 — Network Latency & Reliability

Communicating with U.S.-based brokers from a local environment requires aggressive caching and idempotent request handling to ensure a user is not double-charged during a timeout.

### 02 — Eventual Consistency

In an event-driven system, the UI must be designed to handle "Pending" states gracefully. Cross-functional collaboration ensured the mobile client reflected the real-time status of the Kafka stream.
