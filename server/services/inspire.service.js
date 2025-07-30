import axios from "axios";

export async function fetchInspiration(filters) {
  let activityData;
  // If any filters, use /filter, else use /random
  if (
    filters.type ||
    filters.participants ||
    filters.price ||
    filters.accessibility ||
    filters.key
  ) {
    const params = new URLSearchParams();
    if (filters.type) params.append("type", filters.type);
    if (filters.participants)
      params.append("participants", filters.participants);
    // price, accessibility, key are not supported by appbrewery API, so we skip them
    const url = `https://bored-api.appbrewery.com/filter?${params.toString()}`;
    const res = await axios.get(url);
    // Returns an array, pick a random one if available
    if (Array.isArray(res.data) && res.data.length > 0) {
      activityData = res.data[Math.floor(Math.random() * res.data.length)];
    } else {
      throw new Error("No activity found with the specified parameters");
    }
  } else {
    const res = await axios.get("https://bored-api.appbrewery.com/random");
    activityData = res.data;
  }

  const [adviceRes, quoteRes] = await Promise.all([
    axios.get("https://api.adviceslip.com/advice"),
    axios.get("https://zenquotes.io/api/random"),
  ]);

  return {
    activity: activityData,
    advice: adviceRes.data.slip.advice,
    quote: {
      text: quoteRes.data[0].q,
      author: quoteRes.data[0].a,
    },
  };
}

export async function fetchAdviceSearch(query) {
  const url = `https://api.adviceslip.com/advice/search/${encodeURIComponent(
    query
  )}`;
  const res = await axios.get(url);
  // If no results, API returns a message object
  if (res.data.message) {
    return { total_results: 0, slips: [] };
  }
  return {
    total_results: res.data.total_results,
    slips: res.data.slips.map((slip) => slip.advice),
  };
}
