const { spawn } = require("child_process");

function demoRoutine(generateCtrlC) {
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

  process.stdin.setRawMode(true);
  process.stdin.on("data", async data => {
    if (data.toString("utf8") === "\u0003") {
      process.stdin.destroy(); // destroy stdin so process can exit naturally after child processes exit
      console.log("calling function...");
      let result;
      let error;
      try {
        const maybePromise = generateCtrlC();
        result = isPromise(maybePromise) ? await maybePromise : maybePromise;
      } catch (_error) {
        error = _error;
      }
      console.log("called function", { result, error });
    }
  });
}

function isPromise(maybePromise) {
  return (
    typeof maybePromise === "object" &&
    maybePromise !== null &&
    typeof maybePromise.then === "function"
  );
}

module.exports = { demoRoutine };
