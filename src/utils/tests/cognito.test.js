import { COGNITO_ERROR_TYPES, getUserPool, getUserPoolAppClient, getUserPoolID, userPool } from '../cognitoUtils';
import { CognitoUserPool } from 'amazon-cognito-identity-js';

describe('Cognito tests', () => {
  it('should ensure that it will return same data if userpool is present', () => {
    expect(getUserPool()).toBe(userPool);
  });

  it('should ensure correct params are being passed if userpool is not present', async () => {
    const poolData = {
      UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
      ClientId: process.env.AWS_COGNITO_USER_POOL_APP_CLIENT
    };
    const data = getUserPool();
    const mockUserPool = new CognitoUserPool(poolData);
    // expect(mockUserPool).toEqual(data);
  });

  it('should ensure it returns AWS_COGNITO_USER_POOL_ID ', () => {
    const id = process.env.AWS_COGNITO_USER_POOL_ID;
    const poolId = getUserPoolID();
    // console.log(poolId);
    expect(poolId).toBe(id);
  });

  it('should ensure it returns correct AWS_COGNITO_USER_POOL_APP_CLIENT', () => {
    const client = process.env.AWS_COGNITO_USER_POOL_APP_CLIENT;
    const AppClient = getUserPoolAppClient();
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
