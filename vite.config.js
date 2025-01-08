// vite.config.js
export default {
    server: {
      proxy: {
        '/graphql': {
          target: 'https://api.airstack.xyz',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/graphql/, '/graphql'),
        },
      },
    },
  };
  