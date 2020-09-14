const cp = require("child_process");
const path = require("path");
const { promisify } = require("util");

let kernel32;
try {
  kernel32 = require("ffi-napi").Library("kernel32.dll", {
    GenerateConsoleCtrlEvent: ["int", ["uint32", "uint32"]],
  });
} catch (error) {}

function wrapSyncAndAsyncFunctions(syncFn, asyncFn, args, transformResult) {
  return {
    sync: () => transformResult(syncFn(...args)),
    async: () => asyncFn(...args).then(transformResult),
  };
}

const ffi =
  kernel32 &&
  wrapSyncAndAsyncFunctions(
    kernel32.GenerateConsoleCtrlEvent,
    promisify(kernel32.GenerateConsoleCtrlEvent.async),
    [0, 0],
    Boolean,
  );

const ps = wrapSyncAndAsyncFunctions(
  cp.execFileSync,
  (...args) => promisify(cp.execFile)(...args).then(({ stdout }) => stdout),
  [
    "powershell.exe",
    ["-File", path.join(__dirname, "..", "generate-ctrl-c-event.ps1")],
    { stdio: ["ignore", "pipe", "pipe"] },
  ],
  buffer => {
    const string = buffer
      .toString("utf8")
      .trim()
      .toLowerCase();
    /* if (!["", "true", "false"].includes(string))
      throw new Error(`Unexpected result: ${JSON.stringify(string)}`); */
    return string !== "false";
  },
);

module.exports = { ffi, ps };
