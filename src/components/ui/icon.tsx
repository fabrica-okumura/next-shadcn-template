import React from 'react'
import Image from 'next/image'

interface IconProps {
  name: string
  size?: number
  className?: string
  alt?: string
}

export function Icon({ name, size = 24, className = '', alt }: IconProps) {
  return (
    <Image
      src={`/images/icons/${name}.svg`}
      alt={alt || name}
      width={size}
      height={size}
      className={className}
    />
  )
}

// すべてのアイコンファイルのエイリアス
export const Icons = {
  AccountPlus: (props: Omit<IconProps, 'name'>) => <Icon name="account_plus" {...props} />,
  ArrowBorderDown: (props: Omit<IconProps, 'name'>) => <Icon name="arrow_border_down" {...props} />,
  ArrowBorderLeft: (props: Omit<IconProps, 'name'>) => <Icon name="arrow_border_left" {...props} />,
  ArrowBorderRight: (props: Omit<IconProps, 'name'>) => <Icon name="arrow_border_right" {...props} />,
  ArrowBorderUp: (props: Omit<IconProps, 'name'>) => <Icon name="arrow_border_up" {...props} />,
  ArrowDown: (props: Omit<IconProps, 'name'>) => <Icon name="arrow_down" {...props} />,
  ArrowLeft: (props: Omit<IconProps, 'name'>) => <Icon name="arrow_left" {...props} />,
  ArrowRight: (props: Omit<IconProps, 'name'>) => <Icon name="arrow_right" {...props} />,
  ArrowUp: (props: Omit<IconProps, 'name'>) => <Icon name="arrow_up" {...props} />,
  Blank: (props: Omit<IconProps, 'name'>) => <Icon name="blank" {...props} />,
  Calculator: (props: Omit<IconProps, 'name'>) => <Icon name="calculator" {...props} />,
  Calendar: (props: Omit<IconProps, 'name'>) => <Icon name="calendar" {...props} />,
  Car: (props: Omit<IconProps, 'name'>) => <Icon name="car" {...props} />,
  Caution: (props: Omit<IconProps, 'name'>) => <Icon name="caution" {...props} />,
  CheckmarkCircle: (props: Omit<IconProps, 'name'>) => <Icon name="checkmark_circle" {...props} />,
  Checkmark: (props: Omit<IconProps, 'name'>) => <Icon name="checkmark" {...props} />,
  Clock: (props: Omit<IconProps, 'name'>) => <Icon name="clock" {...props} />,
  CloseCircleBorder: (props: Omit<IconProps, 'name'>) => <Icon name="close_circle_border" {...props} />,
  CloseCircle: (props: Omit<IconProps, 'name'>) => <Icon name="close_circle" {...props} />,
  Close: (props: Omit<IconProps, 'name'>) => <Icon name="close" {...props} />,
  Copy: (props: Omit<IconProps, 'name'>) => <Icon name="copy" {...props} />,
  CustomerList: (props: Omit<IconProps, 'name'>) => <Icon name="customer_list" {...props} />,
  DocumentCreation: (props: Omit<IconProps, 'name'>) => <Icon name="document_creation" {...props} />,
  Document: (props: Omit<IconProps, 'name'>) => <Icon name="document" {...props} />,
  Documents: (props: Omit<IconProps, 'name'>) => <Icon name="documents" {...props} />,
  Download: (props: Omit<IconProps, 'name'>) => <Icon name="download" {...props} />,
  DragHandle: (props: Omit<IconProps, 'name'>) => <Icon name="drag_handle" {...props} />,
  Edit: (props: Omit<IconProps, 'name'>) => <Icon name="edit" {...props} />,
  Files: (props: Omit<IconProps, 'name'>) => <Icon name="files" {...props} />,
  Folder: (props: Omit<IconProps, 'name'>) => <Icon name="folder" {...props} />,
  FullscreenExit: (props: Omit<IconProps, 'name'>) => <Icon name="fullscreen_exit" {...props} />,
  Fullscreen: (props: Omit<IconProps, 'name'>) => <Icon name="fullscreen" {...props} />,
  Garage: (props: Omit<IconProps, 'name'>) => <Icon name="garage" {...props} />,
  Graph: (props: Omit<IconProps, 'name'>) => <Icon name="graph" {...props} />,
  Help: (props: Omit<IconProps, 'name'>) => <Icon name="help" {...props} />,
  Home: (props: Omit<IconProps, 'name'>) => <Icon name="home" {...props} />,
  ListPlus: (props: Omit<IconProps, 'name'>) => <Icon name="list_plus" {...props} />,
  ListSelect: (props: Omit<IconProps, 'name'>) => <Icon name="list_select" {...props} />,
  List: (props: Omit<IconProps, 'name'>) => <Icon name="list" {...props} />,
  Loading: (props: Omit<IconProps, 'name'>) => <Icon name="loading" {...props} />,
  Logout: (props: Omit<IconProps, 'name'>) => <Icon name="logout" {...props} />,
  Mail: (props: Omit<IconProps, 'name'>) => <Icon name="mail" {...props} />,
  MinusCircle: (props: Omit<IconProps, 'name'>) => <Icon name="minus_circle" {...props} />,
  Minus: (props: Omit<IconProps, 'name'>) => <Icon name="minus" {...props} />,
  OptionPlus: (props: Omit<IconProps, 'name'>) => <Icon name="option_plus" {...props} />,
  Pickup: (props: Omit<IconProps, 'name'>) => <Icon name="pickup" {...props} />,
  PlusCircle: (props: Omit<IconProps, 'name'>) => <Icon name="plus_circle" {...props} />,
  Plus: (props: Omit<IconProps, 'name'>) => <Icon name="plus" {...props} />,
  Print: (props: Omit<IconProps, 'name'>) => <Icon name="print" {...props} />,
  Refresh: (props: Omit<IconProps, 'name'>) => <Icon name="refresh" {...props} />,
  Return: (props: Omit<IconProps, 'name'>) => <Icon name="return" {...props} />,
  Search: (props: Omit<IconProps, 'name'>) => <Icon name="search" {...props} />,
  Send: (props: Omit<IconProps, 'name'>) => <Icon name="send" {...props} />,
  Settings: (props: Omit<IconProps, 'name'>) => <Icon name="settings" {...props} />,
  Star: (props: Omit<IconProps, 'name'>) => <Icon name="star" {...props} />,
  Trash: (props: Omit<IconProps, 'name'>) => <Icon name="trash" {...props} />,
  Unlink: (props: Omit<IconProps, 'name'>) => <Icon name="unlink" {...props} />,
  VisibilityOff: (props: Omit<IconProps, 'name'>) => <Icon name="visibility_off" {...props} />,
  Visibility: (props: Omit<IconProps, 'name'>) => <Icon name="visibility" {...props} />,
  Yen: (props: Omit<IconProps, 'name'>) => <Icon name="yen" {...props} />,
}
