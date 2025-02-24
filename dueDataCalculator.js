function dateWithinBusinessHours(date) {
    console.log(`\n[Initial Date] ${date.toLocaleString()}`);

    let dateWeekday = date.getDay();
    let dateTime = date.getHours();
    const friday = 5;
    const monday = 1;

    // Make a copy of the date to avoid modifying the original
    let adjustedDate = new Date(date);

    // Move to Monday if it's Sunday or Saturday
    if (dateWeekday === 0 || dateWeekday === 6) {
        console.log(`[Weekend Detected] Adjusting ${adjustedDate.toLocaleString()} to next Monday at 9 AM`);
        adjustedDate.setDate(adjustedDate.getDate() + (1 + (7 - dateWeekday)) % 7); // Move to next Monday
        adjustedDate.setHours(9);
        console.log(`[Updated Date] ${adjustedDate.toLocaleString()}`);
    } 

    // If it's Friday after 5 PM, move to Monday at 9 AM
    if (dateWeekday === friday && dateTime >= 17) {
        console.log(`[Friday After 5 PM] Adjusting ${adjustedDate.toLocaleString()} to Monday at 9 AM`);
        adjustedDate.setDate(adjustedDate.getDate() + 3); // Move to Monday
        adjustedDate.setHours(9);
        console.log(`[Updated Date] ${adjustedDate.toLocaleString()}`);
    }

    // If it's before 9 AM on any weekday, set to 9 AM
    if (dateTime < 9) {
        console.log(`[Before 9 AM] Adjusting time to 9 AM for ${adjustedDate.toLocaleString()}`);
        adjustedDate.setHours(9); 
        console.log(`[Updated Date] ${adjustedDate.toLocaleString()}`);
    }

    // If it's after 5 PM on any weekday, move to the next business day at 9 AM
    if (dateTime >= 17 && dateWeekday !== friday) {
        console.log(`[After 5 PM] Moving ${adjustedDate.toLocaleString()} to next business day at 9 AM`);
        adjustedDate.setDate(adjustedDate.getDate() + 1); // Move to next day
        adjustedDate.setHours(9); 
        console.log(`[Updated Date] ${adjustedDate.toLocaleString()}`);
    }

    return adjustedDate;
}

function calculateDueDate(submitDate, turnAroundTime) {
    const dateSubmitted = new Date(submitDate);
    let dateSubmittedAdjusted = dateWithinBusinessHours(dateSubmitted);

    let hoursRemaining = turnAroundTime;
    let dueDate = new Date(dateSubmittedAdjusted);

    console.log(`Initial dueDate: ${dueDate.toISOString()}`);
    console.log(`Initial hoursRemaining: ${hoursRemaining}`);

    // For zero or negative remaining hours, return the adjusted start date immediately
    if (hoursRemaining <= 0) {
        return dateWithinBusinessHours(dueDate);
    }

    while (hoursRemaining > 0) {
        let currentHour = dueDate.getHours();
        let hoursToEndOfDay = 17 - currentHour; // End of business hours for the day

        console.log(`Current dueDate: ${dueDate.toISOString()}`);
        console.log(`Current hoursRemaining: ${hoursRemaining}`);
        console.log(`Current hoursToEndOfDay: ${hoursToEndOfDay}`);

        if (hoursRemaining <= hoursToEndOfDay) {
            dueDate.setHours(dueDate.getHours() + hoursRemaining);
            hoursRemaining = 0;
            console.log(`Final dueDate: ${dueDate.toISOString()}`);
        } else {
            hoursRemaining -= hoursToEndOfDay;
            dueDate.setHours(17); // Set to end of business day
            if (dueDate.getDay() === 5) { // If it's Friday, move to Monday
                dueDate.setDate(dueDate.getDate() + 3);
            } else {
                dueDate.setDate(dueDate.getDate() + 1); // Move to next day
            }
            dueDate = dateWithinBusinessHours(dueDate);
        }

        console.log(`Updated dueDate: ${dueDate.toISOString()}`);
        console.log(`Updated hoursRemaining: ${hoursRemaining}`);
    }

    return dueDate;
}

export { dateWithinBusinessHours, calculateDueDate };
