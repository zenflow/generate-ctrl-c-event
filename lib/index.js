const { GenerateConsoleCtrlEvent } = require("./GenerateConsoleCtrlEvent");

function assertPlatformIsWindows() {
  if (process.platform !== "win32") {
    throw new Error("generate-ctrl-c-event: Cannot be used on any platform other than Windows");
  }
}

function generateCtrlC() {
  assertPlatformIsWindows();
  return GenerateConsoleCtrlEvent.sync(0, 0);
}

async function generateCtrlCAsync() {
  assertPlatformIsWindows();
  return GenerateConsoleCtrlEvent.async(0, 0);
}

function generateCtrlBreak(dwProcessGroupId = 0) {
  assertPlatformIsWindows();
  return GenerateConsoleCtrlEvent.sync(1, dwProcessGroupId);
}

async function generateCtrlBreakAsync(dwProcessGroupId = 0) {
  assertPlatformIsWindows();
  return GenerateConsoleCtrlEvent.async(1, dwProcessGroupId);
}

module.exports = {
  generateCtrlC,
  generateCtrlCAsync,
  generateCtrlBreak,
  generateCtrlBreakAsync,
};
