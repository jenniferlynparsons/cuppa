import PropTypes from "prop-types";

export const authShape = PropTypes.shape({
  isAuthenticated: PropTypes.bool,
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string
  }),
  loading: PropTypes.bool
});

export const teaShape = PropTypes.shape({
  name: PropTypes.string,
  brand: PropTypes.string,
  servings: PropTypes.number,
  teaType: PropTypes.string,
  id: PropTypes.string
});

export const teaTypeShape = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  brewTime: PropTypes.string
});
