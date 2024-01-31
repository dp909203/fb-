const MESSAGES = {
    401: "You are unauthorised",
    9999: "Something went wrong!",
    1005: 'The email has already been taken',
    1010: 'Register successfully',
    1008: 'This email is not available',
    1002: 'User doesnt exist',
    1001: 'Invalid password',
    1004: 'login successfully',
    1016: 'Email or number already exists',

    1003: 'Old password does not match',
    1006: 'Password reset successfully',
    1007: 'Authentication required',
    1009: 'Invalid session token',
    1011: 'Post created successfully',
    1012: 'Post not found',
    1013: 'Post retrieved successfully',
    1014: 'Post update successfully',
    1015: 'You do not have permission ',
    1017: 'post delete successfully',
    1018: 'No files uploaded',
    1019: 'File upload failed',
    1020: 'Unauthorized: Missing token',
    1021: 'Unauthorized: Invalid token',
    1022: 'User logged out successfully',
    1023: 'USer delete successfully'
};

const getMessage = (messageCode) => {
    if (isNaN(messageCode)) {
        return messageCode;
    }
    return messageCode ? MESSAGES[messageCode] : "";
};

module.exports = getMessage;