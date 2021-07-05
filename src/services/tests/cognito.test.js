import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { mockCognito } from '../../../__mocks__/services/cognito';
import { MOCKS } from '../../../__mocks__/services/cognito/constants';
import { COGNITO_ERROR_TYPES, getUserPool, getUserPoolAppClient, getUserPoolID } from '../cognito';

describe('Cognito tests', () => {
  const OLD_ENV = process.env;
  const awsProps = {
    AWS_COGNITO_USER_POOL_ID: '123',
    AWS_COGNITO_USER_POOL_APP_CLIENT: '123214'
  };
  beforeEach(() => {
    process.env = { ...OLD_ENV, ...awsProps };
  });
  afterAll(() => {
    process.env = OLD_ENV;
  });

  it('should ensure that it will return same data if userpool is present', () => {
    expect(getUserPool().UserPoolId).toBe(MOCKS.userPool.userPoolVal);
  });

  it('should ensure correct params are being passed if userpool is not present', async () => {
    const poolData = {
      UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
      ClientId: process.env.AWS_COGNITO_USER_POOL_APP_CLIENT
    };
    const data = getUserPool();
    expect(data.ClientId).toBe(poolData.ClientId);
    expect(data.UserPoolId).toBe(poolData.UserPoolId);
  });

  it('should ensure it returns AWS_COGNITO_USER_POOL_ID ', () => {
    const id = process.env.AWS_COGNITO_USER_POOL_ID;
    const poolId = getUserPoolID();
    expect(poolId).not.toBeUndefined();
    expect(poolId).toBe(id);
  });

  it('should ensure it returns correct AWS_COGNITO_USER_POOL_APP_CLIENT', () => {
    const client = process.env.AWS_COGNITO_USER_POOL_APP_CLIENT;
    const AppClient = getUserPoolAppClient();
    expect(client).not.toBeUndefined();
    expect(AppClient).toBe(client);
  });

  it('should ensure that COGNITO_ERROR_TYPES have all its values and are not undefined', () => {
    const errorTypeLength = Object.keys(COGNITO_ERROR_TYPES).length;
    expect(errorTypeLength).toBe(5);
    const data = Object.keys(COGNITO_ERROR_TYPES);
    data.map(err => {
      expect(err).not.toBeUndefined();
    });
  });
});

describe('Tests for Cognito Integrations', () => {
  it('should signUp a user', async () => {
    const email = 'yash@wednesday.is';
    const pass = 'Yash!12345';
    const { signUp } = require('../cognito');

    const data = await signUp(email, pass);

    expect(data).toEqual({ username: email });
    expect(CognitoUserAttribute).toHaveBeenCalledWith({
      Name: 'email',
      Value: email
    });
  });

  it('should login a user', async () => {
    const email = 'yash@wednesday.is';
    const pass = 'Yash!12345';
    const accessToken = '67890.67890.67890';
    const refreshToken = 'abcde.abcde.abcde';
    const idToken = '12345.12345.12345';

    await mockCognito({ CognitoUserConstructor: { isSuccess: true } });
    const { login } = require('../cognito');

    const data = await login(email, pass);

    expect(data).toEqual({
      payload: {
        accessToken,
        refreshToken,
        idToken
      }
    });
  });

  it('should not login a user', async () => {
    const email = 'yash@wednesday.is';
    const pass = 'Yash!12345';
    await mockCognito({
      CognitoUserConstructor: { failureReason: 'invalid credentials' }
    });
    const { login } = require('../cognito');

    try {
      await login(email, pass);
    } catch (e) {
      expect(e).toEqual(Error('invalid credentials'));
    }
  });

  it('should get user attribute', async () => {
    await mockCognito();
    const { fetchAttributes } = require('../cognito');
    const data = await fetchAttributes();
    expect(data).toEqual({ username: 'Yash Handa' });
  });

  it('should return error on user attribute for null User', async () => {
    await mockCognito({ CognitoUserPoolConstructor: { returnNullUser: true } });
    const { fetchAttributes } = require('../cognito');
    try {
      await fetchAttributes();
    } catch (e) {
      expect(e).toEqual(
        Error({
          code: 'NotAuthorizedException',
          message: 'No user is logged in',
          name: 'NotAuthorizedException'
        })
      );
    }
  });

  it('should confirm signup for a user', async () => {
    await mockCognito();
    const { confirmSignUp } = require('../cognito');
    const data = await confirmSignUp('yash@wednesday.is', '12345');

    expect(data).toEqual({
      code: '12345',
      confirmed: true
    });
  });

  it('should return error on confirming signup for a null user', async () => {
    await mockCognito({ CognitoUserPoolConstructor: { returnNullUser: true } });
    const { confirmSignUp } = require('../cognito');
    try {
      await confirmSignUp('12345');
    } catch (e) {
      expect(e).toEqual(
        Error({
          code: 'NotAuthorizedException',
          message: 'No user data is present',
          name: 'NotAuthorizedException'
        })
      );
    }
  });

  it('should resend the confirmation code', async () => {
    await mockCognito();
    const { resendConfirmationCode } = require('../cognito');
    const data = await resendConfirmationCode();

    expect(data).toEqual({
      resent: true
    });
  });

  it('should return error for resend confirmation code on null user', async () => {
    await mockCognito({ CognitoUserPoolConstructor: { returnNullUser: true } });
    const { resendConfirmationCode } = require('../cognito');

    try {
      await resendConfirmationCode();
    } catch (e) {
      expect(e).toEqual(
        Error({
          code: 'NotAuthorizedException',
          message: 'No user data is present',
          name: 'NotAuthorizedException'
        })
      );
    }
  });

  it('should signOut a user, if none is present', async () => {
    await mockCognito({ CognitoUserPoolConstructor: { returnNullUser: true } });
    const { signOut } = require('../cognito');

    const data = await signOut();

    expect(data).toBe('No user was signed in');
  });

  it('should get cognito user', async () => {
    const { getCognitoUser } = require('../cognito');
    try {
      const user = await getCognitoUser();
      await expect(user).resolves.not.toBeUndefined();
    } catch (e) {
      expect(e).toEqual(e);
    }
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
