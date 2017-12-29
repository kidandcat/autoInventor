export type Params = {
  ticketID: string;
  jiraHost: string;
};

export const data = {
  code: (params: Params) => `
    await page.goto(
      "https://${params.jiraHost}/browse/${params.ticketID}"
    );
  
    await page.evaluate(() => {
      return {
        shortDescription: document.querySelector("#summary-val").innerText,
        longDescription: document.querySelector("#description-val").innerText,
        assignee: document.querySelector("#assignee-val").innerText
      };
    });
  `,
  dependencies: [`import { Page } from "puppeteer";`]
};
