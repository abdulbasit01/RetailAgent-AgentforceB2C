/*
 * Copyright (c) 2025, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 */

import React from 'react'
import PropTypes from 'prop-types'
import {FormattedMessage, FormattedNumber} from 'react-intl'

import {
    Box,
    Flex,
    Stack,
    Text,
    Heading,
    Divider,
    Accordion,
    AccordionIcon,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    Badge,
    Button
} from '@salesforce/retail-react-app/app/components/shared/ui'

import {PromoCode, usePromoCode} from '@salesforce/retail-react-app/app/components/promo-code'
import ItemVariantProvider from '@salesforce/retail-react-app/app/components/item-variant'
import CartItemVariantImage from '@salesforce/retail-react-app/app/components/item-variant/item-image'
import CartItemVariantName from '@salesforce/retail-react-app/app/components/item-variant/item-name'
import CartItemVariantAttributes from '@salesforce/retail-react-app/app/components/item-variant/item-attributes'
import CartItemVariantPrice from '@salesforce/retail-react-app/app/components/item-variant/item-price'
import PromoPopover from '@salesforce/retail-react-app/app/components/promo-popover'
import {useProducts} from '@salesforce/commerce-sdk-react'
import {BasketIcon, LocationIcon, LockIcon} from '@salesforce/retail-react-app/app/components/icons'

/* ---------------- CART ITEMS ---------------- */

const CartItems = ({basket}) => {
    const totalItems =
        basket?.productItems?.reduce((acc, item) => acc + item.quantity, 0) || 0

    const productIds =
        basket?.productItems?.map(({productId}) => productId).join(',') ?? ''

    const {data: products} = useProducts(
        {
            parameters: {
                ids: productIds,
                allImages: true
            }
        },
        {
            enabled: Boolean(productIds),
            select: (result) => {
                return result?.data?.reduce((acc, item) => {
                    acc[item.id] = item
                    return acc
                }, {})
            }
        }
    )

    return (
        <Accordion allowToggle width="100%">
            <AccordionItem border="none">
                <AccordionButton
                    px={0}
                    py={3}
                    borderRadius="full"
                    _hover={{bg: '#F5F5F5'}}
                >
                    <BasketIcon />
                    <Box px={2} fontWeight="700" fontSize="sm">
                        <FormattedMessage
                            defaultMessage="{itemCount} items in bag"
                            values={{itemCount: totalItems}}
                        />
                    </Box>
                    <AccordionIcon />
                </AccordionButton>

                <AccordionPanel px={0} py={4}>
                    <Stack spacing={5} divider={<Divider borderColor="#F0F0F0" />}>
                        {basket.productItems?.map((product, idx) => {
                            const variant = {
                                ...product,
                                ...(products && products[product.productId]),
                                price: product.price
                            }

                            return (
                                <ItemVariantProvider
                                    key={`${product.productId}-${product.itemId}`}
                                    index={idx}
                                    variant={variant}
                                >
                                    <Flex gap={3}>
                                        <CartItemVariantImage width="70px" />

                                        <Stack spacing={1} flex={1}>
                                            <Text fontSize="sm" fontWeight="600" color="#111">
                                                <CartItemVariantName />
                                            </Text>

                                            <CartItemVariantAttributes includeQuantity />

                                            <CartItemVariantPrice
                                                currency={basket?.currency}
                                                fontSize="sm"
                                            />
                                        </Stack>
                                    </Flex>
                                </ItemVariantProvider>
                            )
                        })}
                    </Stack>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    )
}

/* ---------------- ORDER SUMMARY ---------------- */

const OrderSummaryEnhanced = ({
    basket,
    showPromoCodeForm = false,
    showCartItems = false,
    isEstimate = false
}) => {
    const {removePromoCode, ...promoCodeProps} = usePromoCode()

    if (!basket?.basketId && !basket?.orderNo) return null

    const shippingItem = basket.shippingItems?.[0]
    const hasShippingPromos = shippingItem?.priceAdjustments?.length > 0

    return (
        <Box
            bg="#fff"
            border="1px solid"
            borderColor="#eee"
            borderRadius="2xl"
            boxShadow="0 10px 30px rgba(0,0,0,0.06)"
            overflow="hidden"
            position="sticky"
            top="90px"
        >
            {/* HEADER */}
            <Box px={6} py={5} bg="#111">
                <Heading fontSize="md" color="white" fontWeight="800" mb='0'>
                    Order Summary
                </Heading>
            </Box>

            <Stack p={6} spacing={5}>
                {/* ITEMS */}
                <Flex justify="space-between" align="center">
                    <Text fontWeight="700" fontSize="sm" color="#111">
                        Items
                    </Text>
                    <Badge bg="#F5F5F5" color="#111" borderRadius="full" px={3}>
                        {basket?.productItems?.length || 0}
                    </Badge>
                </Flex>

                <Divider borderColor="#F0F0F0" />

                {showCartItems && <CartItems basket={basket} />}

                {/* PRICING */}
                <Stack spacing={3}>
                    <Flex justify="space-between">
                        <Text fontSize="sm" color="#666">Subtotal</Text>
                        <Text fontWeight="600">
                            <FormattedNumber
                                style="currency"
                                currency={basket?.currency}
                                value={basket?.productSubTotal}
                            />
                        </Text>
                    </Flex>

                    {basket.orderPriceAdjustments?.map((adj) => (
                        <Flex key={adj.priceAdjustmentId} justify="space-between">
                            <Text fontSize="sm" color="#666">{adj.itemText}</Text>
                            <Text fontSize="sm" color="green.600" fontWeight="600">
                                <FormattedNumber
                                    style="currency"
                                    currency={basket?.currency}
                                    value={adj.price}
                                />
                            </Text>
                        </Flex>
                    ))}

                    <Flex justify="space-between">
                        <Flex align="center" gap={1}>
                            <LocationIcon boxSize={4} color="#999" />
                            <Text fontSize="sm" color="#666">Shipping</Text>
                        </Flex>

                        {basket.shippingTotal === 0 ? (
                            <Badge bg="#111" color="white" borderRadius="full">
                                FREE
                            </Badge>
                        ) : (
                            <Text fontWeight="600">
                                <FormattedNumber
                                    value={basket.shippingTotal}
                                    style="currency"
                                    currency={basket.currency}
                                />
                            </Text>
                        )}
                    </Flex>

                    <Flex justify="space-between">
                        <Text fontSize="sm" color="#666">Tax</Text>
                        <Text fontWeight="600">
                            {basket.taxTotal != null ? (
                                <FormattedNumber
                                    value={basket.taxTotal}
                                    style="currency"
                                    currency={basket.currency}
                                />
                            ) : (
                                'TBD'
                            )}
                        </Text>
                    </Flex>
                </Stack>

                {/* PROMO CODE (RESTORED + NIKE STYLE) */}
                {showPromoCodeForm && (
                    <Box
                        p={4}
                        border="1px solid"
                        borderColor="#eee"
                        borderRadius="xl"
                        bg="#fafafa"
                    >
                        <PromoCode {...promoCodeProps} />
                    </Box>
                )}

                {/* TOTAL */}
                <Flex
                    justify="space-between"
                    align="center"
                    bg="#F7F7F7"
                    p={4}
                    borderRadius="xl"
                >
                    <Text fontWeight="800">
                        {isEstimate ? 'Estimated Total' : 'Total'}
                    </Text>

                    <Text fontSize="xl" fontWeight="900" color="#111">
                        <FormattedNumber
                            style="currency"
                            currency={basket?.currency}
                            value={basket?.orderTotal || basket?.productTotal}
                        />
                    </Text>
                </Flex>


                {/* SECURITY */}
                <Flex
                    align="center"
                    gap={2}
                    bg="#F5F5F5"
                    p={3}
                    borderRadius="full"
                >
                    <LockIcon boxSize={4} color="#111" />
                    <Text fontSize="xs" color="#666">
                        Secure checkout
                    </Text>
                </Flex>
            </Stack>
        </Box>
    )
}

OrderSummaryEnhanced.propTypes = {
    basket: PropTypes.object,
    showPromoCodeForm: PropTypes.bool,
    showCartItems: PropTypes.bool,
    isEstimate: PropTypes.bool
}

export default OrderSummaryEnhanced