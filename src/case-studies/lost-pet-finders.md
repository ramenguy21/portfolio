---
title: Lost Pet Finders
date: 2025-09-06
slug: lost-pet-finders
order: 1
year: "2025"
stack: "Node.js · MongoDB · ESP32 beacons — public service"
blurb: "Community-driven pet recovery: geotag hardware plus human-submitted sightings, searchable from a single query bar. Auto-breed detection on upload, image downsizing pipeline, scheduled cleanup of stale spots."
caption: "map + spot feed"
tags: [Web, Hardware, Community, ML]
---

## Overview

Lost Pet Finders (LPF) is a community-driven platform designed to help pet owners recover their lost companions. The platform combines human-submitted sightings with geotag hardware tracking to create a comprehensive pet recovery network. Anyone can register as a spotter and submit sightings, while pet owners search for their missing companions using a simple query bar. This approach works not just for cats and dogs, but also for herders and cattle owners managing free-roaming livestock.

## Tech Stack

- React (Frontend)
- Node.js / Express (Backend)
- MongoDB
- ESP32 Bluetooth Beacons
- GSM Modules
- PIL & JPEG optimisation
- Local ML image recognition

## Key Challenges

### 01 — Community-Driven Data Management

Building a platform that relies on crowdsourced data from spotters required careful consideration of data quality and relevance.

**The Solution.** We implemented an automated cleanup system with cron jobs that periodically:

- Remove old, unresolved spots past a defined threshold
- Archive found pet records to keep the database fresh
- Maintain data integrity without manual intervention

### 02 — Multi-Channel Tracking

Integrating both hardware-based and human-submitted tracking data required a unified data model.

**The Solution.** We designed a flexible pet entity structure that could accommodate:

- **Bluetooth Beacons** — collar-mounted ESP32 devices broadcasting presence to registered mobile users
- **GSM Modules** — for pets that roam far, providing geolocation via cellular networks
- **Manual Spots** — community submissions with optional auto-breed detection and verified location data

### 03 — Image Storage Optimisation

Efficiently storing pet images from spotters while maintaining quality required a clear optimisation strategy.

**The Solution.** All submitted images are automatically:

- Downsized to 1000×1000 pixels
- Converted to JPEG format
- Stored with optimised compression
- Indexed for quick retrieval during searches

### 04 — Real-Time Matching & Notifications

Users needed immediate alerts when their pet or similar pets were spotted.

**The Solution.** A multi-layered matching system:

- **Alert Feature** — email notifications for pet owners when matches are detected or similar descriptions are uploaded
- **ML-Based Matching** — a lightweight local ML model extracts visual features from pet images to match lost and found reports
- **Priority Filtering** — alerts weighted by similarity score and proximity to registered pet location

## Features

- **Quick Locate** — instant search using a Google-style query bar
- **Spot Submission** — community submissions with optional automatic breed detection
- **User Registration** — support for both spotters and pet owners
- **Shop & Adoption** — pet-related products and adoption marketplace integration
- **Real-Time Alerts** — email notifications on potential matches
- **Security** — OWASP compliance protocols for user data protection
- **Hardware Integration** — optional geotag devices for continuous tracking

## Impact & Reflection

**High Engagement.** Built a community of active spotters across target regions.

**Recovery Success.** Significant improvement in lost pet recovery rates through multi-channel tracking.

**Scalability.** Modular design allowed expansion to new cities and pet types.

**User Trust.** OWASP-compliant security measures ensured user data safety and platform reliability.
