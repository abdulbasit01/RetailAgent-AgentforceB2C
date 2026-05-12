/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick'
import {
    AspectRatio,
    Box,
    Heading,
    IconButton,
    Stack
} from '@salesforce/retail-react-app/app/components/shared/ui'
import {ChevronLeftIcon, ChevronRightIcon} from '@salesforce/retail-react-app/app/components/icons'
import {Component, regionPropType} from '@salesforce/commerce-sdk-react/components'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

/**
 * Display child components in a carousel using Slick Slider.
 * Configurations include the number of children to display in view and controls/indicators.
 */
export const Carousel = (props = {}) => {
    const {
        textHeadline,
        xsCarouselIndicators = true,
        smCarouselIndicators = true,
        mdCarouselIndicators = true,
        xsCarouselControls = true,
        smCarouselControls = true,
        xsCarouselSlidesToDisplay = 1,
        smCarouselSlidesToDisplay = 2,
        mdCarouselSlidesToDisplay = 4,
        regions
    } = props

    const components = regions[0]?.components || []

    const PrevArrow = (props) => (
        <IconButton
            data-testid="carousel-nav-left"
            aria-label="Scroll carousel left"
            icon={<ChevronLeftIcon />}
            borderRadius="full"
            colorScheme="whiteAlpha"
            boxShadow="0 3px 10px rgb(0 0 0 / 20%) !important"
            size="lg"
            {...props}
        />
    )
    const NextArrow = (props) => (
        <IconButton
            data-testid="carousel-nav-right"
            aria-label="Scroll carousel right"
            icon={<ChevronRightIcon />}
            borderRadius="full"
            colorScheme="whiteAlpha"
            boxShadow="0 3px 10px rgb(0 0 0 / 20%) !important"
            size="lg"
            {...props}
        />
    )

    const prevArrow = <PrevArrow />
    const nextArrow = <NextArrow />

    const settings = {
        dots: true,
        infinite: components.length > 1,
        speed: 400,
        slidesToShow: mdCarouselSlidesToDisplay,
        slidesToScroll: 1,
        arrows: true,
        prevArrow,
        nextArrow,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: smCarouselSlidesToDisplay,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: xsCarouselSlidesToDisplay,
                    slidesToScroll: 1,
                    dots: xsCarouselIndicators,
                    arrows: xsCarouselControls
                }
            }
        ]
    }

    return (
        <Box
            className="carousel carousel--slick"
            position="relative"
            data-testid="carousel"
            sx={{
                '.slick-slider': { overflow: 'hidden' },
                '.slick-list': { margin: '0 -8px' },
                '.slick-slide > div': { padding: '0 8px', height: '100%' },
                '.slick-prev, .slick-next': {
                    zIndex: 2,
                    width: '40px',
                    height: '40px',
                    '&:before': { fontSize: '40px', opacity: 0.6 },
                    '&:hover:before': { opacity: 1 }
                },
                '.slick-prev': { left: '-8px' },
                '.slick-next': { right: '-8px' },
                '.slick-dots': { bottom: '-28px' },
                '.slick-dots li button:before': { fontSize: '10px', opacity: 0.4 },
                '.slick-dots li.slick-active button:before': { opacity: 1 }
            }}
        >
            <Stack className="carousel-container" data-testid="carousel-container" spacing={6}>
                {textHeadline && (
                    <Heading as="h2" fontSize="xl" textAlign="center">
                        {textHeadline}
                    </Heading>
                )}

                <Box data-testid="carousel-container-items">
                    <Slider {...settings}>
                        {components.map((component, index) => (
                            <Box key={component?.id || index} py={2}>
                                <Box
                                    bg="white"
                                    borderRadius="lg"
                                    overflow="hidden"
                                    border="1px solid"
                                    borderColor="neutral.200"
                                    _hover={{
                                        boxShadow: 'md',
                                        borderColor: 'neutral.300'
                                    }}
                                    transition="all 0.2s ease"
                                >
                                    <AspectRatio ratio={3 / 4}>
                                        <Component component={component} />
                                    </AspectRatio>
                                </Box>
                            </Box>
                        ))}
                    </Slider>
                </Box>
            </Stack>
        </Box>
    )
}

Carousel.propTypes = {
    regions: PropTypes.arrayOf(regionPropType).isRequired,
    textHeadline: PropTypes.string,
    xsCarouselIndicators: PropTypes.bool,
    smCarouselIndicators: PropTypes.bool,
    mdCarouselIndicators: PropTypes.bool,
    xsCarouselControls: PropTypes.bool,
    smCarouselControls: PropTypes.bool,
    xsCarouselSlidesToDisplay: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
    smCarouselSlidesToDisplay: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
    mdCarouselSlidesToDisplay: PropTypes.oneOf([1, 2, 3, 4, 5, 6])
}

Carousel.displayName = 'Carousel'

export default Carousel
