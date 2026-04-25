import https from 'https';

const url = 'https://image.pollinations.ai/prompt/test';
https.get(url, (res) => {
  console.log('Status Code:', res.statusCode);
  console.log('Headers:', res.headers['content-type']);
}).on('error', (e) => {
  console.error(e);
});
