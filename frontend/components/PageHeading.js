import React from "react";
import PropTypes from "prop-types";

const PageHeading = ({
  src,
  alt,
  pictureClassName,
  pageTitle,
  pageAnnotation
}) => (
  <>
    <img src={`../../../static/${src}`} alt={alt} className={pictureClassName} />
    <h2 className="page__heading">{pageTitle}</h2>
    <p className="page__annotation">{pageAnnotation}</p>
  </>
);

PageHeading.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  pictureClassName: PropTypes.string.isRequired,
  pageTitle: PropTypes.string.isRequired,
  pageAnnotation: PropTypes.string.isRequired
};

export default PageHeading;
