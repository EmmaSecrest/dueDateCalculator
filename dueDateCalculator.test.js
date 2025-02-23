const { calculateDueDate } = require('./dueDataCalculator');

test('calculates due date correctly for a simple case', () => {
    const submitDate = new Date('2023-10-10T14:12:00'); // Example date
    const turnAroundTime = 16; // Example turnaround time
    const expectedDueDate = new Date('2023-10-12T14:12:00'); // Expected result
    expect(calculateDueDate(submitDate, turnAroundTime)).toEqual(expectedDueDate);
});

test('calculates due date correctly for a case that crosses a weekend', () => {
    const submitDate = new Date('2023-10-06T14:12:00'); // Friday
    const turnAroundTime = 48; // 2 days
    const expectedDueDate = new Date('2023-10-10T14:12:00'); // Expected result (Monday)
    expect(calculateDueDate(submitDate, turnAroundTime)).toEqual(expectedDueDate);
});