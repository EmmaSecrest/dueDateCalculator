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
