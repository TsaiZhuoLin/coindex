const program = require("commander")
const key = require("../commands/key")

program
    .command("set")
    .description("Set API Key -- Get at https://nomics.com")
    .action(key.set)

program.command("show").description("Show API Key").action(key.show)

program.command("rm").description("Remove API Key").action(key.rm)

program.parse(process.argv)
