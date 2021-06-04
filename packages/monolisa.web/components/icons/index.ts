// https://tylermcginnis.com/react-higher-order-components/
// https://react-svgr.com/playground/
import React from 'react'
import BoxIcon from './box.icon'
import CircleIcon from './circle.icon'
import CommitIcon from './commit.icon'
import ExternalLinkIcon from './externalLink.icon'
import FileIcon from './file.icon'
import FolderIcon from './folder.icon'
import GithubIcon from './github.icon'
import KeyIcon from './key.icon'
import LeftIcon from './left.icon'
import MergeIcon from './merge.icon'
import PullRequestIcon from './pullRequest.icon'
import ScrollIcon from './scroll.icon'
import ArrowIcon from './arrow.icon'
import MoonIcon from './moon.icon'
import SunIcon from './sun.icon'
import HashIcon from './hash.icon'
import DividerIcon from './divider.icon'
import AlertIcon from './alert.icon'
import GridIcon from './grid.icon'
import TerminalIcon from './terminal.icon'
import BikeIcon from './bike.icon'
import CheckIcon from './check.icon'
import FailIcon from './fail.icon'
import AddUserIcon from './addUser.icon'
import GearIcon from './gear.icon'
import BasketballIcon from './basketball.icon'
import UsersIcon from './users.icon'
import LockIcon from './lock.icon'
import UnlockIcon from './unlock.icon'
import UserIcon from './user.icon'
import BookIcon from './book.icon'
import InstallationIcon from './installation.icon'
import CodeIcon from './code.icon'
import OpenBookIcon from './openBook.icon'
import JavaScriptIcon from './javascript.icon'
import TypeScriptIcon from './typescript.icon'
import PieChartIcon from './pieChart.icon'
import AlignIcon from './align.icon'
import getIntegrationProviderIcon from './getIntegrationProviderIcon'
import LinkIcon from './link.icon'
import RightIcon from './right.icon'
import PlusIcon from './plus.icon'
import MailIcon from './mail.icon'

export {
  AddUserIcon,
  AlertIcon,
  AlignIcon,
  ArrowIcon,
  BasketballIcon,
  BikeIcon,
  BookIcon,
  BoxIcon,
  CheckIcon,
  CircleIcon,
  CodeIcon,
  CommitIcon,
  DividerIcon,
  ExternalLinkIcon,
  FailIcon,
  FileIcon,
  FolderIcon,
  GearIcon,
  GithubIcon,
  GridIcon,
  HashIcon,
  InstallationIcon,
  JavaScriptIcon,
  KeyIcon,
  LeftIcon,
  LinkIcon,
  LockIcon,
  MailIcon,
  MergeIcon,
  MoonIcon,
  OpenBookIcon,
  PieChartIcon,
  PlusIcon,
  RightIcon,
  PullRequestIcon,
  ScrollIcon,
  SunIcon,
  TerminalIcon,
  TypeScriptIcon,
  UnlockIcon,
  UserIcon,
  UsersIcon,
  getIntegrationProviderIcon,
}

export type IconDirectionType = 'up' | 'right' | 'down' | 'left'
export type IconAlignType = 'left' | 'right' | 'justify'

export type IconType = React.FunctionComponent<{
  width?: string | number
  height?: string | number
  size?: string | number
  filled?: boolean
  fill?: string
  color?: string
  direction?: IconDirectionType
  align?: IconAlignType
}>
