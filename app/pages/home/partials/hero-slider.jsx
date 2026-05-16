import React from 'react'
import PropTypes from 'prop-types'

import Slider from 'react-slick'

import {
    Box,
    Button,
    Container,
    HStack,
    VStack,
    Text,
    Heading,
    Link
} from '@salesforce/retail-react-app/app/components/shared/ui'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

/* ──────────────────────────────────────────────────────────
 * Slick styles
 * ────────────────────────────────────────────────────────── */
const heroSlickSx = {
    '.slick-slider, .slick-list, .slick-track': {
        height: '100%'
    },

    '.slick-slide > div': {
        height: '100%'
    },

    '.slick-slide': {
        transition: 'opacity 0.8s ease'
    },

    /* arrows */
    '.slick-prev, .slick-next': {
        width: '52px',
        height: '52px',

        display: 'flex !important',
        alignItems: 'center',
        justifyContent: 'center',

        background: 'rgba(255,255,255,0.12)',
        backdropFilter: 'blur(10px)',

        borderRadius: '9999px',
        border: '1px solid rgba(255,255,255,0.25)',

        zIndex: 5,

        top: '50%',
        transform: 'translateY(-50%)',

        transition: 'background 0.25s ease, border-color 0.25s ease, transform 0.25s ease',

        '&:before': {
            fontSize: '22px',
            color: 'white',
            opacity: 1
        },

        '&:hover': {
            background: 'rgba(255,255,255,0.24)',
            borderColor: 'rgba(255,255,255,0.6)',

            /* IMPORTANT */
            transform: 'translateY(-50%) scale(1.04)'
        }
    },

    '.slick-prev': {
        left: ['12px', null, '24px']
    },

    '.slick-next': {
        right: ['12px', null, '24px']
    },

    /* dots */
    '.slick-dots': {
        bottom: ['18px', null, '30px']
    },

    '.slick-dots li': {
        margin: '0 3px'
    },

    '.slick-dots li button:before': {
        color: 'white',
        opacity: 0.35,
        fontSize: '10px',
        transition: 'all 0.25s ease'
    },

    '.slick-dots li.slick-active button:before': {
        opacity: 1,
        color: 'white',
        transform: 'scale(1.2)'
    }
}

/* ──────────────────────────────────────────────────────────
 * Slider config
 * ────────────────────────────────────────────────────────── */
const sliderSettings = {
    dots: true,
    arrows: true,
    infinite: true,

    fade: true,
    cssEase: 'ease-in-out',

    speed: 900,

    slidesToShow: 1,
    slidesToScroll: 1,

    autoplay: true,
    autoplaySpeed: 5500,

    pauseOnHover: true,
    pauseOnFocus: false,

    adaptiveHeight: false
}

/* ──────────────────────────────────────────────────────────
 * Component
 * ────────────────────────────────────────────────────────── */
const HeroSlider = ({slides}) => {
    if (!slides?.length) return null

    return (
        <Box sx={heroSlickSx}>
            <Slider {...sliderSettings}>
                {slides.map((slide) => (
                    <Box key={slide.id}>
                        <Box
                            position="relative"
                            minH={['85vh', '90vh', '100vh']}
                            overflow="hidden"
                            bg={slide.bg}
                            display="flex"
                            alignItems="center"
                        >
                            {/* Background Image */}
                            <Box
                                position="absolute"
                                inset={0}
                                bgImage={`url(${slide.image})`}
                                bgSize="cover"
                                bgPosition="center"
                                transform="scale(1.02)"
                                opacity={0.58}
                            />

                            {/* Overlay */}
                            <Box
                                position="absolute"
                                inset={0}
                                bgGradient="
                                    linear(
                                        to-r,
                                        rgba(0,0,0,0.82) 0%,
                                        rgba(0,0,0,0.42) 50%,
                                        rgba(0,0,0,0.12) 100%
                                    )
                                "
                            />

                            {/* Content */}
                            <Container
                                maxW="container.xl"
                                position="relative"
                                zIndex={2}
                                px={[6, 10, 16]}
                            >
                                <VStack align="flex-start" spacing={[4, 5, 6]} maxW="560px">
                                    <Text
                                        fontSize={['xs', 'sm']}
                                        fontWeight={700}
                                        color="rgba(255,255,255,0.72)"
                                        textTransform="uppercase"
                                        letterSpacing="0.22em"
                                    >
                                        {slide.eyebrow}
                                    </Text>

                                    <Heading
                                        as="h1"
                                        fontSize={['4xl', '5xl', '6xl', '7xl', '8xl']}
                                        fontWeight={900}
                                        color="white"
                                        lineHeight={0.88}
                                        letterSpacing="-0.05em"
                                        textTransform="uppercase"
                                    >
                                        <Box as="span" color="#FF6A00" display="block">
                                            {slide.headline.primary}
                                        </Box>

                                        <Box as="span" display="block">
                                            {slide.headline.rest}
                                        </Box>
                                    </Heading>

                                    <Text
                                        fontSize={['sm', 'md', 'lg']}
                                        color="rgba(255,255,255,0.78)"
                                        lineHeight={1.8}
                                        maxW="420px"
                                    >
                                        {slide.sub}
                                    </Text>

                                    <HStack spacing={3} pt={2} flexWrap="wrap">
                                        <Button
                                            as={Link}
                                            href={slide.ctaPrimary.href}
                                            size="lg"
                                            bg="white"
                                            color="#111"
                                            borderRadius="full"
                                            px={8}
                                            h="56px"
                                            fontWeight={800}
                                            textTransform="uppercase"
                                            letterSpacing="0.05em"
                                            _hover={{
                                                bg: '#F2F2F2',
                                                transform: 'translateY(-1px)',
                                                textDecoration: 'none'
                                            }}
                                        >
                                            {slide.ctaPrimary.label}
                                        </Button>

                                        {slide.ctaSecondary && (
                                            <Button
                                                as={Link}
                                                href={slide.ctaSecondary.href}
                                                size="lg"
                                                variant="outline"
                                                borderWidth="1.5px"
                                                borderColor="rgba(255,255,255,0.5)"
                                                color="white"
                                                borderRadius="full"
                                                px={8}
                                                h="56px"
                                                fontWeight={800}
                                                textTransform="uppercase"
                                                letterSpacing="0.05em"
                                                bg="rgba(255,255,255,0.06)"
                                                backdropFilter="blur(6px)"
                                                _hover={{
                                                    bg: 'rgba(255,255,255,0.14)',
                                                    borderColor: 'white',
                                                    textDecoration: 'none'
                                                }}
                                            >
                                                {slide.ctaSecondary.label}
                                            </Button>
                                        )}
                                    </HStack>
                                </VStack>
                            </Container>
                        </Box>
                    </Box>
                ))}
            </Slider>
        </Box>
    )
}

HeroSlider.propTypes = {
    slides: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            bg: PropTypes.string,
            image: PropTypes.string.isRequired,
            eyebrow: PropTypes.string,
            headline: PropTypes.string,
            sub: PropTypes.string,
            ctaPrimary: PropTypes.shape({
                label: PropTypes.string,
                href: PropTypes.string
            }),
            ctaSecondary: PropTypes.shape({
                label: PropTypes.string,
                href: PropTypes.string
            })
        })
    ).isRequired
}

export default HeroSlider
