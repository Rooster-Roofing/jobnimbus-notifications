const axios = require('axios');

// Get the webhook URL and payload from environment variables
const gchatWebhookUrl = process.env.GCHAT_WEBHOOK_URL;
const jobnimbusPayload = JSON.parse(process.env.JOBNIMBUS_PAYLOAD);

// Extract data from the JobNimbus payload
const contactName = jobnimbusPayload.contact_name;
const jobAddress = jobnimbusPayload.job_address;
const documentLink = jobnimbusPayload.document_link;

// Construct the Google Chat card message
const gchatMessage = {
  cards: [
    {
      header: {
        title: "New Document Created in JobNimbus",
        subtitle: `${contactName} – ${jobAddress}`,
        imageUrl: "https://ik.imagekit.io/roosterroofing/Untitled%20design%20(13).png?updatedAt=1752077429449",
        imageStyle: "IMAGE"
      },
      sections: [
        {
          widgets: [
            {
              textParagraph: {
                text: "A new document has been created for this job."
              }
            },
            {
              buttons: [
                {
                  textButton: {
                    text: "VIEW DOCUMENT",
                    onClick: {
                      openLink: {
                        url: documentLink
                      }
                    }
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

// Send the message to Google Chat
axios.post(gchatWebhookUrl, gchatMessage)
  .then(response => {
    console.log('Successfully sent Google Chat notification');
  })
  .catch(error => {
    console.error('Error sending Google Chat notification:', error);
  });
