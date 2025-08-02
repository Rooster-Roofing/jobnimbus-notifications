# JobNimbus to Google Chat Notification

This repository contains a GitHub Actions workflow that receives a webhook from JobNimbus when a new document is created and sends a formatted notification to a Google Chat space.

## 🚀 How It Works

1.  **JobNimbus Automation**: A JobNimbus automation rule is set up to send a webhook to a specific GitHub repository URL when an "Attachment is Created" of type "Document".

2.  **GitHub Actions Workflow**: The webhook triggers a GitHub Actions workflow. This workflow uses a Node.js script to parse the webhook payload from JobNimbus.

3.  **Google Chat Notification**: The script constructs a formatted card message and sends it to a specified Google Chat webhook URL.

## 🧱 Setup

1.  **Clone this repository** to your own GitHub account.

2.  **Create a GitHub Personal Access Token**:
    * Go to your GitHub **Settings** > **Developer settings** > **Personal access tokens**.
    * Click **Generate new token**.
    * Give the token a name (e.g., "JobNimbus Webhook").
    * Under **Select scopes**, check the `repo` scope.
    * Click **Generate token** and copy the token. You will need this for the JobNimbus webhook URL.

3.  **Add Secrets to your GitHub Repository**:
    * In your repository, go to **Settings** > **Secrets and variables** > **Actions**.
    * Click **New repository secret** and add the following secret:
        * `GCHAT_WEBHOOK_URL`: The webhook URL for your Google Chat space.

4.  **Set up the JobNimbus Webhook**:
    * In JobNimbus, create a new automation rule with the following settings:
        * **Trigger**: When an **Attachment** is **Created**.
        * **Condition**: If **Type** is equal to **Document**.
        * **Action**: **Webhook POST**.
    * For the webhook URL, use the following format:
        ```
        [https://api.github.com/repos/YOUR_USERNAME/YOUR_REPOSITORY/dispatches](https://api.github.com/repos/YOUR_USERNAME/YOUR_REPOSITORY/dispatches)
        ```
        Replace `YOUR_USERNAME` and `YOUR_REPOSITORY` with your GitHub username and repository name.
    * For the webhook headers, add the following:
        * `Authorization`: `token YOUR_GITHUB_PERSONAL_ACCESS_TOKEN`
        * `Accept`: `application/vnd.github.v3+json`
    * For the webhook body, you can pass a JSON payload with the JobNimbus data you want to include in the notification. For example:
        ```json
        {
          "event_type": "jobnimbus_document_created",
          "client_payload": {
            "contact_name": "{{JobPrimaryContactDisplayName}}",
            "job_address": "{{JobAddressLine1}}",
            "document_link": "{{AttachmentFileUrl}}"
          }
        }
        ```

Now, whenever a new document is created in JobNimbus that matches the automation rule, it will trigger the GitHub Actions workflow and send a notification to your Google Chat space.
