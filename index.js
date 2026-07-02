function parse(input) {

    // Validate input
    if (!input.startsWith("now()")) {
        throw new Error("Invalid input. Expression must start with now().");
    }

    // Current UTC date
    let date = new Date();

    // Remove "now()"
    const expression = input.substring(5);

    // Allow just "now()"
    if (expression === "") {
        return date;
    }

    // Match +1d, -2h, +10mon, etc.
    const regex = /([+-])(\d+)(mon|y|d|h|m|s)/g;

    let match;

    while ((match = regex.exec(expression)) !== null) {

        const operator = match[1];
        const value = parseInt(match[2], 10);
        const unit = match[3];

        switch (unit) {

            case "s":
                date.setUTCSeconds(
                    date.getUTCSeconds() + (operator === "+" ? value : -value)
                );
                break;

            case "m":
                date.setUTCMinutes(
                    date.getUTCMinutes() + (operator === "+" ? value : -value)
                );
                break;

            case "h":
                date.setUTCHours(
                    date.getUTCHours() + (operator === "+" ? value : -value)
                );
                break;

            case "d":
                date.setUTCDate(
                    date.getUTCDate() + (operator === "+" ? value : -value)
                );
                break;

            case "mon":
                date.setUTCMonth(
                    date.getUTCMonth() + (operator === "+" ? value : -value)
                );
                break;

            case "y":
                date.setUTCFullYear(
                    date.getUTCFullYear() + (operator === "+" ? value : -value)
                );
                break;

            default:
                throw new Error("Unsupported time unit.");
        }
    }

    return date;
}

// ----------------------
// Test Cases
// ----------------------

console.log("Example 1:", parse("now()+1d").toISOString());

console.log("Example 2:", parse("now()+8d").toISOString());

console.log("Example 3:", parse("now()+10d+12h").toISOString());

console.log("Example 4:", parse("now()-2d+12h").toISOString());

console.log("Example 5:", parse("now()+30m").toISOString());

console.log("Example 6:", parse("now()+45s").toISOString());

console.log("Example 7:", parse("now()+2mon").toISOString());

console.log("Example 8:", parse("now()+1y").toISOString());

console.log("Example 9:", parse("now()").toISOString());

try {
    console.log(parse("today()+1d"));
} catch (err) {
    console.log(err.message);
}