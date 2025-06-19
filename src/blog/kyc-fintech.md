---
title: Architecting a KYC Workflow for fintech regulations
date: 2025-06-10
---

[WIP]

During my time working at Elphinstone Inc. The dev team was assigned the paramount task of launching a product wihtin two months, leadership pivoted the product from B2B VPS to a gateway for investors with a Pakistani nationality to be able to invest in U.S markets. A much needed product, however, virtually no one had delved into that space before, and SECP is a bit of a grouchy grandpa (for legal reasons, this is a joke) when it comes to moving money when you're not a big bank.

Part of the regulations dictated an extensive KYC (Know Your Customer) check for each sign up for the app, and from the start, we knew we had to automate it for the app to succeed. Part of the reason why it needed to be automated was because the APIs we utilized for the checks prone to errors and downtimes. Hence we needed a way to batch up the failed requests and retry them at regular intervals.

Our CTO came across Temporal, a fresh new workflow engine with all the features that we need
