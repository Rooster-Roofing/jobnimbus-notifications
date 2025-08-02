# JobNimbus Activity to Google Chat Notification

This repository contains a GitHub Actions workflow that receives a webhook from JobNimbus (via a Pipedream proxy) when a specific activity note is created and sends a formatted notification to a Google Chat space.

## 🚀 How It Works

1.  **JobNimbus Automation**: An automation rule triggers when an "Activity is Created" that matches specific keywords (e.g., "Document Created").
2.  **Pipedream Proxy**: JobNimbus sends a webhook with the activity data to a Pipedream workflow. This workflow acts as a secure proxy.
3.  **GitHub Actions Workflow**: Pipedream securely calls this repository's GitHub Actions workflow using a `workflow_dispatch` event, passing along the activity note and the related Job ID.
4.  **Google Chat Notification**: The GitHub Action formats the received data into a card-style message and sends it to the designated Google Chat space.

## 🧱 Setup Guide

### Phase 1: GitHub Setup

1.  **Repository Files**: Ensure your repository contains the `.github/workflows/jobnimbus-webhook.yml` file. The obsolete `send_gchat_notification.js` and `package.json` files should be deleted.
2.  **Create a GitHub Personal Access Token (PAT)**:
    * Go to **Settings > Developer settings > Personal access tokens > Tokens (classic)**.
    * Generate a new token with the `repo` scope.
    * Copy the token immediately. You will need it for Pipedream.
3.  **Add Secrets to this Repository**:
    * Go to **Settings > Secrets and variables > Actions**.
    * Ensure you have a secret named `GCHAT_WEBHOOK_URL` containing the webhook URL for your Google Chat space.

### Phase 2: Pipedream Setup

1.  **Create a Pipedream Workflow**:
    * Go to Pipedream.com and create a new workflow with an **HTTP / Webhook** trigger.
    * Copy the unique webhook URL Pipedream provides.
2.  **Add a Node.js Code Step**:
    * Add a **Run Node.js code** step and use the appropriate script to call the GitHub API `dispatches` endpoint. This script should parse the incoming body from JobNimbus and forward it as a `client_payload` to the GitHub Action.
    * Connect your GitHub account to the step to securely use your PAT.
    * **Deploy** the workflow.

### Phase 3: JobNimbus Setup

1.  **Create the Automation Rule**:
    * **Trigger**: When an **Activity** is **Created**.
    * **Conditions**: If **Type** is equal to **Note** and the note contains your desired keywords (e.g., 'Document Created', 'Document Signed').
    * **Action**: **Webhook POST**.
2.  **Configure the Webhook**:
    * **URL**: Paste the **Pipedream URL** from Phase 2.
    * **Body (Payload)**: Use the following JSON to send the data confirmed by the API documentation:
        ```json
        {
          "note": "{{Note}}",
          "primary": {
            "id": "{{Primary.Id}}"
          }
        }
        ```
3.  **Save** the automation rule.
