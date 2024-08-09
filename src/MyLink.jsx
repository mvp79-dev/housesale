import React, { memo, useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import App from './App';

const MyLink = memo((props) => {
  const lenis = useContext(App)?.lenis;
  const navigate = useNavigate();

  const handleClick = (e) => {
    if ((!props.target || props.target === '_self') && props.scroll !== false) {
      e.preventDefault();
      navigate(props.to).then(() => {
        lenis?.scrollTo(0, {
            immediate: true,
          });
      })
    }
  };

  return (
    <RouterLink {...props} onClick={handleClick}>
      {props.children}
    </RouterLink>
  );
});

export default MyLink;