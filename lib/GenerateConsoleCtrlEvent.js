const cp = require("child_process");
const path = require("path");
const { promisify } = require("util");

let kernel32;
try {
  kernel32 = require("ffi-napi").Library("kernel32.dll", {
    GenerateConsoleCtrlEvent: ["int", ["uint32", "uint32"]],
  });
} catch (error) {}

function wrapSyncAndAsyncFunctions(syncFn, asyncFn, transformArgs, transformResult) {
  return {
    sync: (...args) => transformResult(syncFn(...transformArgs(args))),
    async: (...args) => asyncFn(...transformArgs(args)).then(transformResult),
  };
}

const GenerateConsoleCtrlEvent = kernel32
  ? wrapSyncAndAsyncFunctions(
      kernel32.GenerateConsoleCtrlEvent,
      promisify(kernel32.GenerateConsoleCtrlEvent.async),
      (args) => args,
      Boolean,
    )
  : wrapSyncAndAsyncFunctions(
      cp.execFileSync,
      (...args) => promisify(cp.execFile)(...args).then(({ stdout }) => stdout),
      (args) => [
        "powershell.exe",
        [
          "-ExecutionPolicy",
          "Bypass",
          "-File",
          path.join(__dirname, "..", "generate-ctrl-event.ps1"),
          ...args,
        ],
        { stdio: ["ignore", "pipe", "pipe"] },
      ],
      (buffer) => {
        const string = buffer.toString("utf8").trim().toLowerCase();
        // if (!["", "true", "false"].includes(string))
        // throw new Error(`Unexpected result: ${JSON.stringify(string)}`);
        return string !== "false";
      },
    );

module.exports = { GenerateConsoleCtrlEvent };
