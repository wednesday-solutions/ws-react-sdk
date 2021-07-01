/**
 *
 * ProfileWidget
 *
 */

import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { message, Modal, Spin, Button, Slider } from 'antd';
import Cropper from 'react-easy-crop';
import axios from 'axios';
import T from '@components/T';
import { colors, styles, fonts, media } from '@themes';
import { getCroppedImg } from '@utils/canvasUtils';
import { appIntl } from '@components/IntlGlobalProvider';
import iconEdit from '@images/ic-edit.svg';
import { MinusOutlined, PlusOutlined, LoadingOutlined } from '@ant-design/icons';
const Container = styled.div`
  width: 6rem;
  position: relative;
  border-radius: 10px;
  align-self: center;
  margin-bottom: 20px;
`;

const ProfileImageContainer = styled.div`
  width: 100%;
  ${styles.flexConfig.row()};
  align-items: center;
  justify-content: center;
`;

const ProfileImageWrapper = styled.div`
  width: 5.625rem;
  height: 5.625rem;
  position: relative;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

const ProfileImageTextWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  padding: 4px;
  background-color: ${colors.primary};
  ${styles.flexConfig.row()};
  align-items: center;
  justify-content: center;
`;

const ProfileImageText = styled(T)`
  margin-bottom: 0;
  font-weight: 500;
  font-size: 4.5rem;
  line-height: 4.5rem;
  color: ${colors.white};
  display: inline-block;
`;

const ProfileImageEditWrapper = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  display: flex;
  float: right;
  cursor: pointer;
`;
const ProfileIconContainer = styled.div`
  height: 1.5rem;
  width: 1.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  background: ${colors.whiteSmoke};
  cursor: pointer;
`;
const ProfileImageEditIcon = styled.img`
  width: 1rem;
  height: 1rem;
  margin-left: 0.25rem;
`;

const FileElement = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

const CropWrapper = styled.div`
  width: 18rem;
  height: 18rem;
  position: relative;
`;
const CustomOverlay = styled.div`
  ${props => props.bgi && `background-image: url(${props.bgi});`}
  width: 100%;
  height: 100%;
  ${styles.flexConfig.row()};
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  opacity: 1;
`;
const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 8px;
  }
  .ant-modal-body {
    padding-bottom: 0;
  }
  .ant-modal-footer {
    border: 0;
    margin-top: 1rem;
    padding: 1.5rem;
  }
`;
const CancelButton = styled(Button)`
  color: ${colors.pawlyBlue};
  ${fonts.weights.bold()};
  font-stretch: normal;
  line-height: 1;
  letter-spacing: normal;
`;
const SubmitButton = styled(Button)`
  ${fonts.weights.bold()};
  font-stretch: normal;
  line-height: 1;
  letter-spacing: normal;
  border-radius: 5px;
`;
const CropDiv = styled.div`
  background: ${colors.whiteSmoke};
  padding: 1rem;
  margin: 0.1rem;
  ${media.largeMobile.max(`
    padding: 0.6rem;
  `)}
`;
const SliderDiv = styled.div`
  position: relative;
  padding: 0px 2rem;
  .anticon {
    position: absolute;
    top: -2px;
    color: ${colors.pawlyBlue};
    font-size: 16px;
    line-height: 1;
  }
  .anticon:first-child {
    left: 0;
  }
  .anticon:last-child {
    right: 0;
  }
`;
const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;

function ProfileWidget({ user, updateProfilePicture, loading, onProfileImgSet, disabled, ...props }) {
  const [imageSrc, setImageSrc] = useState(null);
  const [showCropModal, setShowCropModal] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [imgData, setImgData] = useState('');

  const uploadProfilePicture = async (preSignedPutUrl, data) => {
    const config = {
      headers: {
        'Content-Type': imgData.type
      }
    };
    try {
      const response = await axios.put(preSignedPutUrl, data, config);
      if (response.status === 200) {
        const fileUrl = response.config.url.substr(0, response.config.url.indexOf('?'));
        updateProfilePicture(fileUrl);
      }
    } catch (e) {
      message.error(appIntl().formatMessage({ id: 'profile_picture_updated_fail' }));
    }
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(
    async fileName => {
      try {
        const ci = await getCroppedImg(imageSrc, croppedAreaPixels);
        const blob = await fetch(ci).then(r => r.blob());
        await handleUpload(fileName, blob);
        setCroppedImage(ci);
        onProfileImgSet(ci);
        onCloseCropModal();
      } catch {
        onCloseCropModal();
      }
    },
    [imageSrc, croppedAreaPixels]
  );
  const onFileChange = async e => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl);
      setImgData(file);
      const allowedImgSize = 256 * 256;
      if (file.size > allowedImgSize) {
        message.error(appIntl().formatMessage({ id: 'profile_picture_wrong_size' }));
        return;
      }
      setShowCropModal(true);
      const allowedImgTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      if (!allowedImgTypes.includes(file.type)) {
        message.error(appIntl().formatMessage({ id: 'profile_picture_wrong_format' }));
        onCloseCropModal();
      }
    }
  };
  const handleUpload = (fileName, blob) =>
    new Promise((resolve, reject) => {
      return props.getPreSignedUri({ contentType: imgData.type.replace('/', '_') }).then(response => {
        try {
          const {
            data: { preSignedUri }
          } = response;
          const file = new File([blob], preSignedUri.key, {
            type: imgData.type
          });
          uploadProfilePicture(preSignedUri.uri, file).then(() => {
            resolve(preSignedUri.uri);
          });
        } catch (err) {
          message.error(appIntl().formatMessage({ id: 'profile_picture_updated_fail' }));
          reject(err);
        }
      });
    });

  const onCloseCropModal = () => {
    setShowCropModal(false);
  };

  function readFile(file) {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.addEventListener('load', () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  }

  const renderProfileImage = () => {
    if (croppedImage) {
      return <CustomOverlay bgi={croppedImage}>{loading && <Spin indicator={antIcon} />}</CustomOverlay>;
    }
    if (user?.photoUrl) {
      return <ProfileImage src={user?.photoUrl} />;
    }
    return (
      <span data-testid="user-name-initial">
        <ProfileImageTextWrapper>
          <ProfileImageText text={user?.name?.charAt(0)} />
        </ProfileImageTextWrapper>
      </span>
    );
  };
  const handleNewImage = () => {
    showCroppedImage(imgData.name);
  };
  function onChangeSlider(value) {
    setZoom(value);
  }
  return (
    <Container {...props} data-testid="profile-widget">
      <ProfileImageContainer>
        <ProfileImageWrapper>
          {!disabled && (
            <ProfileImageEditWrapper>
              <label htmlFor="profilePic">
                <ProfileIconContainer>
                  <ProfileImageEditIcon src={iconEdit} />
                </ProfileIconContainer>
              </label>

              <FileElement
                data-cy="profilePic"
                type="file"
                name="profilePic"
                id="profilePic"
                accept="image/jpeg, image/jpg, image/png"
                onChange={onFileChange}
                onClick={event => (event.target.value = null)}
              />
            </ProfileImageEditWrapper>
          )}
          {renderProfileImage()}
        </ProfileImageWrapper>
      </ProfileImageContainer>

      <StyledModal
        onCancel={onCloseCropModal}
        visible={showCropModal}
        title={null}
        width="23rem"
        centered
        closable={false}
        onOk={handleNewImage}
        footer={[
          <CancelButton key="back" type="text" onClick={onCloseCropModal}>
            <T id="cancel" />
          </CancelButton>,
          <SubmitButton key="submit" type="primary" loading={loading} onClick={handleNewImage}>
            <T id="upload_new" />
          </SubmitButton>
        ]}
      >
        <CropDiv>
          <CropWrapper>
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              cropSize={{ width: 256, height: 256 }}
              cropShape={'round'}
            />
          </CropWrapper>
        </CropDiv>
        <SliderDiv>
          <MinusOutlined />
          <Slider min={1} max={3} step={0.1} tipFormatter={null} onChange={onChangeSlider} />
          <PlusOutlined />
        </SliderDiv>
      </StyledModal>
    </Container>
  );
}

ProfileWidget.propTypes = {
  onSetActiveForm: PropTypes.func,
  activeForm: PropTypes.number,
  user: PropTypes.object,
  updateProfilePicture: PropTypes.func,
  loading: PropTypes.bool,
  onProfileImgSet: PropTypes.func,
  getPreSignedUri: PropTypes.func,
  round: PropTypes.func,
  disabled: PropTypes.boolean
};

export default ProfileWidget;
