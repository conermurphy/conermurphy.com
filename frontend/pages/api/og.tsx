import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import { server } from '../../config';
import 'isomorphic-fetch';

export const config = {
  runtime: 'edge',
};

const railwayFont = fetch(
  new URL(`../../assets/raleway.ttf`, import.meta.url)
).then((res) => res.arrayBuffer());

const karlaFont = fetch(
  new URL(`../../assets/karla.ttf`, import.meta.url)
).then((res) => res.arrayBuffer());

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const hasTitle = searchParams.has('title');
  const hasDate = searchParams.has('date');
  const hasDescription = searchParams.has('description');
  const hasTtr = searchParams.has('ttr');

  const title = hasTitle ? searchParams.get('title') : 'Coner Murphy';
  const description = hasDescription
    ? searchParams.get('description')
    : 'My default description';
  const ttr = hasTtr ? searchParams.get('ttr') : '';
  const date = hasDate
    ? new Date(searchParams.get('date') || '').toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : '';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: '10px solid #E6806B',
          background: '#E6806B',
        }}
      >
        <div tw="bg-[#FFFDF5] flex h-full flex-col w-full justify-between rounded-md overflow-hidden">
          <div tw="flex flex-col justify-between h-full p-12">
            <img
              src={`${server}/me.jpg`}
              alt="Self portrait of Coner Murphy"
              height={100}
              tw="rounded-xl overflow-hidden"
            />
            <div tw="flex flex-col items-start justify-between">
              <h2
                tw="flex flex-col text-3xl sm:text-5xl text-[#25282A] text-left"
                style={{ fontFamily: '"Karla"' }}
              >
                {title}
              </h2>
              <p tw="text-xl" style={{ fontFamily: '"Raleway"' }}>
                {description}
              </p>
            </div>
            <div tw="flex flex-row justify-between items-end">
              <p style={{ fontFamily: '"Raleway"' }} tw="text-lg">
                https://conermurphy.com {hasDate ? `| ${date}` : ''}{' '}
                {hasTtr ? `| ${ttr || ''} min read` : ''}
              </p>
              <img
                src={`${server}/logo.svg`}
                alt="conermurphy.com logo"
                height={100}
                tw="self-end"
              />
            </div>
          </div>
          <div tw="absolute flex w-full h-full opacity-50">
            <img src={`${server}/grain.png`} alt="" />
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      debug: false,
      fonts: [
        {
          name: 'Karla',
          data: await karlaFont,
          style: 'normal',
        },
        {
          name: 'Raleway',
          data: await railwayFont,
          style: 'normal',
        },
      ],
    }
  );
}
