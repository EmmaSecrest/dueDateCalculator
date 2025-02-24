// dueDataCalculator.test.js
import { calculateDueDate, dateWithinBusinessHours } from './dueDataCalculator';

describe('calculateDueDate', () => {
    test('should calculate due date within the same day', () => {
        const initialDate = new Date('2023-10-10T09:00:00.000Z');
        const hoursRemaining = 5;
        const expectedDate = new Date('2023-10-10T14:00:00.000Z');
        expect(calculateDueDate(initialDate, hoursRemaining)).toEqual(expectedDate);
    });

    test('should calculate due date spanning multiple days', () => {
        const initialDate = new Date('2023-10-10T14:12:00.000Z');
        const hoursRemaining = 16;
        const expectedDate = new Date('2023-10-12T14:12:00.000Z');
        expect(calculateDueDate(initialDate, hoursRemaining)).toEqual(expectedDate);
    });

    test('should calculate due date spanning weekends', () => {
        const initialDate = new Date('2023-10-06T14:12:00.000Z');
        const hoursRemaining = 48;
        const expectedDate = new Date('2023-10-12T14:12:00.000Z');
        expect(calculateDueDate(initialDate, hoursRemaining)).toEqual(expectedDate);
    });

    test('should handle zero hours remaining', () => {
        const initialDate = new Date('2023-10-10T09:00:00.000Z');
        const hoursRemaining = 0;
        const expectedDate = new Date('2023-10-10T09:00:00.000Z');
        expect(calculateDueDate(initialDate, hoursRemaining)).toEqual(expectedDate);
    });

    test('should handle negative hours remaining', () => {
        const initialDate = new Date('2023-10-10T09:00:00.000Z');
        const hoursRemaining = -5;
        const expectedDate = new Date('2023-10-10T09:00:00.000Z');
        expect(calculateDueDate(initialDate, hoursRemaining)).toEqual(expectedDate);
    });
});

describe('dateWithinBusinessHours', () => {
    test('Adjusts Sunday to next Monday at 9 AM', () => {
        let date = new Date('2023-10-15T10:00:00'); // Sunday
        let adjustedDate = dateWithinBusinessHours(date);
        expect(adjustedDate.toISOString()).toBe(new Date('2023-10-16T09:00:00').toISOString());
    });

    test('Adjusts Saturday to next Monday at 9 AM', () => {
        let date = new Date('2023-10-14T10:00:00'); // Saturday
        let adjustedDate = dateWithinBusinessHours(date);
        expect(adjustedDate.toISOString()).toBe(new Date('2023-10-16T09:00:00').toISOString());
    });

    test('Adjusts Friday after 5 PM to next Monday at 9 AM', () => {
        let date = new Date('2023-10-13T18:00:00'); // Friday after 5 PM
        let adjustedDate = dateWithinBusinessHours(date);
        expect(adjustedDate.toISOString()).toBe(new Date('2023-10-16T09:00:00').toISOString());
    });

    test('Adjusts weekday before 9 AM to 9 AM', () => {
        let date = new Date('2023-10-12T08:00:00'); // Thursday before 9 AM
        let adjustedDate = dateWithinBusinessHours(date);
        expect(adjustedDate.toISOString()).toBe(new Date('2023-10-12T09:00:00').toISOString());
    });

    test('Adjusts weekday after 5 PM to next business day at 9 AM', () => {
        let date = new Date('2023-10-12T18:00:00'); // Thursday after 5 PM
        let adjustedDate = dateWithinBusinessHours(date);
        expect(adjustedDate.toISOString()).toBe(new Date('2023-10-13T09:00:00').toISOString());
    });

    test('Does not adjust date within business hours', () => {
        let date = new Date('2023-10-12T10:00:00'); // Thursday within business hours
        let adjustedDate = dateWithinBusinessHours(date);
        expect(adjustedDate.toISOString()).toBe(date.toISOString());
    });
});