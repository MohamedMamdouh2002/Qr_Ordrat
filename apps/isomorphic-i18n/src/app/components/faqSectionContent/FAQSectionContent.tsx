'use client';
import Image from 'next/image'
import style from'../faqSection/FAQSection.module.css'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useTranslation } from "@/app/i18n/client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { useUserContext } from '../context/UserContext';

function FAQSectionContent({ lang }: { lang?: string }) {
  const { t } = useTranslation(lang!, "title");
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  // const [faqs, setFaqs] = useState<any[]>([]);
  const { faqs:faqscontext } = useUserContext(); 
  
  console.log("faqscontext: ",faqscontext);
  const faqs = faqscontext.length > 0 ? faqscontext[0].faQs : [];
  const toggleAccordion = (id: string) => {
      setOpenAccordion((prev) => (prev === id ? null : id));
  };

  // useEffect(() => {
  //     const fetchData = async () => {
  //       const faq = [
  //         {
  //           id: '1',
  //           question: 'How do you sign in to the website?',
  //           answer: 'To sign in, click on the "Sign In" button on the top-right corner, and enter your credentials.',
  //         },
  //         {
  //           id: '2',
  //           question: 'Is opening an account on the website free of charge?',
  //           answer: 'Yes, opening an account is completely free of charge.',
  //         },
  //         {
  //           id: '3',
  //           question: 'I did not receive the login code. What should I do?',
  //           answer: 'If you haven’t received the login code, please check your spam folder or request a new code.',
  //         },
  //         {
  //           id: '4',
  //           question: 'How can I reset my password?',
  //           answer: 'Click on the "Forgot Password" link on the login page and follow the instructions to reset your password.',
  //         },
  //         {
  //           id: '5',
  //           question: 'Can I change my email address after registration?',
  //           answer: 'Yes, you can change your email address from your account settings.',
  //         },
  //         {
  //           id: '6',
  //           question: 'How do I delete my account?',
  //           answer: 'To delete your account, go to your account settings and select "Delete Account". Follow the steps to confirm.',
  //         },
  //         {
  //           id: '7',
  //           question: 'How can I update my profile information?',
  //           answer: 'You can update your profile information from the "Edit Profile" section in your account settings.',
  //         },
  //         {
  //           id: '8',
  //           question: 'Are there any subscription fees on the website?',
  //           answer: 'No, the website does not charge any subscription fees for its basic services.',
  //         },
  //         {
  //           id: '9',
  //           question: 'What should I do if my account is locked?',
  //           answer: 'If your account is locked, please contact customer support for assistance in unlocking your account.',
  //         },
  //         {
  //           id: '10',
  //           question: 'How can I change my notification settings?',
  //           answer: 'Go to your account settings and navigate to "Notification Preferences" to customize your notifications.',
  //         },
  //       ];                
  //       if (faq) {
  //           setFaqs(faq);
  //       }
  //     };
  //     fetchData();
  // }, []);
  return (
    <section className="bg-white dark:bg-mainBg text-[#020710] min-h-screen font-montserrat">
      <div className={style.faqContainer}>
        <h3 className={style.faqTitle} style={{ textAlign: 'center' }}>
          Frequently Asked Questions <span className='text-mainColor' style={{ fontWeight: 'bold' }}>FAQ</span>
        </h3>
        <h3 className={style.faqTitle} style={{ textAlign: 'center' }}>
          {faqscontext[0].name}
        </h3>
        <div className="md:w-10/12 w-11/12 mb-10 gap-20 mx-auto">  
          <div className="col-span-6 pt-5">
            {faqs.map((faq, index) => (
              <div key={`${index}`} className="mb-8 relative rounded-xl shadow-lg border border-mainColor border-l-0">
                  <button
                      aria-expanded={openAccordion === `${index}`}
                      style={{ borderColor: index % 2 === 0 ? '#f97316' : '#5B5B5B' }}
                      onClick={() => toggleAccordion(`${index}`)}
                      className={`relative 4xl:h-32 bg-white dark:bg-secDark dark:text-white font-monbold flex justify-between items-center w-full ps-0 p-4 border h-auto md:h-min-[90px]
                          ${openAccordion === `${index}` ? 'rounded-b-none rounded-xl border-b-0 border-s-8 border-t-0 border-e-0' : 'border-b-0 border-s-8 border-t-0 border-e-0 rounded-xl'}`}
                  >
                      <span className="md:text-base 4xl:text-xl text-start text-base font-montserrat ps-5 dark:text-white">{faq.question}</span>
                      <FontAwesomeIcon className="4xl:text-2xl ps-2" icon={openAccordion === `${index}` ? faAngleUp : faAngleDown} />
                  </button>
                  <div
                      style={{ borderColor: index % 2 === 0 ? '#f97316' : '#5B5B5B' }} 
                      className={`top-0 end-0 grid overflow-hidden 4xl:text-2xl transition-all text-md text-[#747794] dark:bg-secDark
                          ${openAccordion === `${index}` ? 'rounded-t-0 ps-5 px-10 bg-white grid-rows-[1fr] opacity-100 rounded-b-xl pb-5 border-s-8 border-t-0 border-b-0 border-e-0' : 'grid-rows-[0fr] opacity-0'}`}
                  >
                      <p className="overflow-hidden">{faq.answer}</p>
                  </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

}

export default FAQSectionContent