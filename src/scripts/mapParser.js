export function parseMapData(mapData) {
  // Assuming mapData is a JSON string representing an array of strings
  // Parse the JSON string into an array
  try {
    const parsedMapData = JSON.parse(mapData);
    if (Array.isArray(parsedMapData)) {
      return parsedMapData.map((row) => row.trim());
    } else {
      throw new Error("Parsed map data is not an array");
    }
  } catch (error) {
    console.error("Error parsing map data:", error);
    return [];
  }
}
