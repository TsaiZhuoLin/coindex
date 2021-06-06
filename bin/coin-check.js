const program = require("commander");
const check = require("../commands/check");

program
    .command("price")
    .description("Check price of coins")
    .option(
        "--coin <type>",
        "Add specific coin types in CSV format",
        "BTC,ETH,LTC,XRP,BCH,MITH,LINK,DOGE",
    )
    .option("--cur <currency>", "Change the currency", "TWD")
    .action(cmd => check.price(cmd));

program.parse(process.argv);
