---
title: Lost Pet Finders
date: 2025-06-09
slug: lost-pet-finders
---

## Overview

Lost Pet Finders (LPF) is a community-driven platform designed to help pet owners recover their lost companions. The platform combines human-submitted sightings with geotag hardware tracking to create a comprehensive pet recovery network. Anyone can register as a spotter and submit sightings, while pet owners can search for their missing companions using a simple, intuitive query bar.

This approach works not just for cats and dogs, but also for herders and cattle owners managing free-roaming livestock.

## Tech Stack

- **Frontend:** React
- **Backend:** Node.js/Express
- **Database:** MongoDB
- **Hardware Integration:** Bluetooth Beacons (ESP32), GSM Modules
- **Image Processing:** PIL, JPEG optimization
- **ML Model:** Local image recognition for pet matching

## Key Challenges

### Community-Driven Data Management

Building a platform that relies on crowdsourced data from spotters required careful consideration of data quality and relevance.

**The Solution**

We implemented an automated cleanup system with cron jobs that periodically:

- Remove old, unresolved spots past a certain threshold
- Archive found pet records to keep the database fresh
- Maintain data integrity without manual intervention

### Multi-Channel Tracking

Integrating both hardware-based and human-submitted tracking data required a unified data model.

**The Solution**

We designed a flexible pet entity structure that could accommodate:

- **Bluetooth Beacons:** Collar-mounted ESP32 devices broadcasting presence to registered mobile users
- **GSM Modules:** For pets that roam far, providing geolocation via cellular networks
- **Manual Spots:** Community submissions with optional auto-breed detection and verified location data

### Image Storage Optimization

Efficiently storing pet images from spotters while maintaining quality required optimization.

**The Solution**

All submitted images are automatically:

- Downsized to 1000x1000 pixels
- Converted to JPEG format
- Stored with optimized compression
- Indexed for quick retrieval during searches

### Real-Time Matching & Notifications

Users needed immediate alerts when their pet or similar pets were spotted.

**The Solution**

- **Alert Feature:** Email notifications for pet owners when matches are detected or similar descriptions are uploaded
- **ML-Based Matching:** A lightweight local ML model extracts visual features from pet images to match lost and found reports
- **Priority Filtering:** Alerts weighted by similarity score and proximity to registered pet location

## Features

- **Quick Locate** - Instant search using a Google-style query bar
- **Spot Submission** - Community submissions with optional automatic breed detection
- **User Registration** - Support for both spotters and pet owners
- **Shop & Adoption** - Pet-related products and adoption marketplace integration
- **Real-Time Alerts** - Email notifications on potential matches
- **Security** - OWASP compliance protocols for user data protection
- **Hardware Integration** - Optional geotag devices for continuous tracking

## Impact & Reflection

The platform demonstrated the power of community-driven solutions for local problems:

- **High Engagement:** Built a community of active spotters across target regions
- **Recovery Success:** Significant improvement in lost pet recovery rates through multi-channel tracking
- **Scalability:** Modular design allowed expansion to new cities and pet types
- **User Trust:** OWASP-compliant security measures ensured user data safety and platform reliability
