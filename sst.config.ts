/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    const isCi = process.env.CI
    const isMain = process.env.GITHUB_REF_NAME === 'main'

    return {
      name: 'conermurphy',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      protect: ['production'].includes(input?.stage),
      home: 'aws',
      providers: {
        aws: {
          profile: isCi ? undefined : 'conermurphy',
        },
        ...(isMain && {
          cloudflare: '6.11.0',
        }),
      },
    }
  },
  async run() {
    const domainName = 'conermurphy.com'
    const isMain = process.env.GITHUB_REF_NAME === 'main'

    new sst.aws.Astro('PersonalWebsite', {
      server: { runtime: 'nodejs22.x' },
      ...(isMain && {
        domain: {
          dns: sst.cloudflare.dns(),
          name: domainName,
        },
      }),
    })
  },
})
