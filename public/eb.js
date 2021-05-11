const sse = new SSE('/api/sse');

sse.listen('newcity', (data) => {
  console.log('message', data);
  getApi();
});