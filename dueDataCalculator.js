function dateWithinBusinessHours(date) {
    let dateWeekday = date.getDay();
    let dateTime = date.getHours();
    const friday = 5;
    const monday = 1;
    let adjustedDate = new Date(date);

    if (dateWeekday === 0 || dateWeekday === 6) {
        adjustedDate.setDate(adjustedDate.getDate() + (1 + (7 - dateWeekday)) % 7);
        adjustedDate.setHours(9, 0, 0, 0);
    }

    if (dateWeekday === friday && dateTime >= 17) {
        adjustedDate.setDate(adjustedDate.getDate() + 3);
        adjustedDate.setHours(9, 0, 0, 0);
    }

    if (dateTime < 9) {
        adjustedDate.setHours(9, 0, 0, 0);
    }

    if (dateTime >= 17 && dateWeekday !== friday) {
        adjustedDate.setDate(adjustedDate.getDate() + 1);
        adjustedDate.setHours(9, 0, 0, 0);
    }

    return adjustedDate;
}

function calculateDueDate(submitDate, turnAroundTime) {
    const dateSubmitted = new Date(submitDate);
    let dateSubmittedAdjusted = dateWithinBusinessHours(dateSubmitted);
    let hoursRemaining = turnAroundTime;
    let dueDate = new Date(dateSubmittedAdjusted);

    if (hoursRemaining <= 0) {
        return dateWithinBusinessHours(dueDate);
    }

    while (hoursRemaining > 0) {
        let currentHour = dueDate.getHours();
        let hoursToEndOfDay = 17 - currentHour;

        if (hoursRemaining <= hoursToEndOfDay) {
            dueDate.setHours(dueDate.getHours() + hoursRemaining);
            hoursRemaining = 0;
        } else {
            hoursRemaining -= hoursToEndOfDay;
            dueDate.setHours(17, 0, 0, 0);
            if (dueDate.getDay() === 5) {
                dueDate.setDate(dueDate.getDate() + 3);
            } else {
                dueDate.setDate(dueDate.getDate() + 1);
            }
            dueDate = dateWithinBusinessHours(dueDate);
        }
    }

    return dueDate;
}

export { dateWithinBusinessHours, calculateDueDate };