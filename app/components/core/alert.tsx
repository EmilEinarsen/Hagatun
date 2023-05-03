import type {PropsWithChildren} from 'react'
import React from 'react'
import {CheckIcon, ExclamationCircleIcon} from '@heroicons/react/24/solid'
import {clsx} from 'clsx'

interface AlertProps extends PropsWithChildren {
  status: 'error' | 'success'
}

const ICON = {
  success: CheckIcon,
  error: ExclamationCircleIcon,
}

export const Alert = ({status, children}: AlertProps) => {
  const Icon = ICON[status]
  return (
    <div
      className={clsx(
        'max-w-md px-4 py-3 m-auto rounded-b shadow-md h-min',
        status === 'success' && 'text-green-900 bg-green-100',
        status === 'error' && 'text-red-900 bg-red-100'
      )}
      role="alert"
    >
      <div className="flex">
        <div className="py-1">
          <Icon
            className={clsx(
              'w-8 h-8 mr-4',
              status === 'success' && 'text-green-500',
              status === 'error' && 'text-red-500'
            )}
          />
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}
