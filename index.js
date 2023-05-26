const crypto = require('crypto');

const digits = '0123456789';
const lowerCaseAlphabets = 'abcdefghijklmnopqrstuvwxyz';
const upperCaseAlphabets = lowerCaseAlphabets.toUpperCase();

module.exports = {
    /**
     * Generate OTP of the specified length and options.
     * @param  {number} length - Length of the OTP.
     * @param  {object} options - Options for including different character types.
     * @param  {boolean} options.digits - Include digits in OTP. Default: true.
     * @param  {boolean} options.lowerCaseAlphabets - Include lowercase alphabets in OTP. Default: true.
     * @param  {boolean} options.upperCaseAlphabets - Include uppercase alphabets in OTP. Default: true.
     * @returns {string} Generated OTP.
     */
    generate: function (length, options) {
        length = length || 6;
        options = options || {};

        const {
            digits: includeDigits = true,
            lowerCaseAlphabets: includeLowerCase = true,
            upperCaseAlphabets: includeUpperCase = true
        } = options;

        const allowedChars = [
            includeDigits && digits,
            includeLowerCase && lowerCaseAlphabets,
            includeUpperCase && upperCaseAlphabets
        ].filter(Boolean).join('');

        let otp = '';
        while (otp.length < length) {
            const charIndex = crypto.randomInt(0, allowedChars.length);
            const char = allowedChars[charIndex];
            if (otp.length === 0 && includeDigits && char === '0') {
                continue;
            }
            otp += char;
        }
        return otp;
    }
};
