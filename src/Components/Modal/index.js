import React from 'react';
import PropTypes from 'prop-types';
// Bootstrap
import Modal from 'react-bootstrap/Modal';
// Loading
import ActivityIndicator from '../ActivityIndicator';

class ModalViewer extends React.Component {
  componentDidCatch(err) {
    // console.log('ModalViewer', err);
  }

  render() {
    const {
      show,
      size,
      title,
      actions,
      children,
      centered,
      backdrop,
      animation,
      isLoading,
      scrollable,
      closeLabel,
      enableClose,
      handleClose,
      titleStyles,
      footerStyles,
      headerStyles,
      bodyStyles,
      dialogClassName,
      backdropClassName,
    } = this.props;

    return (
      <div style={{ position: 'relative' }} >
        <Modal
          show={show}
          size={size}
          centered={centered}
          backdrop={backdrop}
          onHide={handleClose}
          animation={animation}
          scrollable={scrollable}
          dialogClassName={dialogClassName}
          backdropClassName={backdropClassName}
          className={dialogClassName}
        >
          {isLoading && (
            <div className={'attached-loader'}>
              <ActivityIndicator />
            </div>
          )}

          <div className={`${isLoading ? 'loading-overlay-body' : ''}`}>
            {title && (
              <Modal.Header
                closeButton={enableClose}
                closeLabel={closeLabel}
                className={`d-flex justify-content-between align-items-start ${headerStyles}`}
              >
                <Modal.Title className={`${titleStyles}`}>{title}</Modal.Title>
              </Modal.Header>
            )}

            <Modal.Body className={`${bodyStyles}`}>{children}</Modal.Body>

            {actions && <Modal.Footer className={`${footerStyles}`}>{actions}</Modal.Footer>}
          </div>
        </Modal>
      </div>
    );
  }
}

ModalViewer.propTypes = {
  title: PropTypes.any,
  actions: PropTypes.any,
  children: PropTypes.any,

  show: PropTypes.bool,
  centered: PropTypes.bool,
  animation: PropTypes.bool,
  isLoading: PropTypes.bool,
  scrollable: PropTypes.bool,
  enableClose: PropTypes.bool,

  bodyStyles: PropTypes.string,
  footerStyles: PropTypes.string,
  titleStyles: PropTypes.string,
  headerStyles: PropTypes.string,
  dialogClassName: PropTypes.string,
  backdropClassName: PropTypes.string,

  size: PropTypes.oneOf(['sm', 'lg', 'xl']),
  backdrop: PropTypes.oneOf([true, false, 'static']),

  handleClose: PropTypes.func,
};

ModalViewer.defaultProps = {
  show: false,
  animation: true,
  backdrop: false,
  centered: true,
  scrollable: true, // if [ Yes ---> only scroll modal body ] [ No ----> scroll the entire page ]
  isLoading: false,
  enableClose: true,

  size: 'lg',
  title: '',
  bodyStyles: '',
  footerStyles: '',
  titleStyles: '',
  headerStyles: '',
  dialogClassName: '',
  backdropClassName: '',

  handleClose() { },
};

export default ModalViewer;
