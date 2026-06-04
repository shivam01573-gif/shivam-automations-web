# Resolving JSON Parse Errors with Claude/LLM Output in Make.com Integrations
## Overview
The integration of Anthropic Claude, a large language model (LLM), with Make.com (formerly Integromat) for automation tasks involves parsing JSON output. However, when Claude's output is wrapped in markdown code fences (```json), it causes a `DataError` due to invalid JSON format. This issue affects users of Make.com, Anthropic Claude, WordPress, and other platforms relying on JSON parsing for automation workflows. The error stems from the incompatibility of markdown code fences with the JSON parse module in Make.com.

## Error Diagnostic
The core error, `DataError: Source is not valid JSON`, occurs because the JSON output from Anthropic Claude is enclosed within markdown code fences, which the JSON parse module in Make.com cannot process. Potential root causes include rate limit issues with Anthropic Claude's API, schema mapping problems, or missing authentication scopes in the Make.com configuration. The extracted diagnostics indicate the involvement of multiple software systems, including Make.com, Anthropic Claude, WordPress, and JSON, along with the Text parser module.

## Step-by-Step Resolution
### Step 1: Remove Markdown Code Fences
To resolve the error, first remove the markdown code fences from the JSON output. This can be achieved using a text parser module in Make.com to preprocess the output before it is passed to the JSON parse module.

### Step 2: Configure the Text Parser Module
Configure the text parser module to replace the markdown code fences with empty strings. This step ensures that the output is pure JSON, which can then be successfully parsed.

### Step 3: Verify JSON Parse Module Configuration
Ensure the JSON parse module is correctly configured to parse the preprocessed JSON output. Verify that the module's input is set to the output of the text parser module and that the JSON schema matches the expected structure of the Claude/LLM output.

### Step 4: Test the Workflow
Test the entire workflow to ensure that the JSON output from Anthropic Claude is correctly parsed and that the subsequent automation tasks are executed as expected. Monitor the workflow for any errors and adjust the configuration as necessary.

## Next Steps
To streamline your automation workflows and avoid manual setup complexities, consider deploying your integrations directly using Make.com. By leveraging Make.com's intuitive interface and robust integration capabilities, you can efficiently automate tasks without delving into intricate details. [Register for Make.com today](https://www.make.com/en/register?pc=shivamautomations) and discover how to simplify your B2B automation processes.

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What causes the JSON parse error with Claude/LLM output in Make.com?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The error is caused by markdown code fences in the JSON output, which the JSON parse module cannot process."
      }
    },
    {
      "@type": "Question",
      "name": "How can I resolve the JSON parse error?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Remove markdown code fences using a text parser module, then verify the JSON parse module configuration."
      }
    },
    {
      "@type": "Question",
      "name": "What platforms are affected by this issue?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The issue affects users of Make.com, Anthropic Claude, WordPress, and other platforms relying on JSON parsing for automation workflows."
      }
    }
  ]
}
</script>