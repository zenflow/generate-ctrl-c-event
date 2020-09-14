const { ffi, ps } = require("./internal");

function assertPlatformIsWindows() {
  if (process.platform !== "win32") {
    throw new Error("generate-ctrl-c-event: Cannot be used on any platform other than Windows");
  }
}

function generateCtrlC() {
  assertPlatformIsWindows();
  return ffi ? ffi.sync() : ps.sync();
}

async function generateCtrlCAsync() {
  assertPlatformIsWindows();
  return ffi ? ffi.async() : ps.async();
}

module.exports = {
  generateCtrlC,
  generateCtrlCAsync,
};
