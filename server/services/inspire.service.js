import axios from "axios";

export async function fetchInspiration(filters) {
  let activityData = null;
  let activityError = null;
  let advice = null;
  let adviceError = null;
  let quote = null;
  let quoteError = null;

  // Fetch activity
  try {
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
      if (Array.isArray(res.data) && res.data.length > 0) {
        activityData = res.data[Math.floor(Math.random() * res.data.length)];
      } else {
        activityError = "No activity found for the given filters.";
      }
    } else {
      const res = await axios.get("https://bored-api.appbrewery.com/random");
      activityData = res.data;
    }
  } catch (err) {
    activityError = "Failed to fetch activity.";
  }

  // Fetch advice
  try {
    const adviceRes = await axios.get("https://api.adviceslip.com/advice");
    advice = adviceRes.data.slip.advice;
  } catch (err) {
    adviceError = "Failed to fetch advice.";
  }

  // Fetch quote
  try {
    const quoteRes = await axios.get("https://zenquotes.io/api/random");
    quote = {
      text: quoteRes.data[0].q,
      author: quoteRes.data[0].a,
    };
  } catch (err) {
    if (err.response && err.response.status === 429) {
      quoteError =
        "Too many requests for motivational quotes. Please try again later.";
    } else {
      quoteError = "Failed to fetch motivational quote.";
    }
  }

  return {
    activity: activityData,
    activityError,
    advice,
    adviceError,
    quote,
    quoteError,
  };
}

export async function fetchAdviceSearch(query) {
  const url = `https://api.adviceslip.com/advice/search/${encodeURIComponent(
    query
  )}`;
  const res = await axios.get(url);
  if (res.data.message) {
    return { total_results: 0, slips: [] };
  }
  return {
    total_results: res.data.total_results,
    slips: res.data.slips.map((slip) => slip.advice),
  };
}
