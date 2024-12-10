import React from 'react'
import classNames from 'classnames';
import { type ButtonProps, Button } from '@mantine/core';

interface ExtendedButtonProps extends ButtonProps {
  onClick?: () => void;
}

export const NButton = React.memo(
  ({className, ...restProps}: ExtendedButtonProps) => {
    {
      return (
        <Button
          className={classNames('h-[44px] py-0 px-8', className)}
          variant="gradient"
          {...restProps}
        />
      )
    }
  }
)