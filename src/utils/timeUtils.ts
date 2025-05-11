export function formatTime(timestamp: string): string {
  try {
    const dateObj = new Date(timestamp);
    return dateObj.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch (e) {
    console.error("Error formatting time:", e);
    return "Invalid time";
  }
}