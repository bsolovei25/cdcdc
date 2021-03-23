import { SpaceNumber } from '@shared/pipes/number-space.pipe';

describe('SpaceNumberPipe', () => {
    let fixture: SpaceNumber;

    beforeEach(async () => {
        fixture = new SpaceNumber();
    });

    it('should create', () => {
        expect(fixture).toBeTruthy();
    });

    it('should transform', () => {
        const result = fixture.transform(10000.0001);
        expect(result).toBe('10 000');
    });

    it('should error', () => {
        const wrongFunction = () => fixture.transform('str');
        expect(wrongFunction).toThrowError();
    });
});
