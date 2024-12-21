import type { GetStaticProps, NextPage } from 'next'
import { ContactForm, Newsletter, PageHero, SEO, Socials } from '../components'
import { LatestVideo, Post } from '../types'
import pageDataSource from '../utils/pageDataSource'
import LatestContent from '../components/LatestContent'
import ContactCard from '../components/ContactCard'

interface IProps {
  latestBlogs: Post[]
  latestYouTubeVideo: LatestVideo['items'][0]
}

const Contact: NextPage<IProps> = ({ latestBlogs, latestYouTubeVideo }) => (
  <>
    <SEO
      metaTitle="Contact Me"
      metaDescription="Got a question you want to ask? Or, want to team up on an upcoming project? Here's how to get in touch with me."
      metaImage={{
        title: 'Contact Me',
        description:
          "Got a question you want to ask? Or, want to team up on an upcoming project? Here's how to get in touch with me.",
      }}
      url="contact"
    />
    <div className="flex flex-col gap-12 md:gap-24">
      <PageHero
        title="Say Hi 👋"
        description="Got a question you want to ask? Or, a project you want to team up on? Here's how to get in touch with me."
        tag="Contact"
      />
      <div className="flex w-full flex-col items-center justify-center gap-12 md:gap-24">
        <section className="flex w-full max-w-7xl flex-col items-center justify-between gap-8 p-6 md:flex-row">
          <ContactCard
            tag="Email Me"
            title="hey@conermurphy.com"
            description="Want to send me an email? Click the link below and say hi!"
            link={
              <a
                href="mailto:hey@conermurphy.com"
                className="text-brand font-heading text-lg font-extrabold"
              >
                Send an email ✉️
              </a>
            }
          />
          <ContactCard
            tag="Socials"
            title={<Socials />}
            description="Email not your thing? Come say hi on social media!"
            link={
              <p className="text-brand font-heading text-lg font-extrabold">
                Follow Me ✅
              </p>
            }
          />
        </section>
        <div className="flex w-full justify-center p-6">
          <ContactForm />
        </div>
      </div>
    </div>
    <LatestContent latestBlogs={latestBlogs} latestVideo={latestYouTubeVideo} />
    <Newsletter />
  </>
)

export const getStaticProps: GetStaticProps = async () => {
  const { latestBlogs, latestYouTubeVideo } = await pageDataSource({
    latestBlogs: true,
    latestYouTubeVideo: true,
  })

  return {
    props: { latestBlogs, latestYouTubeVideo },
  }
}

export default Contact
