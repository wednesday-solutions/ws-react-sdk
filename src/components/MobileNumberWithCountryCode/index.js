/**
 *
 * MobileNumberWithCountryCode
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { updatePhoneNumberRequest } from '@services/cognito';
import { isRequired, isValidNumberWithCountry } from '@utils/validationUtils';
import CustomInput from '@components/CustomInput';
import FormItem from '@components/FormItem';
import { appIntl } from '@components/IntlGlobalProvider';
import If from '@components/If';
import T from '@components/T';
import styled from 'styled-components';
import { fonts, media, colors } from '@themes';
import { getValidCountryCode, getValidPhoneNumber } from '@utils/common';

const CountryCode = styled(FormItem)`
  flex: 0.25;
  ${media.tablet.max(`
  flex: 0.15;
  `)};
  max-width: 6rem;
  min-width: 4rem;
`;
const MobileNoContainer = styled.div`
  display: flex;
`;
const MobileNoField = styled(FormItem)`
  flex: 1;
  margin-left: 1rem !important;
`;

const Verify = styled(T)`
  && {
    cursor: pointer;
    color: ${colors.darkFuchsia};
    text-transform: uppercase;
    ${fonts.size.xSmall()};
    ${fonts.weights.fw600()};
    margin-bottom: 0;
  }
`;
const CustomMobileInput = styled(CustomInput)`
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  /* Firefox */
  input[type='number'] {
    -moz-appearance: textfield;
  }
`;

function MobileNumberWithCountryCode({ countryCode, strippedNumber, showVerify, ...props }) {
  const [numberChanged, setNumberChanged] = useState(false);
  const [requestedVerification, setRequestedVerification] = useState(false);
  const [originalNumber, setOriginalNumber] = useState();
  useEffect(() => {
    if (!originalNumber && getValidPhoneNumber(countryCode, strippedNumber) !== originalNumber) {
      setRequestedVerification(false);
    }
  }, [strippedNumber, countryCode]);
  const handleOnChange = () => {
    if (!numberChanged) {
      setNumberChanged(true);
      setOriginalNumber(getValidPhoneNumber(countryCode, strippedNumber));
    } else if (
      getValidPhoneNumber(props.getForm().getFieldValue('countryCode'), props.getForm().getFieldValue('phone')) ===
      originalNumber
    ) {
      setNumberChanged(false);
    }
  };

  const handleVerifyClickListener = async () => {
    if (
      !isValidNumberWithCountry(props.getForm().getFieldValue('countryCode'), props.getForm().getFieldValue('phone'))
    ) {
      const fields = ['countryCode', 'phone'];
      props.getForm().validateFields(fields);
    } else {
      await updatePhoneNumberRequest(
        props.getForm().getFieldValue('email'),
        getValidPhoneNumber(props.getForm().getFieldValue('countryCode'), props.getForm().getFieldValue('phone'))
      );
      props.verifyClickListener();
    }
  };
  return (
    <MobileNoContainer data-testid={'mobile-number-with-country-code'}>
      <CountryCode
        initialValue={getValidCountryCode(countryCode)}
        rules={[
          {
            message: appIntl().formatMessage({ id: 'invalid_mobile_num_msg' }),
            validator: (rule, value, callback) => {
              if (
                !isValidNumberWithCountry(
                  props.getForm().getFieldValue('countryCode'),
                  props.getForm().getFieldValue('phone')
                )
              ) {
                props.getForm().setFields([
                  {
                    name: 'phone',
                    errors: [
                      appIntl().formatMessage({
                        id: 'invalid_mobile_num_msg'
                      })
                    ]
                  }
                ]);
              } else {
                callback();
              }
            }
          }
        ]}
        validateTrigger={'onBlur'}
        name="countryCode"
      >
        <CustomInput
          onChange={handleOnChange}
          data-testid="code-input"
          autoComplete="off"
          maxLength={4}
          placeholder={process.env.DEFAULT_COUNTRY_CODE}
        />
      </CountryCode>
      <MobileNoField
        initialValue={strippedNumber}
        rules={[
          ...isRequired(appIntl().formatMessage({ id: 'field_required' })),
          {
            message: appIntl().formatMessage({ id: 'invalid_mobile_num_msg' }),
            validator: (rule, value, callback) => {
              if (
                !isValidNumberWithCountry(
                  props.getForm().getFieldValue('countryCode'),
                  props.getForm().getFieldValue('phone')
                )
              ) {
                callback(new Error(appIntl().formatMessage({ id: 'invalid_mobile_num_msg' })));
              } else {
                callback();
              }
            }
          }
        ]}
        validateTrigger={'onBlur'}
        name="phone"
      >
        <CustomMobileInput
          type="number"
          suffix={
            <If condition={!requestedVerification && showVerify && numberChanged}>
              <Verify id="verify" onClick={handleVerifyClickListener} />
            </If>
          }
          onChange={handleOnChange}
          autoComplete="off"
          data-testid="mobile-input"
          placeholder={appIntl().formatMessage({ id: 'contact_no' })}
        />
      </MobileNoField>
    </MobileNoContainer>
  );
}

MobileNumberWithCountryCode.propTypes = {
  getForm: PropTypes.func,
  countryCode: PropTypes.string,
  strippedNumber: PropTypes.string,
  showVerify: PropTypes.bool,
  verifyClickListener: PropTypes.func
};

MobileNumberWithCountryCode.defaultProps = {
  verifyClickListener: () => {}
};

export default MobileNumberWithCountryCode;
