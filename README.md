# React DataDog

[![version](https://img.shields.io/npm/v/react-datadog.svg)](https://www.npmjs.com/package/react-datadog)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/react-datadog.svg)](https://www.npmjs.com/package/react-datadog)
[![downloads](https://img.shields.io/npm/dt/react-datadog.svg)](https://www.npmjs.com/package/react-datadog)
[![GitHub Action: Push](https://github.com/CharlesStover/react-datadog/actions/workflows/push.yml/badge.svg)](https://github.com/CharlesStover/react-datadog/actions/workflows/push.yml)

`react-datadog` is a collection of React utility components and hooks for
instantiating DataDog RUM in your React application.

## Install

- `npm install react-datadog` or
- `yarn add react-datadog`

## Use

```javascript
import DataDog from 'react-datadog';
import { render } from 'react-dom';
import { App } from './components';

render(
  <DataDog
    applicationId="a0b1c2d3-e4f5-a6b7-c8d9-e0f1a2b3c4d5"
    clientToken="puba0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5"
    service="my-service"
    sessionReplayRecording
  >
    <App />
  </DataDog>,
  document.getElementById('root'),
);
```

## Exports

### `<DataDog />`

```javascript
import DataDog from 'react-datadog';'
```

In addition to the RUM init configuration, the `<DataDog />` component also
accepts additional props:

#### `enabled`

Type: `boolean` (default: `true`)

Unless explicitly set to `false`, the `<DataDog />` component will automatically
initialize on mount.

#### `sessionReplayRecording`

Type: `boolean` (default: `true`)

Unless explicitly set to `false`, the `<DataDog />` component will automatically
start session replay recording on mount (and stop session replay recording on
unmount).

### `useDataDogRum`

```javascript
import { useDataDogRum } from 'react-datadog';
```

The `useDataDogRum` hook returns the DataDog RUM object. While this is currently
equivalent to `import { datadogRum } from '@datadog/browser-rum';`, this hook
allows future extensibility with integrating with your `<DataDog />` component's
prop configuration.

### Privacy levels

```javascript
import {
  DataDogAllow,
  DataDogHidden,
  DataDogMask,
  DataDogMaskUserInput,
} from 'react-datadog';
```

You may import the utility components `DataDogAllow`, `DataDogHidden`,
`DataDogMask`, and `DataDogMaskUserInput` to mask or unmask user data. These
utility components simply render HTML `<span />`s around their contents.

## Contributing

- `yarn set version latest`
- `yarn up * @*/*`
- If you use VIM, run `yarn sdks vim`.
- If you use Visual Studio Code, run `yarn sdks vscode`.
