const { demoRoutine } = require("./demoRoutine");
const lib = require("..");

const args = process.argv.slice(2);
const functionName = args[0];
const functionArg = args[1] && Number(args[1]);

demoRoutine(() => lib[functionName](functionArg));
