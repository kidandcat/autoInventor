type Params = {
  time: string;
};

export const wait = {
  code: (params: Params) => `
    await page.waitFor(${params.time});
  `,
  dependencies: [`import { Page } from "puppeteer";`]
};
