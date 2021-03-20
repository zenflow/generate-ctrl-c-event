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

function getFfiFunctions(ctrlEventCode) {
  return kernel32 &&
    wrapSyncAndAsyncFunctions(
      kernel32.GenerateConsoleCtrlEvent,
      promisify(kernel32.GenerateConsoleCtrlEvent.async),
      [ctrlEventCode, 0],
      Boolean,
    );
}

function getPsFunctions(ctrlEventCode) {
  return wrapSyncAndAsyncFunctions(
    cp.execFileSync,
    (...args) => promisify(cp.execFile)(...args).then(({ stdout }) => stdout),
    [
      "powershell.exe",
      ["-File", path.join(__dirname, "..", "generate-ctrl-event.ps1"),
        ctrlEventCode],
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
}

const ffiC = getFfiFunctions(0);
const psC = getPsFunctions(0);
const ffiBreak = getFfiFunctions(1);
const psBreak = getPsFunctions(1);

module.exports = { ffiC, psC, ffiBreak, psBreak };
