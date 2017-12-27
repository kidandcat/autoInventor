import * as puppeteer from "puppeteer";
import * as pg from "progress";
import { Work } from "../blocks/work";
import { jira_getTicketData, jira_login } from "../blocks/custom/jira";

const blocks = { jira_getTicketData, jira_login };

export type Task = {
  action: string;
  params: {};
};

export async function run(taskName: string, actions: Task[]) {
  const tasks: Array<any> = [];
  const dependencies: Array<any> = [];
  actions.forEach(a => {
    tasks.push(blocks[a.action].code(a.params));
    dependencies.push(blocks[a.action].dependecies);
  });
  const code = Work({
    taskName,
    tasks,
    dependencies
  });

  const progress = pg;

  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 15
  });
  const page = await browser.newPage();

  console.log("CODE:", code);
  eval(code);
}
