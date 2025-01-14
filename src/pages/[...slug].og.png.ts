import { readFileSync } from 'node:fs'
import { ImageResponse } from '@vercel/og'

export const prerender = false

export async function GET(request: Request) {
  const url = new URL(request.url)

  const urlToRender = `https://conermurphy.com${url.pathname.split('.og.png')[0]}`
  const title = url.searchParams.get('title')
  const description = url.searchParams.get('description')
  const dateParam = url.searchParams.get('date')
  const date = dateParam ? new Date(dateParam) : null

  const colours = {
    brand: '#fa337c',
    darkest: '#0a0d14',
    light: '#e2e3e4',
  }

  const html = {
    type: 'div',
    props: {
      tw: `flex w-full h-full text-[${colours.light}] border-[10px] bg-[${colours.brand}] border-[${colours.brand}]`,
      style: { fontFamily: 'Syne' },
      children: [
        {
          type: 'div',
          props: {
            tw: `flex flex-col items-start justify-start w-full h-full bg-[${colours.darkest}] p-24 h-full rounded-xl`,
            children: [
              {
                type: 'div',
                props: {
                  tw: 'flex grow w-full justify-between',
                  children: [
                    {
                      type: 'div',
                      props: {
                        tw: 'flex flex-col max-w-3xl',
                        children: [
                          {
                            type: 'h1',
                            props: {
                              tw: `flex text-4xl -mb-2 text-[${colours.brand}]`,
                              style: { fontFamily: 'Arvo' },
                              children: title,
                            },
                          },
                          {
                            type: 'p',
                            props: {
                              tw: `flex text-xl`,
                              children: description,
                            },
                          },
                        ],
                      },
                    },
                    // NOTE: Logo
                    {
                      type: 'svg',
                      props: {
                        width: '65',
                        height: '52',
                        viewBox: '0 0 65 52',
                        fill: 'none',
                        xmlns: 'http://www.w3.org/2000/svg',
                        children: [
                          {
                            type: 'path',
                            props: {
                              d: 'M27.7779 45.6708C26.7702 48.2908 28.7041 51.1068 31.5113 51.1068H42.5964C44.2515 51.1068 45.7356 50.0874 46.3298 48.5427L62.9093 5.43591C63.917 2.81591 61.983 0 59.1759 0H48.0908C46.4357 0 44.9515 1.01931 44.3574 2.56408L27.7779 45.6708Z',
                              fill: '#fa337c',
                            },
                          },
                          {
                            type: 'path',
                            props: {
                              d: 'M18.6702 2.56409C19.2644 1.01932 20.7485 0 22.4036 0H33.4887C36.2959 0 38.2298 2.81591 37.2221 5.43592L20.6426 48.5427C20.0485 50.0874 18.5643 51.1068 16.9092 51.1068H5.82412C3.017 51.1068 1.08304 48.2909 2.09073 45.6708L18.6702 2.56409Z',
                              fill: '#fa337c',
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                type: 'div',
                props: {
                  tw: 'flex flex-col w-full justify-between text-xl',
                  children: [
                    {
                      type: 'p',
                      props: {
                        tw: 'flex -mb-4',
                        children: date && date.toLocaleDateString('en-GB'),
                      },
                    },
                    {
                      type: 'p',
                      props: {
                        tw: 'flex text-[1rem]',
                        children: urlToRender,
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  }

  const arvoFontPath = `${process.cwd()}/public/fonts/Arvo-Bold.ttf`
  const syneFontPath = `${process.cwd()}/public/fonts/Syne-Regular.ttf`

  const arvoFont = readFileSync(arvoFontPath)
  const syneFont = readFileSync(syneFontPath)

  return new ImageResponse(html, {
    width: 1200,
    height: 630,
    status: 200,
    fonts: [
      {
        name: 'Arvo',
        style: 'normal',
        data: arvoFont,
      },
      {
        name: 'Syne',
        style: 'normal',
        data: syneFont,
      },
    ],
  })
}
