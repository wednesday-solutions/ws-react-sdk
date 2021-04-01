export const MOCKS = {
  congitoUser: {
    idToken: { jwtToken: '12345.12345.12345' },
    getAccessToken() {
      return {
        getJwtToken() {
          return '67890.67890.67890';
        }
      };
    },
    getSession(callback = () => {}) {
      callback(null, {
        name: 'John Doe',
        isValid: () => true
      });
    },
    getUserAttributes(callback = () => {}) {
      callback(null, [
        {
          getName() {
            return 'username';
          },
          getValue() {
            return 'Yash Handa';
          }
        }
      ]);
    },
    confirmRegistration(code, _, callback = () => {}) {
      callback(null, { code: code, confirmed: true });
    },
    resendConfirmationCode(callback = () => {}) {
      callback(null, { resent: true });
    },
    getRefreshToken() {
      return {
        token: 'abcde.abcde.abcde'
      };
    }
  },
  congitoNullUser: null
};

export function resetMocks() {
  jest.clearAllMocks();
  jest.resetAllMocks();
  jest.resetModules();
}
