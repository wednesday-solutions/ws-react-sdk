/**
 *
 * CustomDisableFormButton
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'antd';
import styled from 'styled-components';
import { media, colors, fonts } from '@themes';

const DFI = styled(Form.Item)`
  && {
    .ant-form-item-explain,
    .ant-form-item-extra {
      text-align: left;
    }
    .ant-form-item {
      margin: 0;
    }
    .ant-form-item-has-error .ant-input,
    .ant-form-item-has-error .ant-input:hover,
    .ant-form-item-has-error .ant-input,
    .ant-form-item-has-error .ant-input:focus-within {
      background-color: ${colors.white};
      box-shadow: none;
    }
    .ant-form-item-has-error .ant-input-affix-wrapper,
    .ant-form-item-has-error .ant-input-affix-wrapper:hover {
      background-color: ${colors.white};
      box-shadow: none;
    }
    &.ant-form-item-control-input {
      min-height: 3.5rem;
      ${media.desktop.max(`
      min-height: 3rem;
    `)}
      ${media.largeMobile.max(`
      min-height: 2.5rem;
    `)}
    width: 100%;
    }
  }
`;

const DCB = styled(Button)`
  &.ant-btn-lg {
    ${props => props.width && `width: ${props.width}%;`};
    border-radius: 8px;
    height: 3.5rem;
    ${media.desktop.max(`
      height: 3rem;
    `)}
    ${media.largeMobile.max(`
      height: 2.5rem;
    `)}
    ${fonts.style.xRegularFW600()};
    margin-bottom: 1rem;
    border: 2px solid ${colors.green};
  }
`;

function CustomDisableFormButton(props) {
  const isFieldsTouchedCheck = () => !props?.form?.isFieldsTouched(true);

  const hasError = () => !!props?.form?.getFieldsError().filter(({ errors }) => errors.length).length;

  return (
    <DFI data-testid="custom-disable-form-button" shouldUpdate={true}>
      {() => (
        <DCB disabled={isFieldsTouchedCheck() || hasError()} {...props}>
          {props.text}
        </DCB>
      )}
    </DFI>
  );
}

CustomDisableFormButton.propTypes = {
  isFieldsTouched: PropTypes.func,
  getFieldsError: PropTypes.func,
  text: PropTypes.string,
  form: PropTypes.object
};

export default CustomDisableFormButton;
