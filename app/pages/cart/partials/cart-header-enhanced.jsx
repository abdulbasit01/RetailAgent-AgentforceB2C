/*
 * Copyright (c) 2025, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 */

import React from 'react'
import {FormattedMessage} from 'react-intl'

import {
    Box,
    Flex,
    Heading,
    Text,
    Badge
} from '@salesforce/retail-react-app/app/components/shared/ui'

import {CheckCircleIcon} from '@chakra-ui/icons'

import {useCurrentBasket} from '@salesforce/retail-react-app/app/hooks/use-current-basket'

const CartHeaderEnhanced = () => {
    const {
        derivedData: {totalItems, totalPrice}
    } = useCurrentBasket()

    const cartValue = totalPrice || 0

    const freeShippingThreshold = 100

    const progressPercentage = Math.min((cartValue / freeShippingThreshold) * 100, 100)

    const amountUntilFreeShipping = Math.max(freeShippingThreshold - cartValue, 0)

    return (
        <Box mb={[4, 2]}>
            {/* HEADER */}
            <Flex
                direction={{base: 'column', md: 'row'}}
                justify="space-between"
                align={{base: 'flex-start', md: 'flex-end'}}
                gap={6}
                mb={8}
            >
                {/* LEFT */}
                <Box>
                    <Flex mb={2} gap={1} alignItems="center">
                        <Text
                            fontSize="xs"
                            fontWeight="700"
                            textTransform="uppercase"
                            letterSpacing="0.08em"
                            color="#757575"
                        >
                            <FormattedMessage
                                defaultMessage="Your Bag"
                                id="cart_header.label.bag"
                            />
                        </Text>
                        <Text as="span">|</Text>
                        <Text fontSize="sm" color="#FA5400" fontWeight="600" textTransform="uppercase">
                            <FormattedMessage
                                defaultMessage="{itemCount, plural, =0 {No items} one {# item} other {# items}} in your cart"
                                values={{itemCount: totalItems}}
                                id="cart_header.subtitle.items_in_cart"
                            />
                        </Text>
                    </Flex>
                    <Heading
                        as="h1"
                        fontSize={{base: '3xl', md: '5xl'}}
                        fontWeight="900"
                        lineHeight={0.95}
                        letterSpacing="-0.04em"
                        color="#111111"
                        mb="0"
                    >
                        <FormattedMessage
                            defaultMessage="Shopping Cart"
                            id="cart_header.title.shopping_cart"
                        />
                    </Heading>
                </Box>
            </Flex>
        </Box>
    )
}

export default CartHeaderEnhanced
