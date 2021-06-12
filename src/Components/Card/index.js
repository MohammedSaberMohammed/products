import React from 'react';
import PropTypes from 'prop-types';

// Bootstrap
import Card from 'react-bootstrap/Card';

function CardLayout({
  bg,
  border,
  imgSrc,
  textColor,
  imgPosition,
  title,
  subtitle,
  header,
  footer,
  children,
  centeredText,
  cardStyles,
  bodyClassName,
  onClick,
  multiSubtitle
}) {
  return (
    <Card
      bg={bg}
      border={border}
      text={textColor}
      onClick={onClick}
      className={`overflow-hidden light-shadow ${centeredText ? 'text-center' : ''} ${cardStyles}`}
    >
      {imgSrc && <Card.Img className='card-image' variant={imgPosition} src={imgSrc} />}
      {header && <Card.Header as={header.as} className={header.className || ''}>{header.custom ? header.custom : header.text}</Card.Header>}
            
      <Card.Body className={`${bodyClassName}`}>
        {title && <Card.Title className='ellipses' >{title}</Card.Title>}
        {subtitle && <Card.Subtitle>{subtitle}</Card.Subtitle>}
        {multiSubtitle?.length  && multiSubtitle.map((subtitle, i) => <Card.Subtitle className='mt-3' key={i}>{subtitle}</Card.Subtitle>)}
        {children}
      </Card.Body>

      {footer && <Card.Header>{footer}</Card.Header>}
    </Card>
  );
}

CardLayout.propTypes = {
  centeredText: PropTypes.bool,

  imgSrc: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  cardStyles: PropTypes.string,
  bodyClassName: PropTypes.string,

  onClick: PropTypes.func,

  footer: PropTypes.any,
  children: PropTypes.any,

  header: PropTypes.shape({ text: PropTypes.any, as: PropTypes.string }),

  imgPosition: PropTypes.oneOf([null, 'top', 'bottom']),
  bg: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']),
  border: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']),
  textColor: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'white', 'muted']),
};

CardLayout.defaultProps = {
  centeredText: false,

  imgSrc: '',
  title: '',
  subtitle: '',
  cardStyles: '',
  bodyClassName: '',

  imgPosition: 'top',
  footer: null,
  children: null,

  onClick() {}
};

export default CardLayout;
