const express = require("express");
const cors = require("cors");
const { exec } = require("child_process"); // 👈 Import 'exec'
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Change this route to run a test
app.get("/api/run-test", (req, res) => {
  console.log("Received request to run test...");

  // This is the magic. It runs a terminal command.
  exec("npx playwright test tests/sample-test.spec.ts --headed", (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).json({ message: "Test failed", error: stderr });
    }

    console.log("Test finished!");
    // Send the console output back to Angular
    res.json({ message: "Test completed!", output: stdout });
  });
});

app.listen(port, () => {
  console.log(`Backend server listening on http://localhost:${port}`);
});
