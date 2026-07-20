import { CreditLabelPipe } from './credit-label.pipe';

describe('CreditLabelPipe', () => {
  let pipe: CreditLabelPipe;

  beforeEach(() => {
    pipe = new CreditLabelPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return singular "Credit" for 1 credit', () => {
    expect(pipe.transform(1)).toBe('1 Credit');
  });

  it('should return plural "Credits" for 2 credits', () => {
    expect(pipe.transform(2)).toBe('2 Credits');
  });

  it('should return plural "Credits" for 4 credits', () => {
    expect(pipe.transform(4)).toBe('4 Credits');
  });

  it('should return plural "Credits" for 0 credits', () => {
    expect(pipe.transform(0)).toBe('0 Credits');
  });
});
