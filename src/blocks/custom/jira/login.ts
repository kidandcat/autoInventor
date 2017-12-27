type Params = {
  url: string;
  user: string;
  pass: string;
};

export const data = {
  code: (params: Params) => `
    await page.goto("https://${params.url}/login.jsp");
    await page.type("#login-form-username", "${params.user}");
    await page.type("#login-form-password", "${params.pass}");
    await page.click("#login-form-submit");
    await page.waitFor(3000);
  `,
  dependencies: [`import { Page } from "puppeteer";`]
};
