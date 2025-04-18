import reporter, { Options } from 'cucumber-html-reporter'
import { REPORT_FOLDER } from './constants'

console.log('Generating HTML report...')
var options: Options = {
  theme: 'bootstrap',
  jsonFile: `${REPORT_FOLDER}/cucumber_report.json`,
  output: `${REPORT_FOLDER}/cucumber_report.html`,
  screenshotsDirectory: `${REPORT_FOLDER}/screenshots`,
  storeScreenshots: true,
  noInlineScreenshots: true,
  reportSuiteAsScenarios: false,
  scenarioTimestamp: true,
  ignoreBadJsonFile: true,
  brandTitle: 'Cucumber HTML Report',
  name: 'Cucumber HTML Report',
  columnLayout: 2,
  launchReport: !process.env.CI,
  metadata: {
    'App Version': '0.3.2',
    'Test Environment': 'STAGING',
    Browser: 'Chrome  54.0.2840.98',
    Platform: 'Windows 10',
    Parallel: 'Scenarios',
    Executed: 'Remote',
  },
}

reporter.generate(options)
console.log('Completed HTML report...')
