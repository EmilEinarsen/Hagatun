import React, { PropsWithChildren } from 'react'
import { CheckCircle, WarningCircle } from '@phosphor-icons/react'
import { clsx } from '~/utils/utils'

interface AlertProps extends PropsWithChildren {
  status: 'error' | 'success'
}

const ICON = {
  success: CheckCircle,
  error: WarningCircle
}

export const Alert = ({ status, children }: AlertProps) => {
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
            weight='regular' 
            className={clsx(
              'w-8 h-8 mr-4 fill-current',
              status === 'success' && 'text-green-500',
              status === 'error' && 'text-red-500',
            )}
          />
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  )
}
