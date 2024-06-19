import express from "express";
import { OpenAI } from "openai";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.post("/generate-map", async (req, res) => {
  try {
    console.log("Received request to generate map");

    const prompt = `
    Generate a 8x10 map for a dungeon crawler game. The map should include the following elements:
    - 't': top-wall
    - 'b': bottom-wall
    - 'l': left-wall
    - 'r': right-wall
    - 'w': top-left-wall
    - 'x': top-right-wall
    - 'y': bottom-left-wall
    - 'z': bottom-right-wall
    - '%': lanterns
    - '^': top-door (next level)
    - '$': left-door
    - 'f': fire-pot
    - '{': stairs (next level)
    - '*': slicer (enemy, dangerous)
    - '!': skeletor (enemy, dangerous)
    - ' ': empty space

    Examples:
    //empty room
      "wt%ttt^ttx",
      "l        r",
      "l        r",
      "l        r",
      "$        r",
      "l        r",
      "l        r",
      "ybbbbbb%bz",
    
    // room with a fire-pot and two slicers
      "wt%ttt^ttx",
      "l        r",
      "l      * r",
      "l        r",
      "$    f   r",
      "l        r",
      "l   *    r",
      "ybbbbbb%bz",
    
    // room with fire-pot, slicer, stairs, and skeletor
      "wt%ttt^ttx",
      "l        r",
      "l   !    r",
      "$   {    r",
      "l   *    r",
      "l        r",
      "l    f   r",
      "ybbbbbb%bz",
      
    Rules:
    1. The outer edges of the map MUST be surrounded by walls ('t', 'b', 'l', 'r', 'w', 'x', 'y', 'z').
    2. There MUST be at least one door or stairs('^' or '{') leading to the next level.
    3. Place 1-4 enemies ('*', '!') randomly within the map, but not adjacent to the player start position.
    4. The player start position should be near the bottom-left corner of the map.
    Provide the map in a format that is directly usable in the game.
    5. the top-left, top-right, bottom-left, and bottom-right corners MUST be 'w', 'x', 'y', 'z' respectively

    CRITICALLY IMPORTANT: Your response should be simply the 8 x 10 map in the form of an array of strings (An array of length 8 with each element being a string of 10 characters).
    `;

    console.log("Sending request to OpenAI API");
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a dungeon map generator." },
        { role: "user", content: prompt },
      ],
      max_tokens: 150,
    });

    console.log("Received response from OpenAI API:", response);

    if (!response.choices || response.choices.length === 0) {
      throw new Error("No choices returned from OpenAI API");
    }

    const mapData = response.choices[0].message.content.trim();
    console.log("Generated map data:", mapData);
    res.json({ map: mapData });
  } catch (error) {
    console.error("Error generating map:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, (err) => {
  if (err) {
    console.error("Error starting server:", err);
  } else {
    console.log(`Server is running on http://localhost:${port}`);
  }
});
