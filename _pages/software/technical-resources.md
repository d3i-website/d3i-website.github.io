---
layout: single-toc-on-top
classes: wide
title: Technical Resources
permalink: /software/technical-resources/
excerpt: "Developer documentation and technical details for advanced Port users"
toc: true
sidebar:
  nav: "software"
redirect_from:
  - /software/data-donation-task/
---

## For Developers and Advanced Users

This page provides technical resources for researchers who want to customize Port beyond our ready-made scripts or develop their own data extraction solutions.

## Core Documentation

### Data Donation Task

The data donation task is the core Python application that processes participant data. Full technical documentation is available:

**[Data Donation Task Documentation](https://d3i-infra.github.io/data-donation-task/)**

This documentation covers:

- Setting up your development environment
- Creating custom extraction scripts
- Implementing visualizations
- Adding interactive features
- Testing and debugging
- Deployment considerations

### GitHub Repository

Access the source code and contribute to development:

**[Data Donation Task on GitHub](https://github.com/d3i-infra/data-donation-task)**

The repository includes:

- Complete source code
- Example scripts
- Issue tracking
- Contribution guidelines
- Version history

## Creating Custom Scripts

If our ready-made scripts don't meet your needs, you can create your own extraction scripts for any platform.

### What You'll Need

**Technical skills:**
- Python programming
- Understanding of JSON/CSV data formats
- Basic knowledge of data structures

**Resources:**
- Sample data download package from your target platform
- Port development environment
- Our documentation and examples

### Development Process

1. **Analyze the platform's data format** - Request your own DDP and examine its structure
2. **Design your extraction logic** - Decide what data to extract and how to process it
3. **Write the extraction script** - Use Python to parse and transform the data
4. **Add visualizations** (optional) - Create charts or graphs for participants
5. **Test thoroughly** - Try with multiple DDPs to ensure robustness
6. **Deploy** - Upload your script to Port

### Code Examples

Our [community scripts repository](/software/ready-made-scripts/) provides numerous examples of custom extraction scripts for different platforms and use cases.

## Hosting Port Yourself

Port runs on the open-source Next platform. If you want complete control and have technical resources, you can host Port on your own infrastructure.

### Requirements

**Infrastructure:**
- Web server with Python support
- Database (PostgreSQL recommended)
- SSL certificate for HTTPS
- Backup systems

**Technical expertise:**
- System administration
- Web server configuration
- Security best practices
- Database management

### Documentation

Complete hosting documentation is available through the Next platform:

**[Next Platform Documentation](https://next.eyra.co/)**

## API and Integrations

Port can integrate with other research systems:

**Survey platforms** - Link Port with Qualtrics, LimeSurvey, or other tools

**Data storage** - Configure custom storage backends

**Analysis pipelines** - Export data in various formats for processing

Contact our team for documentation on specific integration needs.

## Data Formats and Standards

Port processes data download packages (DDPs) from various platforms. Each platform has its own format:

**JSON** - Most social media platforms (Instagram, Facebook, TikTok)

**CSV** - Streaming services (Netflix), professional networks (LinkedIn)

**Text files** - Messaging apps (WhatsApp)

**JavaScript** - Some platforms export data as .js files (X/Twitter)

Understanding these formats is essential for creating custom extraction scripts.

## Security Considerations

When developing for Port:

**Local processing** - All data processing happens on participants' devices

**No server transmission** - Participants' raw DDPs never leave their device

**Encryption** - Use HTTPS for all communications

**Access control** - Implement proper authentication and authorization

**Data minimization** - Extract only necessary data fields

**Audit trails** - Log all data handling activities

## Community Resources

### Developer Community

Join our developer community on Basecamp and Slack to:

- Ask technical questions
- Share scripts and solutions
- Collaborate on features
- Stay updated on Port development

[Request access through our help page](/software/help/)

### Contributing

We welcome contributions to Port:

- Bug reports and fixes
- New platform scripts
- Documentation improvements
- Feature proposals

See the [GitHub repository](https://github.com/d3i-infra/data-donation-task) for contribution guidelines.

## Support for Technical Issues

Need help with technical implementation?

**Documentation first** - Check our comprehensive documentation

**Community support** - Ask in our developer community

**Direct assistance** - [Contact our team](/software/help/) for complex issues

**Custom development** - We offer paid support for custom script development

## Stay Updated

Port is actively developed. Stay current with:

- **Release notes** - Track new features and bug fixes
- **Newsletter** - Major updates and community news
- **GitHub** - Watch the repository for technical updates

## Related Resources

- **[Getting Started](/software/getting-started/)** - High-level overview of Port
- **[Ready-Made Scripts](/software/ready-made-scripts/)** - Example implementations
- **[Visualizations](/software/visualizations/)** - Creating data visualizations
- **[Interactive Features](/software/plugins/)** - Adding questionnaires and multi-file support
