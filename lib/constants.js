const Colors = { None: "\x1b[0m", Bright: "\x1b[1m", Dim: "\x1b[2m", Underscore: "\x1b[4m", Blink: "\x1b[5m", Reverse: "\x1b[7m", Hidden: "\x1b[8m",Black: "\x1b[30m", Red: "\x1b[31m", Green: "\x1b[32m", Yellow: "\x1b[33m", Blue: "\x1b[34m", Magenta: "\x1b[35m", Cyan: "\x1b[36m", White: "\x1b[37m" }

const V_PREFIX = `${Colors.Black}[${Colors.Green}${Colors.Underscore}Routes${Colors.Black}]${Colors.None} `;
const X_PREFIX = `${Colors.Black}[${Colors.Red}${Colors.Underscore}Routes${Colors.Black}]${Colors.None} `;

module.exports = {
    Colors: Colors,
    V_PREFIX: V_PREFIX,
    X_PREFIX: X_PREFIX
}