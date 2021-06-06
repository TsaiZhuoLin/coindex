const axios = require("axios");
const colors = require("colors");

class CryptoAPI {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = "https://api.nomics.com/v1/currencies/ticker";
    }

    async getPriceData(coinOption, curOption) {
        try {
            // formatter for currency
            const formatter = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: curOption,
            });

            const addSpace = length => {
                let space = "";
                let totalSpace = length <= 11 ? 16 - length : 16 - length;
                for (let i = 0; i < totalSpace; i++) {
                    space = space + " ";
                }
                return space;
            };

            const res = await axios.get(
                `${this.baseUrl}?key=${this.apiKey}&ids=${coinOption}&convert=${curOption}`,
            );

            let output = "";

            res.data.forEach(coin => {
                const checkLength = coin.symbol.length === 3;
                const formatedPrice = formatter.format(coin.price);
                const getPrefix3Chars = formatedPrice.slice(0, 3);
                const getPrice = formatedPrice.slice(3, formatedPrice.length);

                output += `Coin: ${coin.symbol.yellow}${
                    checkLength ? " " : ""
                } | Price: ${getPrefix3Chars.green}${addSpace(
                    formatedPrice.length,
                )}${getPrice.green}| Rank: ${coin.rank.blue}\n`;
            });

            return output;
        } catch (err) {
            handleAPIError(err);
        }
    }
}

function handleAPIError(err) {
    console.log(`this is err =>`, err);
    if (err.response.status === 401) {
        throw new Error("Your API Key is invalid - Go to https://nomics.com");
    } else if (err.response.status === 404) {
        throw new Error("Your API is not responding");
    } else {
        throw new Error("Something is not working");
    }
}

module.exports = CryptoAPI;
