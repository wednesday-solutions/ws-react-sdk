import { showNotification, NOTIFICATION_TYPE, getCognitoFormFields, promisify } from '../index';

describe('Notification_Type tests', () => {
  it('should ensure that it is not null', () => {
    expect(NOTIFICATION_TYPE).not.toBeNull();
  });
  it('should have all the keys', () => {
    const objectLength = Object.keys(NOTIFICATION_TYPE).length;
    expect(objectLength).toBe(4);
  });
});

describe('Notification tests', () => {
  it('should ensure that it return undefined if message is not sent', () => {
    const notification = showNotification();
    expect(notification).toBeUndefined();
  });
  it('should ensure that it should call correct Notification types', () => {
    // const icon = 'icWarning';
    showNotification('hello');
  });
});

describe('getCognitoFormFields tests', () => {
  const mockdata = {
    props: {
      location: {
        state: {
          userAttributes: [{ Name: 'given_name', Value: 'Rohan' }]
        }
      }
    }
  };
  it('should ensure that value is not null', () => {
    const data = getCognitoFormFields(mockdata);
    expect(data).not.toBeNull();
  });

  it('should ensure that value is phone number', () => {
    const mockdataR = {
      location: {
        state: {
          userAttributes: [{ Name: 'given_name', Value: 'Rohan' }]
        }
      }
    };
    const data = getCognitoFormFields(mockdataR);
    // eslint-disable-next-line no-console
    console.log(data);
    expect(data).not.toBeNull();
  });
});

describe('promisify tests', () => {
  it('should ensure that it is returning', () => {
    const promise = promisify();
    expect(promise).not.toBeNull();
  });
});
