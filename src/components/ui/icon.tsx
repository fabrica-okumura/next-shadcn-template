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
      src={`/icons/${name}.svg`}
      alt={alt || name}
      width={size}
      height={size}
      className={className}
    />
  )
}

// すべてのアイコンファイルのエイリアス
export const Icons = {
  Ai: (props: Omit<IconProps, 'name'>) => <Icon name="ai" {...props} />,
  Archivebox: (props: Omit<IconProps, 'name'>) => <Icon name="archivebox" {...props} />,
  ArrowBackLeft: (props: Omit<IconProps, 'name'>) => <Icon name="arrow-back-left" {...props} />,
  ArrowClose: (props: Omit<IconProps, 'name'>) => <Icon name="arrow-close" {...props} />,
  ArrowDown: (props: Omit<IconProps, 'name'>) => <Icon name="arrow-down" {...props} />,
  ArrowGoLeft: (props: Omit<IconProps, 'name'>) => <Icon name="arrow-go-left" {...props} />,
  ArrowGoRight: (props: Omit<IconProps, 'name'>) => <Icon name="arrow-go-right" {...props} />,
  ArrowGoup: (props: Omit<IconProps, 'name'>) => <Icon name="arrow-goup" {...props} />,
  ArrowLeftNeutral: (props: Omit<IconProps, 'name'>) => <Icon name="arrow-left-neutral" {...props} />,
  ArrowLeft: (props: Omit<IconProps, 'name'>) => <Icon name="arrow-left" {...props} />,
  ArrowOpen: (props: Omit<IconProps, 'name'>) => <Icon name="arrow-open" {...props} />,
  ArrowRight: (props: Omit<IconProps, 'name'>) => <Icon name="arrow-right" {...props} />,
  ArrowUp: (props: Omit<IconProps, 'name'>) => <Icon name="arrow-up" {...props} />,
  Back: (props: Omit<IconProps, 'name'>) => <Icon name="back" {...props} />,
  Bell: (props: Omit<IconProps, 'name'>) => <Icon name="bell" {...props} />,
  Blanc: (props: Omit<IconProps, 'name'>) => <Icon name="blanc" {...props} />,
  Calculator: (props: Omit<IconProps, 'name'>) => <Icon name="calculator" {...props} />,
  Calendar: (props: Omit<IconProps, 'name'>) => <Icon name="calendar" {...props} />,
  Car: (props: Omit<IconProps, 'name'>) => <Icon name="car" {...props} />,
  Chain: (props: Omit<IconProps, 'name'>) => <Icon name="chain" {...props} />,
  ChangeSearch: (props: Omit<IconProps, 'name'>) => <Icon name="change-search" {...props} />,
  Change: (props: Omit<IconProps, 'name'>) => <Icon name="change" {...props} />,
  Checkmark: (props: Omit<IconProps, 'name'>) => <Icon name="checkmark" {...props} />,
  CircleCross: (props: Omit<IconProps, 'name'>) => <Icon name="circle-cross" {...props} />,
  CircleMinus: (props: Omit<IconProps, 'name'>) => <Icon name="circle-minus" {...props} />,
  CirclePlus: (props: Omit<IconProps, 'name'>) => <Icon name="circle-plus" {...props} />,
  CircleSettle: (props: Omit<IconProps, 'name'>) => <Icon name="circle-settle" {...props} />,
  Clip: (props: Omit<IconProps, 'name'>) => <Icon name="clip" {...props} />,
  Clock: (props: Omit<IconProps, 'name'>) => <Icon name="clock" {...props} />,
  Copy: (props: Omit<IconProps, 'name'>) => <Icon name="copy" {...props} />,
  Cross: (props: Omit<IconProps, 'name'>) => <Icon name="cross" {...props} />,
  CustomerManagement: (props: Omit<IconProps, 'name'>) => <Icon name="customer-management" {...props} />,
  DotsHorizontal: (props: Omit<IconProps, 'name'>) => <Icon name="dots-horizontal" {...props} />,
  DotsVertical2line: (props: Omit<IconProps, 'name'>) => <Icon name="dots-vertical-2line" {...props} />,
  DotsVertical: (props: Omit<IconProps, 'name'>) => <Icon name="dots-vertical" {...props} />,
  Download: (props: Omit<IconProps, 'name'>) => <Icon name="download" {...props} />,
  Error: (props: Omit<IconProps, 'name'>) => <Icon name="error" {...props} />,
  EyeOff: (props: Omit<IconProps, 'name'>) => <Icon name="eye-off" {...props} />,
  Eye: (props: Omit<IconProps, 'name'>) => <Icon name="eye" {...props} />,
  Filter: (props: Omit<IconProps, 'name'>) => <Icon name="filter" {...props} />,
  FolderPlus: (props: Omit<IconProps, 'name'>) => <Icon name="folder-plus" {...props} />,
  Folder: (props: Omit<IconProps, 'name'>) => <Icon name="folder" {...props} />,
  Gantt: (props: Omit<IconProps, 'name'>) => <Icon name="gantt" {...props} />,
  Garage: (props: Omit<IconProps, 'name'>) => <Icon name="garage" {...props} />,
  Good: (props: Omit<IconProps, 'name'>) => <Icon name="good" {...props} />,
  Graph: (props: Omit<IconProps, 'name'>) => <Icon name="graph" {...props} />,
  History: (props: Omit<IconProps, 'name'>) => <Icon name="history" {...props} />,
  IconMail: (props: Omit<IconProps, 'name'>) => <Icon name="icon-mail" {...props} />,
  Info: (props: Omit<IconProps, 'name'>) => <Icon name="info" {...props} />,
  ListPlus: (props: Omit<IconProps, 'name'>) => <Icon name="list-plus" {...props} />,
  ListSettle: (props: Omit<IconProps, 'name'>) => <Icon name="list-settle" {...props} />,
  List: (props: Omit<IconProps, 'name'>) => <Icon name="list" {...props} />,
  Login: (props: Omit<IconProps, 'name'>) => <Icon name="login" {...props} />,
  Logout: (props: Omit<IconProps, 'name'>) => <Icon name="logout" {...props} />,
  Maximize: (props: Omit<IconProps, 'name'>) => <Icon name="maximize" {...props} />,
  Message: (props: Omit<IconProps, 'name'>) => <Icon name="message" {...props} />,
  Minimize: (props: Omit<IconProps, 'name'>) => <Icon name="minimize" {...props} />,
  Minus: (props: Omit<IconProps, 'name'>) => <Icon name="minus" {...props} />,
  Money: (props: Omit<IconProps, 'name'>) => <Icon name="money" {...props} />,
  MultipleDocuments: (props: Omit<IconProps, 'name'>) => <Icon name="multiple-documents" {...props} />,
  OptionPlus: (props: Omit<IconProps, 'name'>) => <Icon name="option-plus" {...props} />,
  Padlock: (props: Omit<IconProps, 'name'>) => <Icon name="padlock" {...props} />,
  Pencil: (props: Omit<IconProps, 'name'>) => <Icon name="pencil" {...props} />,
  Play: (props: Omit<IconProps, 'name'>) => <Icon name="play" {...props} />,
  Plus: (props: Omit<IconProps, 'name'>) => <Icon name="plus" {...props} />,
  Printe: (props: Omit<IconProps, 'name'>) => <Icon name="printe" {...props} />,
  Question: (props: Omit<IconProps, 'name'>) => <Icon name="question" {...props} />,
  Reload: (props: Omit<IconProps, 'name'>) => <Icon name="reload" {...props} />,
  Search: (props: Omit<IconProps, 'name'>) => <Icon name="search" {...props} />,
  SendOutline: (props: Omit<IconProps, 'name'>) => <Icon name="send-outline" {...props} />,
  Settings: (props: Omit<IconProps, 'name'>) => <Icon name="settings" {...props} />,
  Share: (props: Omit<IconProps, 'name'>) => <Icon name="share" {...props} />,
  Sorting: (props: Omit<IconProps, 'name'>) => <Icon name="sorting" {...props} />,
  Spanner: (props: Omit<IconProps, 'name'>) => <Icon name="spanner" {...props} />,
  StarOutline: (props: Omit<IconProps, 'name'>) => <Icon name="star-outline" {...props} />,
  Stop: (props: Omit<IconProps, 'name'>) => <Icon name="stop" {...props} />,
  Tips: (props: Omit<IconProps, 'name'>) => <Icon name="tips" {...props} />,
  Trashbox: (props: Omit<IconProps, 'name'>) => <Icon name="trashbox" {...props} />,
  UserPlus: (props: Omit<IconProps, 'name'>) => <Icon name="user-plus" {...props} />,
  Zoom: (props: Omit<IconProps, 'name'>) => <Icon name="zoom" {...props} />,
}
