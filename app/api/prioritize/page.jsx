
export async function POST(request) {
    const { tasks } = await request.json();
    const prioritizedTasks = await prioritizeTasks(tasks);
  
    return new Response(JSON.stringify({ prioritizedTasks }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  async function prioritizeTasks(tasks) {
    const apiKey = process.env.GEMINI_API_KEY;
  
    if (!apiKey) {
      throw new Error('API key is missing');
    }
  
    const response = await fetch('https://gemini-api.com/v1/prioritize', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ tasks })
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch prioritized tasks');
    }
  
    const data = await response.json();
    return data.prioritizedTasks;
  }
  