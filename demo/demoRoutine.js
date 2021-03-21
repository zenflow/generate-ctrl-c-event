const { spawn } = require("child_process");
const { promisify } = require("util");

const delay = promisify(setTimeout);

function demoRoutine(callback) {
  const child = spawn(
    "node",
    [
      "-e",
      "console.log('child started');" +
        "setInterval(() => {}, 1000);" +
        "process.on('SIGINT', () => {" +
        "console.log('child received SIGINT');" +
        "process.exit();" +
        "})",
    ],
    { stdio: ["ignore", "inherit", "inherit"] },
  );
  child.on("exit", () => console.log("child exited"));
  process.on("SIGINT", () => console.log("parent received SIGINT"));
  delay(1000).then(async () => {
    console.log("calling function...");
    let result, error;
    try {
      result = await callback();
    } catch (_error) {
      error = _error;
    }
    console.log("called function", { result, error });
  });
}

module.exports = { demoRoutine };
