
const express = require('express');
const cookieParser = require('cookie-parser');
const apiRouter = require('./apiRouter');

const PORT = 3001;
const app = express();


app.use(cookieParser());
app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`API server listening on ${PORT}`);
});