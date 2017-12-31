export const Blocks = {
  units: [
    {
      action: "click",
      params: ["selector"]
    },
    {
      action: "wait",
      params: ["time"]
    },
    {
      action: "goto",
      params: ["url"]
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
