---
title: U.S Investing App
date: 2025-06-10
slug: us-investing-app
---

## Overview

A mobile application that allows you to invest in U.S. stocks and ETFs as a Pakistani citizen. Hosted on a microservices-based architecture, it manages users, reconciles their portfolios, and allows them to create their own portfolios. The core challenge was building a high-trust, compliant, and resilient financial bridge between two vastly different regulatory and banking environments.

## Tech Stack

- React Native (Mobile Clients)
- Node.js- and GoLang-based services.
- EKS (managed deployment)
- ORY for secure open-source identity management.

## The Architecture

In this financial system, we focused first and foremost on data integrity. To prevent cascading failures and interlinked dependencies, we designed a system where no two services could query each other’s databases directly. To execute this policy:
We utilized Kubernetes via Helm charts for reproducible, versioned deployments.
APISIX, an open-source network gateway, served as the high-performance traffic controller, distributing application load evenly and boosting application performance by using strategies such as rate limiting.

ORY was leveraged for cloud-native, open-source identity management. Allowing users to log in via their OAuth / OpenID accounts, as well as maintaining an “Elphinstone identity” to reuse across our other products.

## Core Services

We broke the domain into five specialized microservices, each with a single responsibility:

- **User Service:** Source of truth for identity and profile state.
- **Finance Service:** An interface to the Alpaca Broker API, managing orders and market data.
- **Accounting Service:** The ledger. It purely consumed events to maintain a deterministic record of all transactions.
- **KYC Service:** A specialized engine for regulatory compliance and identity verification.
- **Observability Suite:** A Prometheus + Grafana stack for real-time monitoring and log aggregation.

## Implementation

To solve the problem of maintaining data consistency across services, we implemented a Pub/Sub architecture via Kafka. A standard workflow of stock exchange looked like this

A user buys a stock -> Finance Service emits a TRADE_EXECUTED event -> Accounting service is subscribed to this topic and processes it asynchronously, updating the ledger.
The decoupled nature of communication meant that even if the Accounting service went down, no financial data was lost.  
Instead of a standard users table, we used ORY to separate identity from application logic. This allowed us to implement complex flows (like multi-factor authentication and session management) that met the high security standards required for an investment platform.
Integrating Pakistani banks with a U.S. broker is a nightmare of "context-driven" payments. We built a multi-channel solution that could handle the nuances of local bank transfers while reconciling them against the U.S. dollar-denominated accounts at the broker level.

## Technical Challenges

- **Network Latency & Reliability:** Communicating with U.S.-based brokers from a local environment requires aggressive caching and idempotent request handling to ensure a user isn't double-charged during a timeout.
- **Eventual Consistency:** In an event-driven system, the UI must be designed to handle "Pending" states gracefully. By enabling cross-functional collaboration, we ensured the mobile client reflected the real-time status of the Kafka stream.
