/**
 *
 * Header
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Badge, Dropdown, Layout } from 'antd';
import styled from 'styled-components';
import { fonts, colors, media } from '@themes';
import If from '@components/If';
import T from '@components/T';
import injectIntl from '@components/injectIntl';
import { get, toUpper } from 'lodash';
import { UserOutlined, BellOutlined } from '@ant-design/icons';

const StyledHeader = styled(Layout.Header)`
  && {
    &.ant-layout-header {
      height: 6rem;
      padding: 0 2rem;
      border-bottom: 1px solid lightgray;
      ${media.tablet.max(`
         height: 5rem;
         padding: 0 1rem;
     `)};
      ${media.largeMobile.max(`
       height: 3rem;
     `)};
    }
    display: flex;
    align-items: center;
    background-color: ${colors.white};
  }
`;

const Logo = styled.img`
  height: 2.5rem;
  width: 8.75rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  ${media.largeMobile.max(`
   height: 1.475rem;
   width: 5.1875rem;
   `)};
`;

const OptionContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: auto;
`;

const StyledBellFilled = styled(BellOutlined)`
  ${fonts.size.large()};
  ${media.largeMobile.max(`
     ${fonts.size.small()};
   `)};
`;
const StyledBadge = styled(Badge)`
  cursor: pointer;
  .anticon {
    color: ${colors.darkFuchsia};
  }
  .ant-badge-dot {
    right: 0.4rem;
    top: 0.1rem;
  }
`;

export const ProfileContainer = styled.div`
  display: flex;
  position: relative;
  height: 2.6rem;
  width: 2.6rem;
  margin-left: 1rem;
  background: ${colors.primary};
  color: ${colors.white};
  border-radius: 50%;
  cursor: pointer;
  ${props => props.zIndex && `z-index: 5;`}
  justify-content: center;
  align-items: center;
  ${media.largeMobile.max(`
     height: 1.5rem;
     width: 1.5rem
   `)};
`;

export const UserName = styled(T)`
  ${fonts.size.big()};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  ${media.largeMobile.max(`
     ${fonts.size.small()};
   `)};
`;
export const ProfileImg = styled.img`
  width: 100%;
  border-radius: 50px;
`;

export const DefaultImg = styled(UserOutlined)`
  && {
    font-size: 1.5rem;
  }
`;
const Title = styled(T)`
  && {
    margin-bottom: 0;
    ${fonts.dynamicFontSize(fonts.size.xRegular, 1, 0.5)};
    display: flex;
    align-self: center;
  }
`;

function Header({
  logo,
  user,
  dropdownOverlay,
  handleOnLogoClick,
  hasNewNotifications,
  hasNotificationIcon,
  header,
  ...props
}) {
  const userName = toUpper(get(user, 'name', ''));
  const defaultProfile = userName ? (
    <div data-testid="user-name-initial">
      <UserName text={userName.charAt(0)} />
    </div>
  ) : (
    <DefaultImg />
  );
  return (
    <StyledHeader {...props} data-testid="header">
      <Logo src={logo} data-testid="logo" onClick={handleOnLogoClick} />
      <If condition={header}>
        <Title data-testId='title' type="heading" id={header} />
      </If>
      <OptionContainer>
        <If condition={hasNotificationIcon}>
          <StyledBadge data-testid="notification-badge" dot={hasNewNotifications}>
            <StyledBellFilled />
          </StyledBadge>
        </If>
        <If condition={dropdownOverlay}>
          <Dropdown overlay={dropdownOverlay} placement="bottomRight" trigger={['hover']}>
            <ProfileContainer >
              <If condition={user?.photoUrl} otherwise={defaultProfile}>
                <ProfileImg src={user?.photoUrl} />
              </If>
            </ProfileContainer>
          </Dropdown>
        </If>
      </OptionContainer>
    </StyledHeader>
  );
}

Header.propTypes = {
  logo: PropTypes.element.isRequired,
  user: PropTypes.object,
  dropdownOverlay: PropTypes.element,
  handleOnLogoClick: PropTypes.func.isRequired,
  hasNewNotifications: PropTypes.bool,
  hasNotificationIcon: PropTypes.bool,
  header: PropTypes.string
};

Header.defaultProps = {
  user: {
    name: ''
  },
  hasNotificationIcon: false,
  hasNewNotifications: false
};

export default injectIntl(Header);
