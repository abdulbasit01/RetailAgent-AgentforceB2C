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

    const progressPercentage = Math.min(
        (cartValue / freeShippingThreshold) * 100,
        100
    )

    const amountUntilFreeShipping = Math.max(
        freeShippingThreshold - cartValue,
        0
    )

    return (
        <Box mb={[8, 10]}>
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
                    <Text
                        fontSize="xs"
                        fontWeight="700"
                        textTransform="uppercase"
                        letterSpacing="0.08em"
                        color="#757575"
                        mb={2}
                    >
                        <FormattedMessage
                            defaultMessage="Your Bag"
                            id="cart_header.label.bag"
                        />
                    </Text>

                    <Heading
                        as="h1"
                        fontSize={{base: '3xl', md: '5xl'}}
                        fontWeight="900"
                        lineHeight={0.95}
                        letterSpacing="-0.04em"
                        color="#111111"
                    >
                        <FormattedMessage
                            defaultMessage="Shopping Cart"
                            id="cart_header.title.shopping_cart"
                        />
                    </Heading>

                    <Text
                        mt={3}
                        fontSize="sm"
                        color="#757575"
                        fontWeight="500"
                    >
                        <FormattedMessage
                            defaultMessage="{itemCount, plural, =0 {No items} one {# item} other {# items}} in your cart"
                            values={{itemCount: totalItems}}
                            id="cart_header.subtitle.items_in_cart"
                        />
                    </Text>
                </Box>

                {/* RIGHT BADGES */}
                <Flex
                    gap={3}
                    wrap="wrap"
                    display={{base: 'none', md: 'flex'}}
                >
                    <Badge
                        px={4}
                        py={2}
                        borderRadius="9999px"
                        bg="#F5F5F5"
                        color="#111111"
                        fontSize="xs"
                        fontWeight="700"
                        textTransform="uppercase"
                        letterSpacing="0.04em"
                    >
                        <Flex align="center" gap={2}>
                            <CheckCircleIcon boxSize={3} />
                            <FormattedMessage
                                defaultMessage="Secure Checkout"
                                id="cart_header.badge.secure"
                            />
                        </Flex>
                    </Badge>

                    <Badge
                        px={4}
                        py={2}
                        borderRadius="9999px"
                        bg="#F5F5F5"
                        color="#111111"
                        fontSize="xs"
                        fontWeight="700"
                        textTransform="uppercase"
                        letterSpacing="0.04em"
                    >
                        <FormattedMessage
                            defaultMessage="Free Shipping Over $100"
                            id="cart_header.badge.free_shipping"
                        />
                    </Badge>
                </Flex>
            </Flex>

            {/* SHIPPING PROGRESS */}
            <Box
                bg="#F7F7F7"
                borderRadius="2xl"
                px={[5, 6]}
                py={[5, 6]}
            >
                <Flex
                    justify="space-between"
                    align={{base: 'flex-start', md: 'center'}}
                    direction={{base: 'column', md: 'row'}}
                    gap={3}
                    mb={4}
                >
                    <Box>
                        <Text
                            fontSize="xs"
                            fontWeight="700"
                            textTransform="uppercase"
                            letterSpacing="0.08em"
                            color="#757575"
                            mb={1}
                        >
                            <FormattedMessage
                                defaultMessage="Free Shipping Progress"
                                id="cart_header.progress.label"
                            />
                        </Text>

                        <Text
                            fontSize={{base: 'sm', md: 'base'}}
                            fontWeight="700"
                            color="#111111"
                            lineHeight={1.3}
                        >
                            {amountUntilFreeShipping === 0 ? (
                                <FormattedMessage
                                    defaultMessage="You unlocked free shipping."
                                    id="cart_header.progress.free_shipping_unlocked"
                                />
                            ) : (
                                <FormattedMessage
                                    defaultMessage="{amount} away from free shipping"
                                    values={{
                                        amount: `$${amountUntilFreeShipping.toFixed(2)}`
                                    }}
                                    id="cart_header.progress.amount_away"
                                />
                            )}
                        </Text>
                    </Box>

                    <Text
                        fontSize="sm"
                        fontWeight="800"
                        color="#111111"
                    >
                        {Math.round(progressPercentage)}%
                    </Text>
                </Flex>

                {/* PROGRESS BAR */}
                <Box
                    position="relative"
                    w="100%"
                    h="6px"
                    bg="#E5E5E5"
                    borderRadius="9999px"
                    overflow="hidden"
                >
                    <Box
                        position="absolute"
                        left={0}
                        top={0}
                        h="100%"
                        w={`${progressPercentage}%`}
                        bg="#111111"
                        borderRadius="9999px"
                        transition="width 0.35s ease"
                    />
                </Box>

                {/* THRESHOLD */}
                <Flex justify="space-between" mt={3}>
                    <Text
                        fontSize="xs"
                        fontWeight="600"
                        color="#9E9E9E"
                    >
                        $0
                    </Text>

                    <Text
                        fontSize="xs"
                        fontWeight="600"
                        color="#9E9E9E"
                    >
                        ${freeShippingThreshold}
                    </Text>
                </Flex>
            </Box>
        </Box>
    )
}

export default CartHeaderEnhanced