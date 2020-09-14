const { demoRoutine } = require("./demoRoutine");
const internal = require("../lib/internal");

const args = process.argv.slice(2);
const method = args[0] || "ffi";
const syncOrAsync = args[1] || "sync";
const fn = internal[method][syncOrAsync];
if (!fn) throw new Error(`Cannot demo unknown function "internal.${method}.${syncOrAsync}"`);
demoRoutine(fn);
