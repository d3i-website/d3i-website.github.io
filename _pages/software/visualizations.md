---
layout: single-toc-on-top
classes: wide
title: Visualizations
permalink: /software/visualizations/
excerpt: "Show participants what they're sharing with interactive data visualizations"
toc: false
sidebar:
  nav: "software"
---

## Why Add Visualizations?

Visualizations make the data donation experience more engaging and transparent for participants. When people can see visual representations of their data, they:

- **Better understand** what they're about to share
- **Feel more informed** when giving consent
- **Engage more deeply** with the study
- **Have a more positive** overall experience

Visualizations can show anything from word clouds of their most-used words to timelines of their activity patterns.

## Example Visualizations

### Wordcloud

Show participants which words they use most frequently in their messages, posts, or searches:

<img src="/assets/images/visualization_wordcloud.png" alt="Word cloud showing frequently used words">

### Activity Over Time

Display how their usage patterns change over time with area graphs or line charts:

<img src="/assets/images/visualization_area.png" alt="Area graph showing activity over time">

### Other Possibilities

Depending on your platform and research question, you can create visualizations for:

- Top content categories
- Network connections
- Geographic activity maps
- Interaction patterns
- Content consumption trends

## Adding Visualizations to Your Study

Visualizations are built into the data donation task. When you set up your extraction script, you can specify which visualizations to show participants before they donate their data.

### Getting Started

Our [technical documentation](https://d3i-infra.github.io/data-donation-task/getting_started/visualizations.html) provides step-by-step instructions for:

- Creating different types of charts and graphs
- Customizing colors and styling
- Processing data for visualization
- Displaying multiple visualizations

### Common Visualization Types

**Tables** - Simple, clear presentation of extracted data fields

**Word clouds** - Frequency-based visualization of text data

**Line charts** - Trends over time

**Bar charts** - Category comparisons

**Area graphs** - Cumulative patterns

**Network diagrams** - Connection mapping

## Design Considerations

When planning visualizations for your study:

**Keep it simple** - Participants should understand the visualization at a glance

**Respect privacy** - Don't display sensitive information that participants might not want to see

**Be honest** - Show data accurately without manipulation

**Make it relevant** - Visualize data that participants will find interesting or useful

**Test thoroughly** - Make sure visualizations work with different data volumes and formats

## Need Help?

Creating custom visualizations requires some Python programming. If you need assistance:

- Review our [technical documentation](https://d3i-infra.github.io/data-donation-task/getting_started/visualizations.html)
- Check out examples in our [community scripts](/software/ready-made-scripts/)
- [Contact our team](/software/help/) for custom development support

## Next Steps

- **Explore [plugins](/software/plugins/)** for additional interactive features
- **Review [completed projects](/prepare-a-study/completed-projects/)** to see visualizations in action
- **Get started** with our [ready-made scripts](/software/ready-made-scripts/) that include built-in visualizations
