---
layout: single-toc-on-top
classes: wide
title:  Configuring the data donation tool
permalink: /prepare-a-study/configuring-the-data-donation-tool
toc: true
sidebar:
  nav: "prepare-a-study"
---

# Configuring the data donation tool

A data donation tool consists of an app that can be accessed by participants. At the minimum, this app should allow for the local processing step to take place. In practice, this means that a participant opens their DDP in the app, the extraction script (see Section 5) is run, and after the participate presses the ‘yes, donate’ button, the extracted data is sent to a server which can be accessed by the researcher for further analysis. To enable these steps, the researcher, together with an IT-specialist of their institution, decides where the app is hosted and where data is stored.

The researcher decides where the app is hosted, this can be on premise or in a cloud. Here are multiple options available and it is up to the researcher and its institution to choose an appropriate solution for their study, which is assessed by means of a Data Privacy Impact Assessment (DPIA). A processing agreement should be made between the institution and the hosting party. When hosting the app, a domain name is specified through which participants can access the study page. Here, the weblinks that are shared with participants should be configured in such a way that they contain a unique user ID, which can later be used to for example link the donated data to other sources, for example obtained through a questionnaire. As soon as the participant clicks the ‘yes, donate’ button, the extracted data is sent to the app, which immediately sends it through to the storage account. During this process, the data is TLS encrypted. 

As soon as the data arrives at the storage location, it is no longer encrypted. Depending on the storage type used, security measures such as multi-factor authentication and role based access control can help to ensure that only designated researchers can access this location and define the rights they have here. Again, the DPIA can help reflect on the security measures taken regarding data storage and a processing agreement between the institution and the party providing the data storage is required.

Prior to performing analysis, the research might want to link the data to other sources, such as obtained through a questionnaire. They can either export the data so that they can store all data together, or they could allow an analysis platform access to the storage location.

There are various ways to configure both the tool hosting and data storage. They can be highly tailored and making use of tools only available at specific institutes, or they can make use of generic infrastructure, such as SURF, which is available for all researchers in the Netherlands. Alternatively, for example Eyra Leap B.V. provides managed hosting solutions for researchers without technical expertise. Note that regardless of the option that is chosen, a DPIA and processing agreements are always required to reflect on the level of sensitive information being collected with respect to the security measures taken.
