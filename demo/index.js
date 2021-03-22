const { demoRoutine } = require("./demoRoutine");
const lib = require("..");

const args = process.argv.slice(2);
const functionName = args[0] ? args[0] : "generateCtrlC";
const functionArg = args[1] ? Number(args[1]) : 0;

demoRoutine(() => lib[functionName](functionArg));
