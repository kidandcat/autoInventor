type Params = {
  taskName: string;
  tasks: string[];
  dependencies: string[];
};

export const Work = (params: Params) => `
    ${params.dependencies
      .filter((item, pos) => {
        return params.dependencies.indexOf(item) == pos;
      })
      .join("\n")}

    (async () => {
        const bar = new progress(\`Working ${
          params.taskName
        }: [:bar] :percent %\`, {
          total: ${params.tasks.length},
          width: 200,
          complete: "=",
          incomplete: " "
        });

        ${params.tasks.join("\nbar.tick();\n")}
        bar.tick();

        await browser.close();
    })();`;
