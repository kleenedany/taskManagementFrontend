module.exports = {
  taskManagement: {
    input: {
      target: './src/app/api/api.json',
    },
    output: {
      mode: 'tags-split',
      target: './src/app/api/api.ts',
      schemas: './src/app/api/model',
      client: 'angular',
      fileExtension: '.gen.ts',
      baseUrl: 'http://localhost:8080',
    },
  },
};