// otpStore.ts (a simple key-value store)
const otpStore = new Map<string, { otp: string; expiresAt: number }>();

export function saveOTP(email: string, otp: string) {
    otpStore.set(email, {
        otp,
        expiresAt: Date.now() + 5 * 60 * 1000, // 5 mins
    });
}

export function verifyOTP(email: string, inputOtp: string) {
    const record = otpStore.get(email);
    if (!record) return false;
    if (Date.now() > record.expiresAt) {
        otpStore.delete(email);
        return false;
    }
    const isValid = record.otp === inputOtp;
    if (isValid) otpStore.delete(email); // prevent reuse
    return isValid;
}
