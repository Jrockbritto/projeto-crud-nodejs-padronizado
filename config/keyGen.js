"use strict";
const generateApiKey = require('generate-api-key');
const fs = require('fs');
const os = require('os');
function setEnvValue(key, value) {
    const ENV_VARS = fs.readFileSync("./.env", "utf8").split(os.EOL);
    const target = ENV_VARS.indexOf(ENV_VARS.find((line) => {
        return line.match(new RegExp(key));
    }));
    ENV_VARS.splice(target, 1, `${key}=${value}`);
    fs.writeFileSync("./.env", ENV_VARS.join(os.EOL));
}
const app_key = generateApiKey();
setEnvValue("APP_KEY", app_key);
