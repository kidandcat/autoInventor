type Params = {
  selector: string;
};

export const click = {
  code: (params: Params) => `
    await page.click("${params.selector}");
  `,
  dependencies: [`import { Page } from "puppeteer";`]
};
