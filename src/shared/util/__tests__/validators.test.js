import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH,
  validate,
} from '../validators';

describe('validators utility', () => {
  describe('VALIDATOR_REQUIRE', () => {
    it('should return false for empty string', () => {
      expect(validate('', [VALIDATOR_REQUIRE()])).toBe(false);
    });

    it('should return false for whitespace only', () => {
      expect(validate('   ', [VALIDATOR_REQUIRE()])).toBe(false);
    });

    it('should return true for non-empty string', () => {
      expect(validate('test', [VALIDATOR_REQUIRE()])).toBe(true);
    });
  });

  describe('VALIDATOR_EMAIL', () => {
    it('should return false for invalid email formats', () => {
      const invalidEmails = ['test', 'test@', 'test@.com', '@test.com'];
      invalidEmails.forEach((email) => {
        expect(validate(email, [VALIDATOR_EMAIL()])).toBe(false);
      });
    });

    it('should return true for valid email format', () => {
      expect(validate('test@example.com', [VALIDATOR_EMAIL()])).toBe(true);
    });
  });

  describe('VALIDATOR_MINLENGTH', () => {
    it('should return false when string length is less than required', () => {
      expect(validate('test', [VALIDATOR_MINLENGTH(5)])).toBe(false);
    });

    it('should return true when string length equals required length', () => {
      expect(validate('test', [VALIDATOR_MINLENGTH(4)])).toBe(true);
    });

    it('should return true when string length is greater than required', () => {
      expect(validate('testing', [VALIDATOR_MINLENGTH(4)])).toBe(true);
    });
  });

  describe('VALIDATOR_MAXLENGTH', () => {
    it('should return false when string length is more than allowed', () => {
      expect(validate('testing', [VALIDATOR_MAXLENGTH(5)])).toBe(false);
    });

    it('should return true when string length equals maximum length', () => {
      expect(validate('test', [VALIDATOR_MAXLENGTH(4)])).toBe(true);
    });

    it('should return true when string length is less than maximum', () => {
      expect(validate('test', [VALIDATOR_MAXLENGTH(5)])).toBe(true);
    });
  });

  describe('Multiple validators', () => {
    it('should validate against multiple rules', () => {
      const validators = [
        VALIDATOR_REQUIRE(),
        VALIDATOR_MINLENGTH(5),
        VALIDATOR_MAXLENGTH(10),
      ];

      expect(validate('', validators)).toBe(false); // fails REQUIRE
      expect(validate('test', validators)).toBe(false); // fails MINLENGTH
      expect(validate('verylongstring', validators)).toBe(false); // fails MAXLENGTH
      expect(validate('valid123', validators)).toBe(true); // passes all
    });

    it('should validate email with required field', () => {
      const validators = [VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()];

      expect(validate('', validators)).toBe(false);
      expect(validate('notanemail', validators)).toBe(false);
      expect(validate('test@example.com', validators)).toBe(true);
    });
  });
});
