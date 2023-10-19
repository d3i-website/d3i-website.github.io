---
layout: single-toc-on-top
classes: wide
title:  Local extraction
permalink: /prepare-a-study/local-extraction
toc: true
sidebar:
  nav: "prepare-a-study"
---

# Introduction

An essential step in a data donation study is the local extraction procedure. This step ensures that only the data relevant for your research question is extracted from the DDP of the platform of interest. We facilitate local extraction by means of a Python script that you can run within our software Port. Depending on your Python skills, you can consider consulting a research engineer to help you develop this script. 
A local extraction script typically consists of the following elements: 
   1. Read the DDP.
   2. Extract the data of interest. 
   3. Perform processing steps on the extracted data. 
   4. Interactions between the participants and the data. 
   5. Presentation of the output. 

We suggest starting by deciding the exact functionalities you desire at each of these steps. Thoroughly inspect the structure of the DDP of interest, and identify the location of the data of interest within the DDP. Warning: If there is no clear research purpose defined, this becomes an intricate exercise! 
When developing the script, account for the fact that DDPs from different participants can be volatile. To account for these differences and develop a robust script, properly test the script on different DDPs when building it. 

## Building the script

The extraction script starts with reading in the DDP and selecting the files within the DDP for further processing. Note that DDPs can consist of a wide variety of different file types, such as .json, .txt, .html. or .csv. The file type can even differ over DDPs of different participants. For example, when performing a data access request at Facebook, you can choose between .json and .html files. Since .json is the preferred machine readable format, you want to instruct your participants to select .json here. However, participants can make mistakes, so ideally you want your script to be able to handle both file types. Also consider how the script deals with unforeseen file types or incorrect files, i.e. consider your exception handling. Good practices here include logging, alerting participants and making sure the exceptions do not result in errors that abort the entire script. 

Next, the script continues with extracting and processing the data of interest. The level of processing can differ a lot per study, and can range from no processing at all to applying advanced algorithms for processing the data. To illustrate, for RQ2, the social media inferred interests can be extracted from the DDP directly without any processing, while for RQ1 and RQ3, the extracted data can be processed into summary statistics. When you plan to make use of prediction models to extract data from a DDP, consider their performance. Such models rarely have a perfect performance and this can result in errors when processing the data of interest. Also consider providing feedback to participants during the extraction and processing of the data. It can for example take up some time, which you might want to communicate to the participants. 

Potentially, a local interaction between the participant and their DDP can help to extract the data of interests while preserving the privacy of participants. This requires the input from the participant during the local processing step. For example, for RQ3, participants had to select their name from a list of usernames, initially extracted from the WhatsAp chat DDP. Because of this local interaction, the names present in the chat did not have to be saved and the privacy of these people could be preserved, but this would not have been possible without the interaction with the participant.

In the last step of the extract script, the extracted data is formatted in such a way that it can be presented to the participants. The best way to present this depends on the size and type of data that is extracted. The data can be presented in tables, or potentially also in figures. Do note that it is important that participants always have the right to inspect each individual data point that is donated to the researchers. Contact the visualization expert of our team if you want to know more about visualizing the extracted data.

# DDP volatility 

DDPs can differ over participants in terms of structure and content. This can have various causes, for example: 
   - The device type of the participant
   - The operating system of the device 
   - The language setting of the device 
   - Platform feature changes over time 

Once a first draft of the extraction script has been developed, we recommend extensively testing the script. Try to include as many different DDPs as possible.
