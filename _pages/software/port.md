---
layout: single-toc-on-top
classes: wide
title: Our software
permalink: /software/Port
toc: false
sidebar:
  nav: "software"
---

<div class="notice--info">
  <h4>If you use our software for your research, please cite:</h4>
  <p> Boeschoten, L., De Schipper, N.C., Mendrik, A.M., Van der Veen, E., 
  Struminskaya, B., Janssen, H. and Araujo, T. (2023). Port: A software tool for 
  digital data donation. Journal of Open Source Software, 8(90), 5596, 
  <a href="https://doi.org/10.21105/joss.05596">https://doi.org/10.21105/joss.05596</a></p>
</div>


## How does our data donation software "Port" work?

Our software for data donation is called **Port**. Port consists of a number of 
elements, that together allow you to configure a data donation study according to 
the workflow explained under the tab [data donation](/data-donation/).

<div style="text-align: center; width: 100%; margin: 0 auto;">
  <div class="svg-container"> 
    <img src="/assets/images/port.svg" alt="Architecture diagram"> 
  </div>
</div>

Port allows you to configure all elements that are important in a data donation study, such as: 
* A consent form;
* A privacy statement;
* Instructions on how participants can request and download their data;
* A questionnaire; and most importantly: 
* A [data donation task](software/data-donation-task).

You can find more information about how you can use Port for your research [here](/software/next). If you need any help, see [this](software/help) page. 



## The data donation task

The most important part of a study that follows the data donation workflow is 
the "data donation task". This is the step that facilitates that participants 
can actually donate their data.

Since every study is interested in different platforms to collect data from, or 
in different parts of the data of a platform, the "data donation task" is an 
application that you can create yourself using a Python script. [Here](https://github.com/d3i-infra/data-donation-task) you can 
find the Github repository of the Data Donation Task. Read [this](https://d3i-infra.github.io/data-donation-task/) documentation to
get started with the Data Donation Task.

## The Next platform 

Port is available as a software service on the open-source [Next](https://next.eyra.co/) platform.
So in order to use Port, you need access to Next. There are multiple ways you can access Next:

* Purchase a Software-as-a-Service license at [Eyra](https://www.eyra.co/projects/data-donation).
* Use Next on Surf Research Cloud through a [SURF e-infra grant](https://www.surf.nl/en/access-to-compute-services), 
contact [Laura Boeschoten](https://www.uu.nl/medewerkers/LBoeschoten) for more information.
* Host Next yourself.

Look at the decision tree to decide which option fits your project best. 

<div style="text-align: center; width: 100%; margin: 0 auto;">
  <div class="svg-container"> 
    <img src="/assets/images/beslisboom.svg" alt="When to use Port diagram"> 
  </div>
</div>


## Support 

Are you interested in doing a data donation study? We can help you! 

We: 
- Prepare the Data Donation Task for your study.
- Offer support if you create your own Data Donation Task. 
- Have a community of developers that you can join on Basecamp and Slack. 

Email [Laura Boeschoten](https://www.uu.nl/medewerkers/LBoeschoten) in case you are interested. 



