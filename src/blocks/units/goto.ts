type Params = {
  url: string;
};

export const goto = {
  code: (params: Params) => `
    await page.goto("${params.url}");
  `,
  dependencies: [`import { Page } from "puppeteer";`]
};
