---
layout: single-toc-on-top
classes: wide
title: Value and purpose of data donation
permalink: /prepare-a-study/value-and-purpose-of-data-donation
toc: true
sidebar:
  nav: "prepare-a-study"
---

# Introduction

 When considering using data donation to collect digital trace data for your research, carefully think about what the exact purpose and added value is of using data donation here. Defining such a purpose is mandated by the GDPR for processing any personal data (Hoofnagle et al., 2019). It helps to make more specific how you plan to use data donation exactly:

1. Operationalize your constructs.
2. Identify candidate platforms.
3. Evaluate how to measure constructs per platform.
4. Evaluate how to use your chosen platform(s). 
5. Map the limitations of the chosen platform(s). 


# Operationalize your constructs

Determine which constructs you are planning to measure through data donation, and how you want to measure them. Also consider other potential aspects, such as time restrictions or the population of interest. 

To illustrate, for the construct "Travel behavior" in [RQ1](/prepare-a-study/workflow#Illustrative-research -questions) 

RQ1 (can we link to these on the page they are?), being able to distinguish various modes of travel is important, being able to measure travel behavior over time is important, and it is important that data is donated from a commonly used platform, since it is of interest to generalize with respect to the Dutch population. Sometimes, constructs are already specific by their own definition. An example of such a construct is "Inferred interests by social media platforms" in RQ2. 

# Identify candidate platforms

When selecting platforms with potentially relevant DDPs, it is advised to get an overview on a wide range of platforms connected to the study topic, as well as on the general users of these platforms. Platform usage can differ strongly over age groups, countries, and levels of education. National studies on platform usage can therefore provide insights on what platforms match well with the targeted study population, such as the study by Hoekstra et al. (2022) on social media usage in the Netherlands. As platform usage can change greatly over a short time period, researchers should always look for recent sources. In addition, it is important for the researcher to explore platforms that they might not be familiar with at all, as the population of interest might use different platforms than the researcher knows of. While exploring platforms, it is advised to create an overview of the

# Evaluate how to use your chosen platform(s)

Once an overview of the candidate platforms is created, it can be evaluated how well each platform matches the defined constructs and the research question (see for example Step 3 in Tables 1 and 3). Based on this evaluation, it can be opted to select a single platform to continue the study with (e.g. Table 1). However, if after such an evaluation it is concluded that multiple platforms can provide equally suited DDPs or DDPs supplementing each other, the subsequent steps can also be executed for multiple platform (e.g. Table 2).

# Map the limitations of the chosen platform(s) 

Once a suited platform is selected, it can be determined what exact data from the DDP will be used to measure the constructs. This means a second iteration of operationalization of the construct\is performed, now specifically in the light of the research question. Constructs can be measured either directly or indirectly in a DDP. For an indirect construct, this means that further processing of the data from the DDP is required (see e.g. Table 1), and a direct alignment between construct and measurements obtained from the DDP is not always possible (see e.g. Table 2). For a direct construct, no processing is needed and measurements can be taken directly from the data present in the DDP (see e.g. Table 3).

A challenge in determining the operationalization of the construct in the DDPs, is that platforms not always fully adhere to the GDPR (M¨uller et al., 2019; Sørum & Presthus, 2020). This can resultin data occasionally not being present in a DDP while one would expect this data to be there. Therefore, it should always be checked if theoretical measurements are present in the DDPs. For RQ2, an approach to measure the construct ‘who responds most to someone’ can be to count the number of times the participant used WhatsApp’s quote functionality on someone else’s messages. However, WhatsApp does not provide data on the use of this functionality in their DDPs (see Figure 2), hence this way of measuring the construct can not be used in the study.

**Figure 2**

![Figure 2: Illustration of the WhatsApp functionality to quote other user’s messages, and how data on this functionality cannot be found in the WhatsApp DDPs.](/assets/images/about/WhatsApp_quoting_figure_v2.png)

*Illustration of the WhatsApp functionality to quote other user’s messages, and how data on this functionality cannot be found in the WhatsApp DDPs.*

**Figure 3**

![Figure 3: Illustration of unrealistic logs in the GSLH DDPs. This problem could be accounted for by imputing realistic distance values in the extracted data.](/assets/images/about/GSLH_error_figure_v4.png)

*Illustration of unrealistic logs in the GSLH DDPs. This problem could be accounted for by imputing realistic distance values in the extracted data.*

# Map the limitations of choices

The fifth and final step is mapping potential limitations of the chosen DDPs made in the previous steps. Common limitations to consider are conditions under which the platform does not collectdata, platform features on which no data are present in the DDPs, and the presence of potentially incorrect logs and measurements in the DDPs. As limitations are sometimes inherently part of a platform or DDP, accounting for these limitations is not always feasible for researchers. For instance, when looking at the example of RQ1 (GSLH), the researcher cannot change that some participants do not always bring their phone on their travels, leading to travel logs not being collected. However, where possible, limitations should be taken into account. To illustrate, another limitation of the GSLH DDPs in example RQ1 is the rare occurrence of logs with impossible values, such as an activity log of walking over 100 kilometers in under one hour (see figure 3). This limitation could be accounted for by adjusting impossible data logs from the collected data when extracting these data. In figure 3, an average speed of 500 km/h is found. In the logs, Google provides probabilities for the data belonging to each of the activity types, which sums to 100. The example log shows that Google’s algorithm did not find a convincing probability for one activity type. Therefore, it is assumed that the distance might be logged incorrectly, and an adjusted distance values could be imputed for this activity log, not exceeding a maximum speed, such as 6 km/h for walking. Despite the encountered limitations for the chosen DDPs, data donation remains a helpful method for collection of digital trace data. Mapping the limitations and taking them into account ensures the quality of the collected data.

To conclude, going over the steps presented in this section should result in a concrete data donation research question and an overview of the DDPs and concrete data required to answer this question, including potential limitations resulting from the choices made. Once these points are achieved, the researcher has a base to continue with the subsequent elements of the study: the study design, the feature extraction, and the configuration of the data donation tool.

**Table 1**
![Table 1: Illustration on concretization of the use of data donation for RQ1: ‘Did travel behavior in the Dutch population change during Covid-19?’.](/assets/images/about/Table 1.png)

*Illustration on concretization of the use of data donation for RQ1: ‘Did travel behavior in the Dutch population change during Covid-19?’.*

**Table 2**
![Table 2: Illustration on concretization of the use of data donation for RQ2: ‘What interests do social media platforms infer from their users, and how do these differ over platforms?’.](/assets/images/about/Table 2.png)

*Illustration on concretization of the use of data donation for RQ2: ‘What interests do social media platforms infer from their users, and how do these differ over platforms?’.*

**Table 3**

![Table 3: Illustration on concretization of the use of data donation for RQ3: ‘What are the social network
structures in group chats?’.](/assets/images/about/Table 3.png)

*Illustration on concretization of the use of data donation for RQ3: ‘What are the social network structures in group chats?’.*
