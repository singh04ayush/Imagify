import logo from './logo.svg'
import logo_icon from './logo_icon.svg'
import facebook_icon from './facebook_icon.svg'
import instagram_icon from './instagram_icon.svg'
import twitter_icon from './twitter_icon.svg'
import star_icon from './star_icon.svg'
import rating_star from './rating_star.svg'
import sample_img_1 from './sample_img_1.png'
import sample_img_2 from './sample_img_2.png'
import profile_img_1 from './profile_img_1.png'
import profile_img_2 from './profile_img_2.png'
import step_icon_1 from './step_icon_1.svg'
import step_icon_2 from './step_icon_2.svg'
import step_icon_3 from './step_icon_3.svg'
import email_icon from './email_icon.svg'
import lock_icon from './lock_icon.svg'
import cross_icon from './cross_icon.svg'
import star_group from './star_group.png'
import credit_star from './credit_star.svg'
import profile_icon from './profile_icon.png'
import github_icon from './github_icon.svg'
import linkedin_icon from './linkedin_icon.svg'

export const assets = {
    logo,
    logo_icon,
    facebook_icon,
    instagram_icon,
    twitter_icon,
    star_icon,
    rating_star,
    sample_img_1,
    sample_img_2,
    email_icon,
    lock_icon,
    cross_icon,
    star_group,
    credit_star,
    profile_icon,
    github_icon,
    linkedin_icon
}

export const stepsData = [
    {
      title: 'Describe Your Vision',
      description: 'Type a phrase, sentence, or paragraph that describes the image you want to create.',
      icon: step_icon_1,
    },
    {
      title: 'Watch the Magic',
      description: 'Our AI-powered engine will transform your text into a high-quality, unique image in seconds.',
      icon: step_icon_2,
    },
    {
      title: 'Download & Share',
      description: 'Instantly download your creation or share it with the world directly from our platform.',
      icon: step_icon_3,
    },
  ];

export const testimonialsData = [
    {
        image: profile_img_1,
        name: 'Sarah Chen',
        role: 'Digital Artist',
        stars: 5,
        text: "Imagify has revolutionized my creative process. The AI understands artistic nuances and produces stunning results that align perfectly with my vision. A game-changer for digital artists!"
    },
    {
        image: profile_img_2,
        name: 'Marcus Rodriguez',
        role: 'Marketing Director',
        stars: 5,
        text: "We use Imagify daily for our marketing campaigns. The speed and quality of generated images are exceptional, saving us countless hours on content creation. Highly recommended!"
    },
    {
        image: profile_img_1,
        name: 'Emily Parker',
        role: 'UI/UX Designer',
        stars: 5,
        text: "The versatility of Imagify is incredible. From mockups to concept art, it helps me visualize designs quickly. The intuitive interface makes it a joy to use in my design workflow."
    },
]

export const plans = [
    {
      id: 'Basic',
      price: 0,
      credits: 0,
      desc: 'Best for personal use.'
    },
    {
      id: 'Advanced',
      price: 0,
      credits: 0,
      desc: 'Best for business use.'
    },
    {
      id: 'Business',
      price: 0,
      credits: 0,
      desc: 'Best for enterprise use.'
    },
  ]