/*
 * Copyright (c) 2025, Salesforce, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */

import React from 'react'
import PropTypes from 'prop-types'

import {
    Box,
    Stack,
    Grid,
    GridItem,
    Container
} from '@salesforce/retail-react-app/app/components/shared/ui'

import CartHeaderEnhanced from '@salesforce/retail-react-app/app/pages/cart/partials/cart-header-enhanced'
import OrderSummaryEnhanced from '@salesforce/retail-react-app/app/pages/cart/partials/order-summary-enhanced'
import CartCtaEnhanced from '@salesforce/retail-react-app/app/pages/cart/partials/cart-cta-enhanced'
import MobileStickyCta from '@salesforce/retail-react-app/app/pages/cart/partials/mobile-sticky-cta'

const CartEnhancedLayout = ({
    basket,
    children,
    showPromoCodeForm = true,
    showCartItems = false
}) => {
    return (
        <Box
            minH="100vh"
            bg="linear-gradient(180deg, #F7F7F7 0%, #F2F2F2 100%)"
            data-testid="sf-cart-container-enhanced"
        >
            <Container
                maxW="container.xl"
                px={{base: 4, lg: 6}}
                pt={{base: 8, lg: 12}}
                pb={{base: 28, lg: 16}}
            >
                <Stack spacing={12}>
                    {/* HEADER */}
                    <Box>
                        <CartHeaderEnhanced />
                    </Box>

                    {/* MAIN GRID */}
                    <Grid
                        templateColumns={{base: '1fr', lg: '1fr 440px'}}
                        gap={{base: 8, lg: 12}}
                        alignItems="start"
                    >
                        {/* LEFT CART AREA */}
                        <GridItem>
                            <Box
                                bg="white"
                                borderRadius="2xl"
                                border="1px solid"
                                borderColor="#EAEAEA"
                                boxShadow="0 12px 40px rgba(0,0,0,0.05)"
                                overflow="hidden"
                                transition="all 0.2s ease"
                                _hover={{
                                    boxShadow: '0 16px 50px rgba(0,0,0,0.07)'
                                }}
                            >
                                {children}
                            </Box>
                        </GridItem>

                        {/* RIGHT SIDEBAR */}
                        <GridItem>
                            <Stack
                                spacing={6}
                                position="sticky"
                                top="100px"
                            >
                                {/* ORDER SUMMARY CARD */}
                                <Box
                                    bg="white"
                                    borderRadius="2xl"
                                    border="1px solid"
                                    borderColor="#EAEAEA"
                                    boxShadow="0 12px 35px rgba(0,0,0,0.06)"
                                    overflow="hidden"
                                >
                                    <OrderSummaryEnhanced
                                        basket={basket}
                                        showPromoCodeForm={showPromoCodeForm}
                                        showCartItems={showCartItems}
                                    />
                                </Box>

                                {/* CTA MODULE (Nike-style separation) */}
                                <Box
                                    bg="white"
                                    borderRadius="2xl"
                                    border="1px solid"
                                    borderColor="#EAEAEA"
                                    boxShadow="0 12px 35px rgba(0,0,0,0.06)"
                                    p={6}
                                    position="relative"
                                    _before={{
                                        content: '""',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        height: '3px',
                                        bg: '#FF6A00',
                                        borderTopRadius: '2xl'
                                    }}
                                >
                                    <CartCtaEnhanced />
                                </Box>
                            </Stack>
                        </GridItem>
                    </Grid>
                </Stack>
            </Container>

            {/* MOBILE CTA */}
            <MobileStickyCta basket={basket} />
        </Box>
    )
}

CartEnhancedLayout.propTypes = {
    basket: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
    showPromoCodeForm: PropTypes.bool,
    showCartItems: PropTypes.bool
}

export default CartEnhancedLayout