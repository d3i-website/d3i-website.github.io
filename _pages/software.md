---
layout: single
title: 'Software'
permalink: /software/
toc: false
---

## Data donation software

### Next

Together with [Eyra](https://eyra.co/) as our software development partner we developed software for researchers to execute data donation studies. 
Eyra developed a software as a service platform for scientific purposes called Next. 
This platform, among other things, allows researcher to log in configure, host and manage their data donation study.

### The data donation task

A very important piece of a data donation study is the data donation task, this is the part of the data donation study where the donation of data by the participant takes place. 
This data donation task is a small web application that can be tailored to the needs of the researcher and needs to be hosted using Next.

Here you can find the [data donation task](https://github.com/d3i-infra/data-donation-task) toolkit, checkout the read me and the wiki articles for more information!

### Eyra

[Eyra](https://eyra.co/) is our main software development partner. The main reason for partnering with Eyra is their perspective on sustainability. 
We want researcher to be able to continue to do data donation studies, even if the researchers and engineers that are currently involved in the Port program are no longer working on the project.


### History of Port and the Port program

The data donation software then called Port. Started as a proof of concept:

Laura Boeschoten, Adriënne Mendrik, Emiel van der Veen, Jeroen Vloothuis, Haili Hu, Roos Voorvaart, Daniel L. Oberski, Privacy-preserving local analysis of digital trace data: A proof-of-concept, Patterns, Volume 3, Issue 3, 2022, 100444, [ISSN 2666-3899](https://doi.org/10.1016/j.patter.2022.100444.)

Port later evolved into fully usable software, see the following paper:

Boeschoten, L., De Schipper, N.C., Mendrik, A.M., Van der Veen, E., Struminskaya, B., Janssen, H. and Araujo, T. (2023). Port: A software tool for digital data donation. Journal of Open Source Software, 8(90), 5596, [https://doi.org/10.21105/joss.05596](https://doi.org/10.21105/joss.05596) 

Port can still be found [here](https://github.com/eyra/port). Port then, is what we now call the data donation task. 
Port was an application that only contained the actual part where got donated.

We soon realized that data donation studies demand more steps for the participant and management from the researcher. Participants need to: consent, see a welcome text, need to have access to a privacy policy, need to receive instructions and so on. And researchers need to configure, host and manage a data donation study. Just the data donation task was not sufficient for the typical use case.

That is why we integrated Port into Next, and called Port, the data donation task. On Next researchers can configure a data donation study, and the data donation task is an item among the multiple items that need to be configured for a data donation study.

Data donation with Next continues as the Port program, everything related to data donation with Next and the accompanying data donation task will be call Port.

