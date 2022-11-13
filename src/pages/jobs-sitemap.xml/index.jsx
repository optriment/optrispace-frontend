import { getServerSideSitemap } from 'next-sitemap'

import getConfig from 'next/config'

export default function Sitemap() {}

export const getServerSideProps = async (ctx) => {
  const { publicRuntimeConfig } = getConfig()
  // process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'
  const data = await fetch(`${publicRuntimeConfig.api_url}/jobs`)

  const jobs = await data.json()
  const fields = []

  jobs.map((job) => {
    fields.push({
      loc: `${publicRuntimeConfig.domain}/jobs/${job.id}`,
      lastmod: job.created_at,
    })
  })

  return getServerSideSitemap(ctx, fields)
}
