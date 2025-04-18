const { REPORT_FOLDER, PARALLEL, RETRIES } = require('./constants.ts')

const commonConfig = {
  format: [`json:${REPORT_FOLDER}/cucumber_report.json`],
  paths: ['features/**/*.feature'],
  require: ['support/**/*.ts', 'steps/**/*.ts'],
  requireModule: ['ts-node/register'],
  retry: RETRIES,
  parallel: PARALLEL,
}

const allureConfig = {
  ...commonConfig,
  format: [
    'allure-cucumberjs/reporter',
    `json:${REPORT_FOLDER}/cucumber_report.json`,
  ],
}

module.exports = {
  default: commonConfig,
  allure: allureConfig,
  chromium: `--world-parameters '{"browser": "chromium"}'`,
  firefox: `--world-parameters '{"browser": "firefox"}'`,
  webkit: `--world-parameters '{"browser": "webkit"}'`,
  desktop: `--world-parameters '{"device": {"type":"desktop","height":1080,"width":1920}}'`,
  phone: `--world-parameters '{"device": {"type":"phone","height":915,"width":412}}'`,
  tablet: `--world-parameters '{"device": {"type":"tablet","height":1180,"width":820}}'`,
  smoke: `--tags '@smoke1'`,
  regression: `--tags '@regression'`,
}
