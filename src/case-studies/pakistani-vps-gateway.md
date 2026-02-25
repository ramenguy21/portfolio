---
title: Pakistani VPS Gateway
date: 2025-06-10
slug: pakistani-vps-gateway
---

## Overview

The B2B/B2C VPS product was a gateway for registered companies in Pakistan to provide a voluntary pension scheme to their employees as a third-party service. It was an application that allowed employees of onboarded companies to log in to view their portfolio status, manage their risk appetite, and more. Administrative users were correlated to members of our Operations team. They were responsible for managing mutations to the employee list. Editing their details, checking manual verifications, and so on. This functionality was contained within the Admin Dashboard. The B2C functionality managed individuals who had signed up for a VPS on their own accord; it shared functionality with the B2B dashboard.

## Tech Stack

- **Backend:** NestJS
- **Frontend:** React + Vite
- **Integration Services:** Temporal + GoLang
- **Deployment:** AWS ECS (staging → prod environment)

## Key Challenges

### The KYC Process

This was, unarguably, the most involved part of the onboarding process. As part of the regulatory requirements set forth by SECP, we had to verify four statuses for each onboarding:

- **AML/CFT Status** - Finance blacklist verification
- **MSISDN Verification** - Whether their provided phone numbers were registered against their provided CNIC
- **NADRA Verification** - Whether their submitted CNIC scans matched their submitted details
- **IBFT Verification** - Whether their provided bank account was valid and active

As is the case if one has ever worked with Pakistani APIs, the services used to conduct these status checks had unreliable uptime. The business process required each check to finish before the next could be started. Hence, a traditional approach with exponential backoff on request retries was not applicable here.

**The Solution**

The process was treated as a state machine. We wrote a workflow in GoLang that spawned each verification as an asynchronous Activity (think of these as function calls). The Temporal instance was responsible for keeping track of the workflow and all of the associated activities. Upon a successful verification (defined by whether the third-party API returned a valid response), it would store the verification result in the Mongo database. This Mongo database hosted a collection of verification documents, which also served as the source of truth for compliance.

### Asset Allocation

An authenticated user would be allowed to modify their asset allocation based on their risk appetite (e.g., moving from High Risk to Conservative). One and done on their end, a complete portfolio recalculation and net asset value readjustment on our end.

**The Solution**

We developed a recalculation engine that triggered on-demand. It reconciled the user's current holdings against the latest fund prices, locking all associated operations with the user until the recalculations were complete.

### Multistep Onboarding Flow

The signup process took around 15-20 minutes to complete on average. We needed a way to track where the user had dropped off during their signup. Three major forms had to be filled out: Personal, Company, and Signatures. For every field that was submitted and saved, we needed to prefill the fields the next time they landed on signup.

**The Solution**

We heavily utilized exposed handlers through the `useFormik()` hook and wrote a custom file input component, which would cache the files on our backend and fetch them when the user returned to complete the onboarding flow. The logic was robust and tested with Jest and Puppeteer.

### Payout Algorithm

To handle the distribution of company-wide funds, we developed a pro-rata allocation algorithm. This system took the total stock value held by a company and programmatically distributed it across the employee base. It factored in the specific Asset Profile of each employee, ensuring the math cleared down to the decimal point across hundreds of accounts. These also doubled as audit logs for the Operations team.

### CI/CD Pipeline

This was managed through GitHub Actions. A push to the relevant (staging, main) branch kicked off the workflow, which created the Docker image and pushed it to ECR. The corresponding ECR image was then containerized, tagged, and deployed onto ECS.

## Impact & Reflection

While the product was ultimately sunset due to a strategic pivot at the executive level, the technical foundation was still a success.

- **Zero Data Loss:** Despite the questionable reliability of external APIs, the Temporal integration ensured 100% KYC completion during onboarding.
- **Operational Efficiency:** The Admin Dashboard allowed the Ops team to manage manual verifications and payouts without developer intervention, reducing overhead by roughly 40%.
