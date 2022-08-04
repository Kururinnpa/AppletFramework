onmessage = e => {
  edata = JSON.parse(e.data);
  postMessage(JSON.stringify(edata));
};