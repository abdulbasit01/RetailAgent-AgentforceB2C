/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React, {useState, useMemo, useEffect} from 'react'
import PropTypes from 'prop-types'
import {useLocation} from 'react-router-dom'

// Chakra Components
import {
    AspectRatio,
    Box,
    Img,
    Flex,

    // Hooks
    Skeleton as ChakraSkeleton,
    ListItem,
    List,
    useMultiStyleConfig
} from '@salesforce/retail-react-app/app/components/shared/ui'
import {findImageGroupBy} from '@salesforce/retail-react-app/app/utils/image-groups-utils'
import DynamicImage from '@salesforce/retail-react-app/app/components/dynamic-image'

const EnterKeyNumber = 13

const LARGE = 'large'
const SMALL = 'small'

/**
 * The skeleton representation of the image gallery component. Use this component while
 * you are waiting for product data to be returnd from the server.
 */
export const Skeleton = ({size}) => {
    const styles = useMultiStyleConfig('ImageGallery', {size})

    return (
        <Box data-testid="sf-image-gallery-skeleton">
            <Flex gap={4}>
                <Flex direction="column" gap={3}>
                    {new Array(4).fill(0).map((_, index) => (
                        <AspectRatio
                            ratio={1}
                            key={index}
                            w="72px"
                            borderRadius="md"
                            overflow="hidden"
                        >
                            <ChakraSkeleton />
                        </AspectRatio>
                    ))}
                </Flex>

                <AspectRatio ratio={1} flex="1">
                    <ChakraSkeleton borderRadius="2xl" />
                </AspectRatio>
            </Flex>
        </Box>
    )
}

Skeleton.propTypes = {
    size: PropTypes.bool
}

/**
 * The image gallery displays a hero image and thumbnails below it. You can control which
 * image groups that are use by passing in the current selected variation values.
 */
const ImageGallery = ({imageGroups = [], selectedVariationAttributes = {}, size, lazy = false}) => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const styles = useMultiStyleConfig('ImageGallery', {size})
    const location = useLocation()

    // Get the 'hero' image for the current variation.
    const heroImageGroup = useMemo(
        () =>
            findImageGroupBy(imageGroups, {
                viewType: LARGE,
                selectedVariationAttributes
            }),
        [selectedVariationAttributes]
    )

    useEffect(() => {
        // reset the selected index when location search changes
        setSelectedIndex(0)
    }, [location.search])

    // Get a memoized image group used for the thumbnails. We use the `useMemo` hook
    // so we don't have to waste time filtering the image groups each render if the
    // selected variation attributes haven't changed.
    const thumbnailImageGroup = useMemo(
        () =>
            findImageGroupBy(imageGroups, {
                viewType: SMALL,
                selectedVariationAttributes
            }),
        [selectedVariationAttributes]
    )

    const heroImage = heroImageGroup?.images?.[selectedIndex]
    const thumbnailImages = thumbnailImageGroup?.images || []
    const loadingStrategy = lazy ? 'lazy' : 'eager'

    const heroImageMaxWidth = styles.heroImage?.maxWidth?.[3]

    return (
        <Flex
            gap={{base: 4, lg: 6}}
            align="flex-start"
            direction={{base: 'column-reverse', lg: 'row'}}
        >
            {/* THUMBNAILS */}
            <List
                display="flex"
                flexDirection={{base: 'row', lg: 'column'}}
                gap={3}
                m={0}
                p={0}
            >
                {thumbnailImages.map((image, index) => {
                    const selected = index === selectedIndex
                    return (
                        <ListItem
                            key={index}
                            listStyleType="none"
                            borderRadius="lg"
                            overflow="hidden"
                            borderWidth="2px"
                            borderColor={selected ? 'black' : 'gray.200'}
                            transition="all 0.2s ease"
                            cursor="pointer"
                            _hover={{
                                borderColor: 'black',
                                transform: 'translateY(-2px)'
                            }}
                            bg="white"
                            w={{base: '72px', lg: '84px'}}
                        >
                            <AspectRatio ratio={1}>
                                <Box
                                    as="button"
                                    w="100%"
                                    h="100%"
                                    aria-pressed={selected ? 'true' : 'false'}
                                    onKeyDown={(e) => {
                                        if (e.keyCode === EnterKeyNumber) {
                                            setSelectedIndex(index)
                                        }
                                    }}
                                    onClick={() => setSelectedIndex(index)}
                                    data-testid="image-gallery-thumbnails"
                                >
                                    <Img
                                        alt={image.alt}
                                        src={image.disBaseLink || image.link}
                                        loading={loadingStrategy}
                                        objectFit="cover"
                                        w="100%"
                                        h="100%"
                                    />
                                </Box>
                            </AspectRatio>
                        </ListItem>
                    )
                })}
            </List>

            {/* HERO IMAGE */}
            {heroImage && (
                <Box
                    position="relative"
                    flex="1"
                    bg="#f7f7f7"
                    borderRadius="2xl"
                    overflow="hidden"
                    w="100%"
                >
                    <AspectRatio ratio={1}>
                        <DynamicImage
                            src={`${heroImage.disBaseLink || heroImage.link}[?sw={width}&q=70]`}
                            widths={{
                                base: '100vw',
                                lg: heroImageMaxWidth
                            }}
                            imageProps={{
                                alt: heroImage.alt,
                                loading: loadingStrategy,
                                style: {
                                    objectFit: 'cover',
                                    width: '100%',
                                    height: '100%'
                                }
                            }}
                        />
                    </AspectRatio>

                </Box>
            )}
        </Flex>
    )
}

ImageGallery.propTypes = {
    /**
     * The images array to be rendered
     */
    imageGroups: PropTypes.array,
    /**
     * The current selected variation values
     */
    selectedVariationAttributes: PropTypes.object,
    /**
     * Size of the Image gallery, this will be used to determined the max width from styles
     */
    size: PropTypes.string,
    /**
     * Determines whether the image will be lazy loaded or not
     */
    lazy: PropTypes.bool
}

export default ImageGallery
