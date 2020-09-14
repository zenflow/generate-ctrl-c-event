# generate-ctrl-c-event

Send CTRL_C_EVENT to all processes that share the console of the calling process

__Only works on Windows__

[![npm stats](https://nodei.co/npm/generate-ctrl-c-event.png?compact=true)](http://npmjs.com/package/generate-ctrl-c-event)

<!-- [![CI status](https://img.shields.io/github/workflow/status/zenflow/generate-ctrl-c-event/CI?logo=GitHub&label=CI)](https://github.com/zenflow/generate-ctrl-c-event/actions?query=branch%3Amaster) -->
[![dependencies status](https://img.shields.io/david/zenflow/generate-ctrl-c-event)](https://david-dm.org/zenflow/generate-ctrl-c-event)
[![optional dependencies status](https://img.shields.io/david/optional/zenflow/generate-ctrl-c-event)](https://david-dm.org/zenflow/generate-ctrl-c-event?type=optional)
[![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability-percentage/zenflow/generate-ctrl-c-event?logo=Code%20Climate)](https://codeclimate.com/github/zenflow/generate-ctrl-c-event)
[![LGTM alerts](https://img.shields.io/lgtm/alerts/github/zenflow/generate-ctrl-c-event?logo=lgtm)](https://lgtm.com/projects/g/zenflow/generate-ctrl-c-event/)
[![Known Vulnerabilities](https://snyk.io/test/github/zenflow/generate-ctrl-c-event/badge.svg?targetFile=package.json)](https://snyk.io/test/github/zenflow/generate-ctrl-c-event?targetFile=package.json)
[![GitHub issues welcome](https://img.shields.io/badge/issues-welcome-brightgreen.svg?logo=GitHub)](https://github.com/zenflow/generate-ctrl-c-event/issues)
[![GitHub pull requests welcome](https://img.shields.io/badge/pull%20requests-welcome-brightgreen.svg?logo=GitHub)](https://github.com/zenflow/generate-ctrl-c-event/pulls)
[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)

Only works on Windows.
Cannot be installed on other platforms due to it's [`package.os`](https://docs.npmjs.com/files/package.json#os).
If you need to use this in cross-platform code,
install it as an [optional dependency](https://docs.npmjs.com/files/package.json#optionaldependencies)
and it will be skipped when installing your package on a non-Windows platforms.

Works by calling [`Kernel32::GenerateConsoleCtrlEvent()`](https://docs.microsoft.com/en-us/windows/console/generateconsolectrlevent),
via either a Foreign Function Interface (FFI) if available,
or a PowerShell script ([`generate-ctrl-c-event.ps1`](./generate-ctrl-c-event.ps1)) as a fallback.

Exports both sync & async functions:

```
function generateCtrlC(): void
function generateCtrlCAsync(): Promise<void>
```
