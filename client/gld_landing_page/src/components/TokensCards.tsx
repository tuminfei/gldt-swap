'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import LearnMoreModal from './LearnMoreModal'

interface Card {
  title: string
  subtitle: string
  tag: string
  description: string
  imageSrc?: string
  videoSrc?: string
  points: string[]
  cardKey: 'gldgov' | 'gld_nft' | 'gldt' | 'usdg'
}

const TokensCards = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCardKey, setSelectedCardKey] = useState<
    'gldgov' | 'gld_nft' | 'gldt' | 'usdg'
  >()

  const openModal = (cardKey: 'gldgov' | 'gld_nft' | 'gldt' | 'usdg') => {
    setSelectedCardKey(cardKey)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const { t } = useTranslation('cards')

  const cards: Card[] = t('cards', { returnObjects: true }) as Card[]

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isModalOpen])

  return (
    <>
      <section className='flex flex-col items-center justify-center gap-[24rem] md:gap-[14rem] px-[7px] md:w-[calc(100%-45px)] pt-[96px] 3xl:max-w-[90rem] mb-[96px] bg-[#FBF8F1]'>
        {cards &&
          cards.map((card, index) => (
            <div
              key={index}
              className='card shadow-lg bg-white rounded-[20px] flex flex-col md:flex-row items-center max-h-[700px] md:max-h-[612px] w-full'
            >
              {/* Text Section*/}
              <div className='flex flex-col md:w-1/2 p-8 md:py-16  md:px-8 xl:px-16 2xl:px-32'>
                <div className='bg-[#F7EED7] text-[#B89143] hidden md:inline rounded-full w-fit px-4 py-1 mb-4'>
                  {card.tag}
                </div>
                <div className='flex flex-row items-center mb-4 pt-8 md:pt-0 xl:pt-8'>
                  <div className='font-semibold text-3xl '>{card.title}</div>
                  <div className='bg-[#F7EED7] text-[#B89143] rounded-full w-fit px-4 py-1 md:hidden ml-6'>
                    {card.tag}
                  </div>
                </div>
                <p className='text-black/80 text-xl font-bold py-2'>
                  {card.subtitle}
                </p>
                <p className='text-base mb-4'>{card.description}</p>

                <button
                  onClick={() => openModal(card.cardKey)}
                  className='main-button w-fit mt-4'
                >
                  Learn More
                </button>
              </div>

              {/* Image / Video Section */}
              <div className='relative w-full md:w-1/2 h-[780px] md:h-[612px] '>
                {card.videoSrc && (
                  <div className=''>
                    <video
                      src={card.videoSrc}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className='rounded-b-[20px] md:rounded-r-[20px] md:rounded-b-none object-cover w-full h-full absolute'
                      controlsList='nodownload'
                    />
                  </div>
                )}

                {card.imageSrc && (
                  <div className=''>
                    <Image
                      src={card.imageSrc}
                      alt={card.title}
                      fill
                      className='rounded-b-[20px] md:rounded-r-[20px] md:rounded-b-none object-cover'
                      sizes='(max-width: 768px) 100vw, 50vw'
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
      </section>

      {isModalOpen && (
        <LearnMoreModal onClose={closeModal} cardKey={selectedCardKey ?? ''} />
      )}
    </>
  )
}

export default TokensCards
