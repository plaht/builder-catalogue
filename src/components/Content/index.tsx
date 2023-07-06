import React from 'react';
import cx from 'classnames';

const Content: React.FC<JSX.IntrinsicElements['main']> = ({
  children,
  className,
  ...rest
}) => (
  <main className={cx('', className)} {...rest}>
    {children}
  </main>
);

export default Content;
