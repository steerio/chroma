const express = require('express'),
      path = require('path'),
      port = process.env.PORT || 3000,
      app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dist')));

app.listen(port, () => {
  console.log(`Yalla! Listening on port ${port}.`);
});
