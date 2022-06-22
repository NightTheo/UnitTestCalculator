import {DateUtils} from "./date.utils";


describe('date utils', ()=> {
    it('should get number of minutes between two dates', () => {
        const tenMinAgo = new Date();
        tenMinAgo.setMinutes(new Date().getMinutes() - 10);
        expect(DateUtils.getMinutesDifferenceBetweenTwoDates(
            tenMinAgo,
            new Date()
        )).toEqual(10)
    })
})
