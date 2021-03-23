import { uuidGenerate } from '@shared/functions/uuid-generator.function';

describe('UuidGeneratorFunction', () => {
    it('should generators not equal at same time', () => {
        const uuid1 = uuidGenerate();
        const uuid2 = uuidGenerate();
        expect(uuid1).not.toBe(uuid2);
    });
});
