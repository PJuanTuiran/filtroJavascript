export async function fetchApi(url, options ) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Response not found');
    }
    return await response.json();
    
  } catch (error) {
    console.log("Error:", error);
    
  }
}