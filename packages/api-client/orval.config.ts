export default {
  api: {
    input: 'http://localhost:8787/doc',
    output: {
      target: './generated/client.ts',
      schemas: './generated/model',
      client: 'react-query',
      mode: 'tags-split',
    },
  },
}