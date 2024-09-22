import Image from 'next/image'
import style from'./FAQSection.module.css'
import registration from '../../../../public/assets/faq/faq/Registration.png';
import general from '../../../../public/assets/faq/faq/general.png';
import deposit from '../../../../public/assets/faq/faq/Security-deposit.png';
import property from '../../../../public/assets/faq/faq/Property.png';
import vehicles from '../../../../public/assets/faq/faq/Vehicles.png';
import number from '../../../../public/assets/faq/faq/number.png';
import etisalat from '../../../../public/assets/faq/faq/etisalat.png';
import tag from '../../../../public/assets/faq/faq/Tag.png';
import directSale from '../../../../public/assets/faq/faq/Direct-sale.png';
import arrow from '../../../../public/assets/faq/arrow.svg';
import arrowHover from '../../../../public/assets/faq/arrow-hover.svg';
import Findmore from '../../../../public/assets/faq/faq/Findmore.svg';
import FindmoreArrow from '../../../../public/assets/faq/faq/FindmoreArrow.svg';
import Link from 'next/link';
import { routes } from '@/config/routes';

function FAQSection({ lang }: { lang?: string }) {
  const faq = [
    {
      id:'1',
      imgSrc: registration,
      title: 'Authantication',
      faqCardBody: [
        {
          description: 'How do you sign in the website?'
        },
        {
          description: 'Is opening an account in website free of charge?'
        },
        {
          description: 'I did not receive login code. What should I do?'
        },
      ],
    },
    {
      id:'2',
      imgSrc: general,
      title: 'General Questions icon',
      faqCardBody: [
        {
          description: 'Where are the website offices located?'
        },
        {
          description: 'How is the book order?'
        },
        {
          description: 'Are there branches of orders outside the website?'
        },
      ],
    },
    {
      id:'3',
      imgSrc: deposit,
      title: 'Security deposit',
      faqCardBody: [
        {
          description: 'What is a security deposit?'
        },
        {
          description: 'How much is the security deposit?'
        },
        {
          description: 'What should I do after paying the Security Deposit to be able to take offers?'
        },
      ],
    },
    {
      id:'4',
      imgSrc: vehicles,
      title: 'Delivery',
      faqCardBody: [
        {
          description: 'How much is the price that the delivery take?'
        },
        {
          description: 'How can I contact with delivery?'
        },
      ],
    },
    {
      id:'5',
      imgSrc: etisalat,
      title: 'Premium Packages',
      faqCardBody: [
        {
          description: 'What is Etisalat Premium package?'
        },
        {
          description: 'What benefits will I enjoy by subscribing to Etisalat Premium package?'
        },
        {
          description: 'What types of Etisalat packages are offered by Emirates Auction?'
        },
      ],
    },
    {
      id:'6',
      imgSrc: tag,
      title: '#Tag',
      faqCardBody: [
        {
          description: 'What is Etisalat’s #Tag Service?'
        },
        {
          description: 'What are the charges on #Tag service?'
        },
        {
          description: 'How can I subscribe to the #Tag service?'
        },
      ],
    },
    {
      id:'7',
      imgSrc: directSale,
      title: 'Card History',
      faqCardBody: [
        {
          description: ' What is “Card history”?'
        },
        {
          description: 'What is the process to increase order in the card?'
        },
        {
          description: 'How I could write Notes?'
        },
      ],
    },
  ]; 
  return <>
    <div className={style.faqContainer}>
      <div className={style.faqWrapper}>
        <h3 className={style.faqTitle} style={{ textAlign: 'center' }}>
          Frequently Asked Questions <span className='text-mainColor' style={{ fontWeight: 'bold' }}>FAQ</span>
        </h3>
        <div className={style.faqCardsContainer}>
          {faq.map((item, index) => (
            <div key={index} className={`${style.faqCardWrapperContainer} group`}>
              <div className={style.faqCardWrapper}>
                <div className={style.faqCardHead} style={{ alignItems: 'center' }}>
                  <div className={style.iconWrapper} style={{ width: '50px', marginInlineEnd: '5px' }}>
                    <Image
                      src= {item.imgSrc}
                      width="50"
                      height="50"
                      alt={item.title}
                    />
                  </div>
                  <h4 className={style.faqCardTitle}>{item.title}</h4>
                </div>
                <div className={style.faqCardBody}>
                  {item.faqCardBody.map((question, descriptionIndex) => (
                    <p key={descriptionIndex} className={style.faqCardDescription}>{question.description}</p>
                  ))}
                </div>
              </div>
              <Link href={routes.faq.details(item.id)}>
                <button className={style.faqCardBtn}>
                  <p className='text-[#828e99] group-hover:text-mainColor'>View all questions</p>
                  <Image className={style.arrow} src={arrow} alt="arrow icon" />
                  <Image className={style.arrowHover} src={arrowHover} alt="hover arrow icon" />
                </button>
              </Link>
            </div>
          ))}
          {/* Repeat other FAQ sections here similarly */}
          <div className={`${style.FindMore} bg-mainColor`}>
            <div className={style.FindMoreTopContainer}>
              <div className={style.FindMoreTop}>
                <Image src={Findmore} alt="Find more icon" />
                <h2>Find more answers..</h2>
              </div>
              <div className={style.FindMoreCenter}>
                <p>You can also browse the topics below to find what you are looking for.</p>
              </div>
            </div>
            <div className={style.FindMoreFooter}>
              <Link href="/">
                <button className={style.findmoreArrowBtn}>
                  <p>View all FAQs</p>
                  <Image
                    className={style.FindmoreArrow}
                    src={FindmoreArrow}
                    alt="arrow icon"
                  />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
}

export default FAQSection