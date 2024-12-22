/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    const isMain = process.env.GITHUB_REF_NAME === 'main'

    return {
      name: 'conermurphy',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      protect: ['production'].includes(input?.stage),
      home: 'aws',
      providers: {
        aws: {
          profile: 'conermurphy',
        },
        ...(isMain && {
          cloudflare: '5.43.1',
        }),
      },
    }
  },
  async run() {
    const domainName = 'conermurphy.com'
    const isMain = process.env.GITHUB_REF_NAME === 'main'

    const vpc = new sst.aws.Vpc('PersonalWebsiteVpc')
    const cluster = new sst.aws.Cluster('PersonalWebsiteCluster', { vpc })

    cluster.addService('PersonalWebsiteService', {
      ...(isMain
        ? {
            loadBalancer: {
              ports: [{ listen: '443/https', forward: '4321/http' }],
              domain: {
                dns: sst.cloudflare.dns(),
                name: domainName,
              },
            },
          }
        : {
            loadBalancer: {
              ports: [{ listen: '80/http', forward: '4321/http' }],
            },
          }),
      dev: {
        command: 'npm run dev',
      },
    })
  },
})
