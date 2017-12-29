export const Blocks = {
  units: [
    {
      action: "click",
      params: ["selector"]
    }
  ],
  custom: [
    {
      action: "jira_getTicketData",
      params: ["ticketID", "jiraHost"]
    },
    {
      action: "jira_login",
      params: ["url", "user", "pass"]
    }
  ]
};
