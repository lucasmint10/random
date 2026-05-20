/**
 * Generates a friendly, human-readable greeting.
 * @param {string} name - The name of the person to greet.
 * @returns {string} The complete greeting message.
 */
export function generateGreeting(name) {
    const currentHour = new Date().getHours();
    let timeOfDay = "day";

    if (currentHour < 12) timeOfDay = "morning";
    else if (currentHour < 18) timeOfDay = "afternoon";
    else timeOfDay = "evening";

    return `Good ${timeOfDay}, ${name}! The browser resolved this module natively.`;
}
