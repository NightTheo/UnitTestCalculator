import {DateComparator} from "./date-comparator";

export class SimpleDateComparator implements DateComparator {
    getMinutesBetweenTwoDates(d1: Date, d2: Date) {
        return 40;
    }
}
