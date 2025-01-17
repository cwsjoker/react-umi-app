import React from 'react'
import classNames from 'classnames';
import { type ButtonProps, Button } from '@mantine/core';

interface ExtendedButtonProps extends ButtonProps {
  onClick?: () => void;
}

export const NButton = React.memo(
  ({className, ...restProps}: ExtendedButtonProps) => {
    console.log('className', className)
    {
      return (
        <Button
          className={classNames('h-40 py-0 px-8 text-12', className)}
          // variant="gradient"
          {...restProps}
        />
      )
    }
  }
)