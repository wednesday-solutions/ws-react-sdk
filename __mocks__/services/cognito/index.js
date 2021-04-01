import { MOCKS, resetMocks } from './constants';

export function mockCognito(data = { CognitoUserPoolConstructor: {}, CognitoUserConstructor: {} }) {
  resetMocks();
  jest.doMock('amazon-cognito-identity-js', () => {
    return {
      CognitoUserPool: class CognitoUserPool {
        data = {};
        UserPoolId;
        ClientId;

        constructor(configInfo) {
          this.UserPoolId = configInfo.UserPoolId;
          this.ClientId = configInfo.ClientId;
          this.data = data.CognitoUserPoolConstructor;
        }

        getCurrentUser = jest.fn().mockImplementation(() => {
          if (this.data.returnNullUser) {
            return MOCKS.congitoNullUser;
          }
          return MOCKS.congitoUser;
        });

        signUp = jest.fn().mockImplementation(function(username, password, userAttributes, validationData, callback) {
          return callback(undefined, {
            username
          });
        });
      },
      CognitoUserAttribute: jest.fn(),
      AuthenticationDetails: jest.fn(),
      CognitoUser: class CognitoUser {
        data = {};

        constructor() {
          this.data = data.CognitoUserConstructor;
        }

        confirmRegistration(code, _, callback) {
          callback(null, { code: code, confirmed: true });
        }

        resendConfirmationCode(callback = () => {}) {
          callback(null, { resent: true });
        }

        authenticateUser(authenticationDetails, callback) {
          if (this.data.isSuccess) {
            callback.onSuccess(MOCKS.congitoUser);
          } else if (this.data.failureReason) {
            callback.onFailure(new Error(this.data.failureReason));
          } else {
            callback.onFailure(new Error('some error'));
          }
        }
      }
    };
  });
}
