# Resolving Incorrect Calculation of Hours Elapsed in Make.com for Unanswered Reservation Emails
## Overview
The integration of Google Sheets, Make.com, and Telegram is a common scenario for automating business workflows, such as monitoring unanswered reservation emails. However, users often encounter issues when trying to calculate the time elapsed between a value stored in Google Sheets and the current time in Make.com. This pain point can lead to incorrect filtering and alerting in the email watchdog scenario, resulting in delayed or missed responses to customers.

## Error Diagnostic
The core error lies in the incorrect calculation of hours elapsed between a value stored in Google Sheets and the current time in Make.com. This is due to Google Sheets returning values as quoted strings, which cannot be directly used in arithmetic operations in Make.com. The root cause is likely the inability to convert the quoted string to a number or date object before performing calculations, leading to incorrect filtering and alerting.

## Step-by-Step Resolution
### Step 1: Configure Google Sheets to Return Date Values
To resolve the issue, first, ensure that the date values in Google Sheets are formatted correctly. Use the `TO_DATE` function in Google Sheets to convert the quoted strings to date objects.

### Step 2: Use Make.com's Date and Time Module
In Make.com, use the Date and Time module to convert the date string from Google Sheets to a date object. This will allow you to perform arithmetic operations on the date values.

### Step 3: Calculate the Time Elapsed
Use the `DIFFERENCE` function in Make.com to calculate the time elapsed between the date value from Google Sheets and the current time. This will give you the correct number of hours elapsed.

### Step 4: Configure the Filter Condition
Configure the filter condition in Make.com to use the calculated time elapsed. Set the condition to trigger the Telegram alert if the time elapsed is greater than 12 hours.

### Step 5: Verify the Flow
Verify the flow by testing it with sample data. Ensure that the filter condition is working correctly and that the Telegram alert is triggered when the time elapsed is greater than 12 hours.

## Next Steps
To avoid manual setup and configuration, deploy the flow directly using Make.com. [Register for a Make.com account](https://www.make.com/en/register?pc=shivamautomations) and take advantage of the intuitive interface and pre-built modules to automate your business workflows.

## Frequently Asked Questions
* Q: What is the correct format for date values in Google Sheets?
A: The correct format for date values in Google Sheets is `YYYY-MM-DD HH:MM:SS`.
* Q: How do I convert a quoted string to a date object in Make.com?
A: Use the Date and Time module in Make.com to convert the quoted string to a date object.
* Q: What is the purpose of the DIFFERENCE function in Make.com?
A: The DIFFERENCE function in Make.com is used to calculate the time elapsed between two date values.