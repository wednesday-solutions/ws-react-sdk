/**
 *
 * OtpInput
 *
 */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { translate } from '@components/IntlGlobalProvider';
import Timer from '@components/Timer';
import { colors } from '@themes';
import { resendConfirmationCode, updatePhoneNumberRequest } from '@services/cognito';
import CustomInput from '@components/CustomInput';
import { NOTIFICATION_TYPE, showNotification } from '@utils';

const ResendWrapper = styled.span`
  background-color: ${colors.white};
  background: ${colors.white};
`;
const OTP = styled(CustomInput)`
  &.ant-input-affix-wrapper {
    border-radius: 8px;
    border: solid 1px ${colors.secondary};
  }
  &.ant-input-affix-wrapper > input.ant-input {
    border: none;
    max-height: 3rem;
  }
`;

async function resendOTP(props) {
  try {
    if (props.verifyNumber) {
      await updatePhoneNumberRequest(props.email, props.phone);
    } else {
      await resendConfirmationCode(props.email);
    }
    showNotification(translate('otp_resent'), NOTIFICATION_TYPE.SUCCESS);
  } catch (e) {
    const message = e.message || translate('failed_to_send_otp');
    showNotification(message || e, NOTIFICATION_TYPE.ERROR);
    throw e;
  }
}

const renderResendOTP = props => (
  <ResendWrapper>
    <Timer initialMinute={0} initialSeconds={0} retryNo={5} resendCallback={() => resendOTP(props)} />
  </ResendWrapper>
);

function OtpInput(props) {
  return (
    <OTP data-testid={'otp-input'} {...props} suffix={renderResendOTP(props)} placeholder={translate('otp_msg')} />
  );
}

OtpInput.propTypes = {
  verifyNumber: PropTypes.bool,
  phone: PropTypes.string
};

export default OtpInput;
