const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({
  name: 'Keyboard-layout-host-mfe',
  exposes: {
  './StateService': './src/app/common/services/state.service.ts',
  './StateServiceInstance': './src/app/common/services/state.service.ts',

},
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
    rxjs: { singleton: true },
    '@angular/core': { singleton: true },
    '@angular/common': { singleton: true },
    '@angular/router': { singleton: true }
  },
  skip: ['rxjs/ajax', 'rxjs/fetch', 'rxjs/testing', 'rxjs/webSocket'],
  features: {
    ignoreUnusedDeps: true
  }
});
