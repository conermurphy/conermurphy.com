import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { serialize } from 'next-mdx-remote/serialize'
import {
  BlogNewsletterParams,
  BlogNewsletterProps,
  POSTTYPES,
} from '../../types'
import { getPostPaths } from '../../utils/posts'

import { PostGridPage } from '../../components/Post/Pages'
import sourcePostPage from '../../utils/posts/sourcePostPage'

const postType = POSTTYPES.TECHNICAL_WRITING

// This controls which page to show based off the isPostGridPage prop
const TechnicalWriting: NextPage<BlogNewsletterProps> = ({
  isPostGridPage,
  ...params
}) => <PostGridPage {...params} postType={postType} />

export const getStaticPaths: GetStaticPaths<
  BlogNewsletterParams
> = async () => {
  const paths = await getPostPaths({ postType })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postsPerPage = parseInt(process.env.POSTS_PER_PAGE)
  const { props } = await sourcePostPage({
    postsPerPage,
    postType,
    slug: params?.slug,
  })

  const pageHeroData = {
    title: 'Technical Writing',
    body: 'Here are all of my commissioned blog posts. Want to work with me on a post for your company? Get in touch today.',
  }

  const metaDescription =
    'Here are all of my commissioned blog posts. Want to work with me on a post for your company? Get in touch today.'

  return {
    props: {
      ...props,
      pageHeroData,
      metaDescription,
    },
  }
}

export default TechnicalWriting
