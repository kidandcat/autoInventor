type Params = {
  ticketID: string;
  jiraHost: string;
};

export const data = {
  code: (params: Params) => `
    await page.goto(
      "https://${params.jiraHost}/browse/${params.ticketID}"
    );
  
    return await page.evaluate(() => {
      return {
        shortDescription: (<HTMLElement>document.querySelector("#summary-val"))
          .innerText,
        longDescription: (<HTMLElement>document.querySelector("#description-val"))
          .innerText,
        assignee: (<HTMLElement>document.querySelector("#assignee-val")).innerText
      };
    });
  `,
  dependencies: [`import { Page } from "puppeteer";`]
};
