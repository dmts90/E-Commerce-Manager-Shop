import React from "react";
import { Helmet } from "react-helmet";
const Meta = ({ description, keywords, title }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome to ProShop",
  descrtiption: "We sell Best Products For a Low Price",
  keywords: "Electronics,buy electronics,cheap electronics",
};

export default Meta;
