# Resolving Multiple Line Creation in Monday.com from Jotform Submissions using Make.com
## Overview
The integration of Jotform and Monday.com is a common requirement for businesses to streamline their data collection and project management processes. However, users often encounter an issue where each new submission in Jotform creates a new line in Monday.com, resulting in duplicated or unnecessary entries. This Standard Operating Procedure (SOP) aims to resolve this issue by providing a step-by-step guide on how to configure the integration using Make.com, a popular automation platform.

## Error Diagnostic
The core error lies in the lack of aggregation or grouping logic in the automation workflow, causing each new item in Jotform to create a separate line in Monday.com. The root cause can be attributed to the following factors:
- Insufficient data mapping between Jotform and Monday.com
- Inadequate filtering or conditional logic in the automation workflow
- Incorrect configuration of the Monday.com API connection

## Step-by-Step Resolution
### Step 1: Connect Jotform and Monday.com to Make.com
Create a new scenario in Make.com and connect your Jotform and Monday.com accounts using the respective modules. Ensure that you have the necessary permissions and API credentials to establish the connections.
### Step 2: Configure the Jotform Module
Set up the Jotform module to retrieve new submissions, and map the relevant fields to the Monday.com module. Use the "Get a submission" or "Get submissions" action to fetch the required data.
### Step 3: Implement Aggregation Logic
Use the "Array aggregator" or "Array filter" module in Make.com to group or filter the submissions based on specific conditions, such as submission ID or timestamp. This will help to prevent duplicate entries in Monday.com.
### Step 4: Configure the Monday.com Module
Set up the Monday.com module to create a new item or update an existing one based on the aggregated data from Jotform. Use the "Create an item" or "Update an item" action to push the data to Monday.com.
### Step 5: Verify the Integration
Test the integration by submitting a new form in Jotform and verifying that the data is correctly aggregated and pushed to Monday.com. Monitor the workflow for any errors or issues and adjust the configuration as needed.

## Next Steps
To avoid manual setup and streamline the integration process, we recommend deploying the flow directly using Make.com. Register for a Make.com account using our affiliate link: https://www.make.com/en/register?pc=shivamautomations, and take advantage of their intuitive interface and extensive library of modules to automate your workflows.

## Frequently Asked Questions
* Q: What is the difference between Make.com and Zapier?
A: Make.com and Zapier are both automation platforms, but they offer different features, pricing plans, and integration capabilities. Make.com is known for its advanced features and customization options, while Zapier is popular for its user-friendly interface and extensive library of pre-built zaps.
* Q: Can I use a custom script to resolve the integration issue?
A: Yes, you can use a custom script to resolve the integration issue, but it requires advanced programming knowledge and may not be as efficient as using a dedicated automation platform like Make.com.
* Q: How do I troubleshoot issues with my Make.com workflow?
A: You can troubleshoot issues with your Make.com workflow by checking the error logs, monitoring the workflow execution, and adjusting the configuration as needed. Make.com also offers extensive documentation and support resources to help you resolve common issues.