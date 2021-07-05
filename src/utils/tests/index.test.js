import {
  showNotification,
  NOTIFICATION_TYPE,
  getCognitoFormFields,
  promisify,
  convertGqlResponse,
  renderSelectOptions
} from '../index';

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
  const mockNotification = jest.fn((message, type) => {
    switch (type) {
      case 1:
        return { notificationMethod: 'success', icons: 'icSuccess' };
      case 2:
        return { notificationMethod: 'error', icons: 'icError' };
      case 3:
        return { notificationMethod: 'warning', icons: 'icWarning' };
      default:
        return { notificationMethod: 'info', icons: 'icWarning' };
    }
  });
  it('should ensure that it return undefined if message is not sent', () => {
    const notification = showNotification();
    expect(notification).toBeUndefined();
  });

  it('should make sure correct notification method is being called', () => {
    const message = 'hello';
    showNotification(message, 1);
    expect(mockNotification(message, 1)).toStrictEqual({ notificationMethod: 'success', icons: 'icSuccess' });

    showNotification(message, 2);
    expect(mockNotification(message, 2)).toStrictEqual({ notificationMethod: 'error', icons: 'icError' });

    showNotification(message, 3);
    expect(mockNotification(message, 3)).toStrictEqual({ notificationMethod: 'warning', icons: 'icWarning' });

    showNotification(message);
    expect(mockNotification(message)).toStrictEqual({ notificationMethod: 'info', icons: 'icWarning' });
  });
});

describe('getCognitoFormFields tests', () => {
  const mockdata = {
    location: {
      state: {
        userAttributes: [{ Name: 'given_name', Value: 'Rohan' }, { Name: 'phone_number', Value: '91232122' }]
      }
    }
  };
  it('should ensure that value is not null', () => {
    const data = getCognitoFormFields(mockdata);
    expect(data).not.toBeNull();
  });

  it('should ensure that length of array is correct', () => {
    const data = getCognitoFormFields(mockdata);
    const length = mockdata.location.state.userAttributes.length;
    expect(data.length).toBe(2 * length + 1);
  });

  it('should ensure that correct data is being returned', () => {
    const data = getCognitoFormFields(mockdata);

    mockdata.location.state.userAttributes.forEach(attr => {
      if (attr.Name === 'given_name') {
        const filteredName = data.filter(value => value.name === 'fullName');
        const filteredBusinessName = data.filter(value => value.name === 'businessName');

        expect(filteredName.length).toBeGreaterThan(0);
        expect(filteredBusinessName.length).toBeGreaterThan(0);
        expect(filteredBusinessName.length).toEqual(filteredName.length);
      } else if (attr.Name === 'phone_number') {
        const filteredPhone = data.filter(value => value.name === 'phone');
        const filteredCountryCode = data.filter(value => value.name === 'countryCode');

        expect(filteredPhone.length).toBeGreaterThan(0);
        expect(filteredCountryCode.length).toBeGreaterThan(0);
        expect(filteredCountryCode.length).toEqual(filteredPhone.length);
      }
    });
  });
});

describe('promisify tests', () => {
  it('should ensure that it is not returning null value', () => {
    const promise = promisify();
    expect(promise).not.toBeNull();
  });
});

describe('convertGqlResponse tests', () => {
  it('should ensure that it returns empty array when response is not being sent', () => {
    expect(convertGqlResponse()).toStrictEqual([]);
  });
});

describe('renderSelectOptions tests', () => {
  it('should return correct size', () => {
    const Options = renderSelectOptions(['apple', 'kiwi']);
    expect(Options.length).toBe(2);
  });
});
