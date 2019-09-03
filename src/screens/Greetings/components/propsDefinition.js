import PropTypes from 'prop-types';

export const interactionMessageProps = {
  text: PropTypes.string,
  icon: PropTypes.string,
  action: PropTypes.func,
  AcceptedPrcolor: PropTypes.string,
  NotAcceptedPrcolor: PropTypes.string,
  AcceptedBgcolor: PropTypes.string,
  NotAcceptedBgcolor: PropTypes.string
};

export const interactionMessageDefaultProps = {
  text: '',
  icon: '',
  action: () => {}
};
