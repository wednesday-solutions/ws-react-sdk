import React from 'react';
import styled from 'styled-components';
import { message as notification, Select } from 'antd';
import icError from '@images/ic-error.svg';
import icSuccess from '@images/ic-success.svg';
import icWarning from '@images/ic-warning.svg';
import { getCountryCodeAndStrippedNumber } from '@utils/validationUtils';
import loadable from './loadable';

const { Option } = Select;

export const NOTIFICATION_TYPE = {
  SUCCESS: 1,
  ERROR: 2,
  WARNING: 3,
  INFO: 4
};
const StyledToastIcon = styled.img`
  margin-right: 10px;
`;

export const showNotification = (message, type = NOTIFICATION_TYPE.INFO) => {
  if (!message) {
    return;
  }
  let notificationMethod;
  let icon;
  switch (type) {
    case NOTIFICATION_TYPE.SUCCESS:
      notificationMethod = notification.success;
      icon = icSuccess;
      break;
    case NOTIFICATION_TYPE.ERROR:
      notificationMethod = notification.error;
      icon = icError;
      break;
    case NOTIFICATION_TYPE.WARNING:
      notificationMethod = notification.warning;
      icon = icWarning;
      break;
    default:
      notificationMethod = notification.info;
      icon = icWarning;
  }
  notificationMethod({
    content: message,
    icon: <StyledToastIcon src={icon} />
  });
};

export const getCognitoFormFields = props => {
  const formFields = [
    {
      name: 'email',
      value: props?.location?.state?.vetData?.email
    }
  ];

  // eslint-disable-next-line no-unused-expressions
  props?.location?.state?.userAttributes?.forEach(attr => {
    if (attr.Name === 'given_name') {
      formFields.push({
        name: 'fullName',
        value: attr.Value
      });
      formFields.push({
        name: 'businessName',
        value: attr.Value
      });
    } else if (attr.Name === 'phone_number') {
      const { countryCode, strippedNumber } = getCountryCodeAndStrippedNumber(attr.Value);
      formFields.push({
        name: 'phone',
        value: strippedNumber
      });
      formFields.push({
        name: 'countryCode',
        value: countryCode
      });
    }
  });
  return formFields;
};

export const promisify = callback => {
  return new Promise((resolve, reject) => callback(resolve, reject));
};
export * from './validationUtils';
export * from '../services/cognito';
export * from './canvasUtils';
export { loadable };

export function convertGqlResponse(res) {
  return (res?.edges || []).map(a => a?.node).filter(a => !!a);
}

export function renderSelectOptions(options = []) {
  return options.map(function(ele, i) {
    return (
      <Option key={i} value={ele}>
        {ele}
      </Option>
    );
  });
}
