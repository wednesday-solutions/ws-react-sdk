import { COGNITO_ERROR_TYPES, getUserPool, getUserPoolAppClient, getUserPoolID } from '../cognitoUtils';
import { MOCKS } from '../../../__mocks__/services/cognito/constants';

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
    expect(MOCKS.userPool.getUserPool()).toBe(MOCKS.userPool.userPoolVal);
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
