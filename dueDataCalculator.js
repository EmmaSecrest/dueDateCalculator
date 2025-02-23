/* 
Pseudo Code for CalculateDueDate:

1. Start with the given submitDate and turnaroundTime (in working hours).

2. Define business hours:
    - Working hours: 9AM to 5PM, Monday to Friday.

3. Check if submitDate is within business hours:
    - If submitDate is before 9AM or after 5PM:
        - Adjust submitDate to the next valid business hour (9AM the next day).
    - If submitDate is within business hours:
        - Proceed to the next step.

4. Add turnaroundTime to submitDate:
    - If turnaroundTime is less than or equal to the remaining hours of the current workday:
        - Add the remaining hours of the current day to the submitDate.
    - If turnaroundTime exceeds the remaining hours:
        - Add the remaining hours to the submitDate and continue adding full workdays (8 hours per day).
        - Move to the next valid business day (skip weekends and holidays).

5. Handle weekends:
    - After adding the full turnaround time, if the new date lands on a weekend (Saturday or Sunday):
        - Adjust the date to the next Monday at 9AM.

6. Return the resulting dueDate (submitDate + turnaroundTime).
*/


function dateWithinBusinessHours(date) {
    console.log(`\n[Initial Date] ${date.toLocaleString()}`);

    let dateWeekday = date.getDay();
    let dateTime = date.getHours();
    const friday = 5;
    const monday = 1;

    // Move to Monday if it's Sunday or Saturday
    if (dateWeekday === 0 || dateWeekday === 6) {
        console.log(`[Weekend Detected] Adjusting ${date.toLocaleString()} to next Monday at 9 AM`);
        date.setDate(date.getDate() + (1 + (7 - dateWeekday)) % 7); // Move to next Monday
        date.setHours(9);
        console.log(`[Updated Date] ${date.toLocaleString()}`);
    } 

    // If it's Friday after 5 PM, move to Monday at 9 AM
    if (dateWeekday === friday && dateTime >= 17) {
        console.log(`[Friday After 5 PM] Adjusting ${date.toLocaleString()} to Monday at 9 AM`);
        date.setDate(date.getDate() + 3); // Move to Monday
        date.setHours(9);
        console.log(`[Updated Date] ${date.toLocaleString()}`);
    }

    // If it's before 9 AM on any weekday, set to 9 AM
    if (dateTime < 9) {
        console.log(`[Before 9 AM] Adjusting time to 9 AM for ${date.toLocaleString()}`);
        date.setHours(9); 
        console.log(`[Updated Date] ${date.toLocaleString()}`);
    }

    // If it's after 5 PM on any weekday, move to the next business day at 9 AM
    if (dateTime >= 17 && dateWeekday !== friday) {
        console.log(`[After 5 PM] Moving ${date.toLocaleString()} to next business day at 9 AM`);
        date.setDate(date.getDate() + 1); // Move to next day
        date.setHours(9); 
        console.log(`[Updated Date] ${date.toLocaleString()}`);
    }

    return date;
}





const { calculateDueDate } = require('./dueDataCalculator');

test('calculates due date correctly for a simple case', () => {
    const submitDate = new Date('2023-10-10T14:12:00Z'); // Example submit date
    const turnAroundTime = 16; // Example turnaround time
    const expectedDueDate = new Date('2023-10-12T18:12:00Z'); // Expected result
    console.log(`Expected: ${expectedDueDate.toISOString()}`); // Log in UTC
    expect(calculateDueDate(submitDate, turnAroundTime).toISOString()).toEqual(expectedDueDate.toISOString()); // Compare UTC times
});

test('calculates due date correctly for a case that crosses a weekend', () => {
    const submitDate = new Date('2023-10-06T14:12:00Z'); // Example submit date (Friday)
    const turnAroundTime = 48; // 2 days
    const expectedDueDate = new Date('2023-10-10T18:12:00Z'); // Expected result (Tuesday)
    console.log(`Expected: ${expectedDueDate.toISOString()}`); // Log in UTC
    expect(calculateDueDate(submitDate, turnAroundTime).toISOString()).toEqual(expectedDueDate.toISOString()); // Compare UTC times
});
