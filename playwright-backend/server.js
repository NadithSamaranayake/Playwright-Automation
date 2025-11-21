const express = require("express");
const cors = require("cors");
const { exec } = require("child_process"); // 👈 Import 'exec'
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/api/run-test", (req, res) => {
  console.log("Received request to run test...");
  const command = "npx playwright test tests/sample-test.spec.ts --headed --reported=json";

  exec(command, (error, stdout, stderr) => {

    // if (error) {
    //   console.error(`exec error: ${error}`);
    //   return res.status(500).json({ message: "Test failed", error: stderr });
    // }

    // console.log("Test finished!");
    // res.json({ message: "Test completed!", output: stdout });

    try{
      const rawReport = JSON.parse(stdout);
      res.json({ message: "Test completed!", results: rawReport });
    } catch(error){
      res.status(500).json({ message: "Test failed", error: stderr });
    }

  });
});

app.listen(port, () => {
  console.log(`Backend server listening on http://localhost:${port}`);
});
