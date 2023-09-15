---
layout: single
title: Map the limitations of choices
permalink: /best-practices-in-data-donation/defining-the-purpose-of-data-donation-in-the-study/map-the-limitations-of-choices
toc: false
sidebar:
  nav: "best-practices-in-data-donation"
---

The fifth and final step is mapping potential limitations of the chosen DDPs made in the previous steps. Common limitations to consider are conditions under which the platform does not collectdata, platform features on which no data are present in the DDPs, and the presence of potentially incorrect logs and measurements in the DDPs. As limitations are sometimes inherently part of a platform or DDP, accounting for these limitations is not always feasible for researchers. For instance, when looking at the example of RQ1 (GSLH), the researcher cannot change that some participants do not always bring their phone on their travels, leading to travel logs not being collected. However, where possible, limitations should be taken into account. To illustrate, another limitation of the GSLH DDPs in example RQ1 is the rare occurrence of logs with impossible values, such as an activity log of walking over 100 kilometers in under one hour (see figure 3). This limitation could be accounted for by adjusting impossible data logs from the collected data when extracting these data. In figure 3, an average speed of 500 km/h is found. In the logs, Google provides probabilities for the data belonging to each of the activity types, which sums to 100. The example log shows that Google’s algorithm did not find a convincing probability for one activity type. Therefore, it is assumed that the distance might be logged incorrectly, and an adjusted distance values could be imputed for this activity log, not exceeding a maximum speed, such as 6 km/h for walking. Despite the encountered limitations for the chosen DDPs, data donation remains a helpful method for collection of digital trace data. Mapping the limitations and taking them into account ensures the quality of the collected data.

To conclude, going over the steps presented in this section should result in a concrete data donation research question and an overview of the DDPs and concrete data required to answer this question, including potential limitations resulting from the choices made. Once these points are achieved, the researcher has a base to continue with the subsequent elements of the study: the study design, the feature extraction, and the configuration of the data donation tool.

## Table 1:
![Table 1: Illustration on concretization of the use of data donation for RQ1: ‘Did travel behavior in the Dutch population change during Covid-19?’.](/assets/images/about/Table 1.png)


Illustration on concretization of the use of data donation for RQ1: ‘Did travel behavior in the Dutch population change during Covid-19?’.

## Table 2:
![Table 2: Illustration on concretization of the use of data donation for RQ2: ‘What interests do social media platforms infer from their users, and how do these differ over platforms?’..](/assets/images/about/Table 2.png)


Illustration on concretization of the use of data donation for RQ2: ‘What interests do social media platforms infer from their users, and how do these differ over platforms?’.

## Table 3:
![Table 3: Illustration on concretization of the use of data donation for RQ3: ‘What are the social network
structures in group chats?’.](/assets/images/about/Table 3.png)

Illustration on concretization of the use of data donation for RQ3: ‘What are the social network structures in group chats?’.