---
layout: single
title:   Feature extraction and the TE framework
permalink: /best-practices-in-data-donation/the-data-donation-workflow-in-light-of-the-TE-framework/feature-extraction-and-the-TE-framework
toc: false
sidebar:
  nav: "best-practices-in-data-donation"
---

In building the feature extraction software (section 5), the workflow aims to avoid extraction error and algorithmic error emerging in the data. Extraction error occurs when software fails to find and extract the correct data in DDPs. This can either result in data not being extracted or in the incorrect data being extracted. Both can lead to biased data and invalid results. The workflow addresses accounting for extraction error by accounting for variability of DDPs over devices, settings, and time. The workflow steps support a robust extraction script, combating extraction error.

Algorithmic error describes any error in the data as a result of using an algorithm within the data collection. Algorithms are seldom perfect, and therefore some algorithmic error will always be present in the data on use of algorithms. For example, in RQ 3 (WhatsApp), an algorithm could be used to analyze text and decide whether a text message was a response on an earlier message. Not every reply will then correctly be classified as such, potentially biasing the data and inferences based on it. Algorithmic error is not specific to data donation and occurs in any data collection that makes use of algorithms. Therefore, it is hard to account for this error. In the workflow, it is recommended to not use algorithms excessively, and study the properties and performances of algorithms before incorporating these in the study.