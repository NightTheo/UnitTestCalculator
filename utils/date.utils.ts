export class DateUtils {
    static getMinutesDifferenceBetweenTwoDates(d1: Date, d2: Date): number {
        const millisecondsDifference: number = d1.getTime() - d2.getTime();
        const seconds = Math.abs(millisecondsDifference) / 1_000;
        return Math.floor(seconds / 60);
    }
}
