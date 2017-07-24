/**
 * API Config
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */

export default {
  // The URL we're connecting to
  newsapi: 'https://newsapi.org',
  newsapi_endpoints: new Map([
    ['sources','/v1/sources'],
    ['articles','/v1/articles']
  ])
};
