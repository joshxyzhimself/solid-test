
// @ts-check

const path = require('path');
const fastify = require('fastify').default;
const fastify_static = require('fastify-static').default;

const app = fastify({ logger: true });

app.register(fastify_static, {
  root: path.join(process.cwd(), './client/dist'),
  prefix: '/',
});

const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>Solid Test</title>
    <meta charset="UTF-8" />
  </head>

  <body>
    <div id="app"></div>
    <script src="/index.js"></script>
  </body>
</html>
`;

app.get('/', async (request, reply) => {
  reply
    .status(200)
    .header('Content-Type', 'text/html')
    .send(html);
});

process.nextTick(async () => {
  await app.listen(8080);
});