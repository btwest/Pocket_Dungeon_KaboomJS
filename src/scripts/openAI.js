export async function generateMap() {
  try {
    console.log("pinging OpenAI...");
    const response = await fetch("http://localhost:3000/generate-map", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.map) {
      throw new Error("Map data is undefined");
    }

    return data.map;
  } catch (error) {
    console.error("Error generating map:", error);
    return null; // Return null in case of error
  }
}
