const { ffiC, psC, ffiBreak, psBreak } = require("./internal");

function assertPlatformIsWindows() {
  if (process.platform !== "win32") {
    throw new Error("generate-ctrl-c-event: Cannot be used on any platform other than Windows");
  }
}

function generateCtrlC() {
  assertPlatformIsWindows();
  return ffiC ? ffiC.sync() : psC.sync();
}

async function generateCtrlCAsync() {
  assertPlatformIsWindows();
  return ffiC ? ffiC.async() : psC.async();
}

function generateCtrlBreak() {
  assertPlatformIsWindows();
  return ffiBreak ? ffiBreak.sync() : psBreak.sync();
}

async function generateCtrlBreakAsync() {
  assertPlatformIsWindows();
  return ffiBreak ? ffiBreak.async() : psBreak.async();
}

module.exports = {
  generateCtrlC,
  generateCtrlCAsync,
  generateCtrlBreak,
  generateCtrlBreakAsync,
};
