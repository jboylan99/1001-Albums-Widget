const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const PORT = 8080;

app.get('/project/jasons-attempt', async (req, res) => {
  const { projectIdentifier } = req.params;

  try {
    const response = await fetch(`https://1001albumsgenerator.com/api/v1/projects/jasons-attempt`);
    if (!response.ok) {
      return res.status(response.status).send('Error fetching project data');
    }
    const data = await response.json();
    // res.send(`Album Name: ${currentAlbum.artist} - ${currentAlbum.name}`);
    res.json(data); // send JSON response to client
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.get('/album-stats', async (req, res) => {
  const { projectIdentifier } = req.params;

  try {
    const response = await fetch(`https://1001albumsgenerator.com/api/v1/albums/stats`);
    if (!response.ok) {
      return res.status(response.status).send('Error fetching project data');
    }
    const data = await response.json();
    res.json(data); // send JSON response to client
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.get('/user-album-stats', async (req, res) => {
  const { projectIdentifier } = req.params;

  try {
    const response = await fetch(`https://1001albumsgenerator.com/api/v1/user-albums/stats`);
    if (!response.ok) {
      return res.status(response.status).send('Error fetching project data');
    }
    const data = await response.json();
    res.json(data); // send JSON response to client
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Gracefully handle nodemon restarts
process.once('SIGUSR2', function () {
  server.close(() => {
    process.kill(process.pid, 'SIGUSR2');
  });
});