import * as React from 'react'
import { IconType } from '.'
import { withSize } from './shared'

const BasketballIcon: IconType = props => {
  return (
    <svg width="1em" height="1em" viewBox="0 0 1280 1278" {...props}>
      <path d="M610.5.6c-18 1.1-37.1 2.8-50.5 4.5C348.6 32.1 164.6 161.4 69.6 350 31.8 424.9 10.8 498.3 2.3 584.5c-2.4 25.1-2.4 84.6 0 110C8 753.8 20 806.8 39.5 859.4 49.1 885.3 64.3 920 66 920c1 0 22-9.9 22-10.3 0-.2-2.9-6.4-6.4-13.8-28.9-61-48.4-134.5-54.6-206.4-1.9-21.4-2.4-60.7-1.1-83.5l1.3-21.5 3.5-7c5.7-11.2 10.2-17.5 18.8-26 16.9-16.9 40-29.7 74-41 76.1-25.3 197.9-32.6 348.5-20.9 179.6 13.9 397.4 55.5 562.1 107.4 37.3 11.7 35.9 11.2 35.9 13.1 0 3.9-4.2 33-7.5 51.3-6.3 35.3-13.8 67.5-24.1 102.8-.4 1.4-1 1.6-2.3.8-7.6-4-27.3-9.7-44.1-12.7-14.9-2.6-58.6-2.6-78 0-63.7 8.6-128.2 28.3-255.5 78.2-19.2 7.6-46.5 18.2-60.5 23.7-132.5 51.9-199.9 74.3-275.5 91.8-61.9 14.3-123.6 20.8-172.2 18.1-12-.6-24.4-1.4-27.6-1.8l-5.7-.6-6.4-10.6c-3.6-5.8-9.8-17.1-14-25-4.1-7.9-7.7-14.5-7.9-14.8-.3-.2-5.4 2.1-11.5 5.1l-11 5.5 8 15.3c98 186.6 283.9 313 495.3 336.7 178.4 20 358-36.5 493.3-155.2 100.5-88.2 171.8-208.3 201.1-338.4 11.6-51.5 15.5-87.6 15.5-141.8 0-39.6-1.1-56.8-6-90.3-20.4-142.5-91.1-278.2-195.3-375C1010.9 110.9 937.7 66.7 850 35.6c-10.2-3.6-26.3-9.7-35.9-13.6-9.6-3.9-18-6.9-18.8-6.6-.7.3-1.3 1.3-1.3 2.2 0 1-.5 1.4-1.5 1-3.3-1.2-34.9-7.7-49.5-10.1-20.1-3.3-46.3-6.2-67.7-7.5-15.4-.9-51.7-1.1-64.8-.4zm64 25.4c53.7 3.5 102.9 12.6 152 28.1 12.5 4 18.7 6.6 28.5 12.1 56.3 31.6 104.4 77.6 139.9 133.7 30.8 48.5 53.5 106 66.7 168.6 1.9 8.7 6.4 34.5 6.4 36.2 0 1.6-21.7 1.8-36 .3-64.7-6.8-128.9-35.4-213-94.9-20.3-14.4-49.3-36.4-95.2-72.3-63.1-49.5-81.3-63.1-112.8-84.8-63.8-43.9-120.6-71.8-174-85.4-7.4-1.9-12.8-3.7-12-4 63.4-22.8 117.3-33.8 185.5-37.9 12.3-.8 50.4-.6 64 .3zm-269 57.5c22.9 4 56.7 14.1 80 24 46.5 19.7 95.8 49.8 158 96.4 17.3 13 25.2 19.1 85.5 66.2 50.3 39.3 83.2 63.4 113.1 82.7 64.6 41.6 119.9 64.7 173.9 72.6 14.1 2.1 43.3 3.9 49.7 3.2 6.2-.7 5.7-1.8 7.2 15.4 3.5 38.6 3.8 90.2 1 126.8-1.1 13.3-1.4 15.2-2.8 14.6-.9-.4-12.8-4.2-26.6-8.6-169.6-53.6-389.3-95.6-575-109.7-52.6-4-68.2-4.6-129-4.6-63.1.1-79.6.8-121 5.6-84 9.6-148 31.9-181.2 63.3-2.4 2.2-4.3 3.8-4.3 3.5 0-.3 1.2-6.4 2.6-13.5 16.1-81.5 48.9-159.9 95.2-227.9 45-66 102.2-122.5 168.2-166 21-13.8 36.6-22.9 61.5-35.7l21-10.9 7 .5c3.9.3 11.1 1.2 16 2.1zM972 122.3c156.7 99.6 261.7 270.3 279.9 455.2 2.8 28.3 4 72 2.5 88.7l-.7 6.6-7.5-6c-26.7-21.2-70.7-43.4-128.2-64.7-10.7-4-20.4-7.6-21.5-8.1-2-.8-2.1-.9-.7-16.1 2.3-24 2.2-107.2-.1-129.7-2.4-23.9-2.7-21.8 3.6-22.6 17.3-2.3 44.8-9.5 65.1-17.1 9.5-3.5 35.4-15 36.5-16.1.3-.2-1.7-4.9-4.3-10.3l-4.9-9.8-10.1 4.7c-28.7 13.5-66.7 25.1-85.6 26.2l-5.4.3-1.3-8c-18.1-111.4-61.9-205.6-127.4-274-14-14.6-14.2-14.6 10.1.8zM1118.5 626c30.5 11.6 70.5 30.2 90 41.8 19.1 11.4 34.7 24.5 40.2 34l2.6 4.3-1.7 13.2c-10.3 78.5-38.1 160-78 228-8.7 14.8-18.5 30.6-18.6 29.7 0-.3-1.1-7.9-2.4-17-9.9-66.6-28.5-116-56.7-150.6-7.3-8.9-22.6-23.4-30.2-28.6-4.1-2.8-5.6-4.4-5.3-5.6 13.1-43 25.6-99.8 31.1-141.7.9-6.1 1.8-12.4 2-14.2l.6-3.2 7.7 2.8c4.2 1.6 12.7 4.8 18.7 7.1zM991 774.8c15.7 2.8 40 10.8 40 13.1 0 .8-9.2 27.2-13.7 39.1-10.8 29-22.5 56-36.9 85-50.8 102.6-116.7 186.4-194 246.6-58.2 45.3-126.2 76-192.9 87.1-8.8 1.4-16.1 2.9-16.3 3.3-.5 1.4-38.8-4.1-60.7-8.6-142-29.7-267.2-106.2-356.7-217.9-10.4-13-26.8-35.3-26.8-36.4 0-.3 5.1-.3 11.3.2 13.2 1 57.9.2 75.7-1.3 70.9-6.1 148.6-24.3 243.5-56.8 44.2-15.2 80.7-28.9 168-63.2 89-34.9 121.5-47 163.5-60.8 54.3-17.8 96-27.5 135-31.2 15-1.4 48.7-.4 61 1.8zm71.2 33.5c8 7.1 18.6 19.7 25.8 30.7 5.6 8.8 17.1 32.3 21.5 44.3 10.2 27.8 18 65 22.1 105.7l1.8 16.8-7 8.8c-57.4 73.7-128.2 131.8-211.2 173.3-61.6 30.8-128.6 51.3-196.3 60-18.2 2.3-59.9 5.6-59.9 4.7 0-.2 2.8-1.3 6.3-2.4 10.6-3.4 31.5-12 47.2-19.6 105.4-50.7 199.3-146.3 270.8-275.7 23-41.6 47.1-96 62.8-141.8 2.2-6.4 4.2-12.2 4.4-13 .6-1.6 0-2 11.7 8.2z" />
    </svg>
  )
}

export default withSize(BasketballIcon)
