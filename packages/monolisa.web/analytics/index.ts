// https://github.com/vercel/next.js/tree/9dd974dfca1efd0b451065056f95f92747e2dada/examples/with-google-analytics
export const GA_TRACKING_ID = 'UA-173738751-1'

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageView = (url: string) => {
  window['gtag']('config', GA_TRACKING_ID, {
    page_path: url,
  })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  window['gtag']('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}
