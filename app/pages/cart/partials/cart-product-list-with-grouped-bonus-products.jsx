/*
 * Copyright (c) 2023, Salesforce, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */

import React from 'react'
import PropTypes from 'prop-types'

import {
    Stack,
    Box,
    Heading,
    Divider
} from '@salesforce/retail-react-app/app/components/shared/ui'

import SelectBonusProductsCard from '@salesforce/retail-react-app/app/pages/cart/partials/select-bonus-products-card'

import {getBonusProductsForSpecificCartItem} from '@salesforce/retail-react-app/app/utils/bonus-product/cart'
import {getRemainingAvailableBonusProductsForProduct} from '@salesforce/retail-react-app/app/utils/bonus-product/discovery'
import {shouldShowBonusProductSelection} from '@salesforce/retail-react-app/app/utils/bonus-product/business-logic'

/* ---------------- NIKE STYLE TOKENS ---------------- */
const BORDER = '#EAEAEA'
const SOFT_BG = '#FAFAFA'
const CARD_BG = '#FFFFFF'

/* ---- IMPORTANT: override image rounding globally via wrapper ---- */
const imageWrapperSx = {
    '& img': {
        borderRadius: '12px',   // <- key fix (Nike subtle rounding)
        objectFit: 'cover'
    }
}

const CartProductListWithGroupedBonusProducts = ({
    nonBonusProducts,
    basket,
    productsWithPromotions,
    isPromotionDataLoading,
    renderProductItem,
    getPromotionCalloutText,
    onSelectBonusProducts,
    hideBorder = false
}) => {
    if (!nonBonusProducts?.length) {
        return (
            <Stack spacing={4}>
                {basket.productItems?.map((productItem, idx) =>
                    renderProductItem(productItem, idx, {
                        imageWrapperSx   // pass styling hint if supported
                    })
                )}
            </Stack>
        )
    }

    return (
        <Stack spacing={8}>
            {nonBonusProducts.map((qualifyingProduct, qualifyingIdx) => {
                if (!productsWithPromotions || isPromotionDataLoading) {
                    return (
                        <Box key={qualifyingProduct.itemId}>
                            {renderProductItem(qualifyingProduct, qualifyingIdx)}
                        </Box>
                    )
                }

                const shouldShowBonusSelection = shouldShowBonusProductSelection(
                    basket,
                    qualifyingProduct.productId,
                    productsWithPromotions
                )

                if (!shouldShowBonusSelection) {
                    return (
                        <Box key={qualifyingProduct.itemId}>
                            {renderProductItem(qualifyingProduct, qualifyingIdx)}
                        </Box>
                    )
                }

                try {
                    const bonusProductsForThisProduct =
                        getBonusProductsForSpecificCartItem(
                            basket,
                            qualifyingProduct,
                            productsWithPromotions
                        )

                    const remainingBonusProductsData =
                        getRemainingAvailableBonusProductsForProduct(
                            basket,
                            qualifyingProduct.productId,
                            productsWithPromotions
                        )

                    const hasBonusProductsInCart =
                        bonusProductsForThisProduct.length > 0

                    const hasRemainingCapacity =
                        remainingBonusProductsData.hasRemainingCapacity ||
                        (shouldShowBonusSelection &&
                            remainingBonusProductsData.aggregatedMaxBonusItems === 0)

                    return (
                        <Box
                            key={qualifyingProduct.itemId}
                            data-testid={`product-group-${qualifyingProduct.productId}`}
                            bg={CARD_BG}
                            borderRadius="2xl"
                            border={hideBorder ? 'none' : `1px solid ${BORDER}`}
                            boxShadow="0 6px 20px rgba(0,0,0,0.04)"
                            overflow="hidden"
                            transition="all 0.25s ease"
                            _hover={{
                                transform: 'translateY(-2px)',
                                boxShadow: '0 12px 28px rgba(0,0,0,0.06)'
                            }}
                        >
                            {/* MAIN PRODUCT */}
                            <Box px={4} py={4} sx={imageWrapperSx}>
                                {renderProductItem(qualifyingProduct, qualifyingIdx, {
                                    hideBorder: true
                                })}
                            </Box>

                            {/* BONUS PRODUCTS */}
                            {hasBonusProductsInCart && (
                                <Box bg={SOFT_BG} px={4} py={4}>
                                    <Heading
                                        fontSize="xs"
                                        fontWeight="900"
                                        color="#111"
                                        mb={3}
                                        textTransform="uppercase"
                                        letterSpacing="0.12em"
                                    >
                                        Bonus Picks
                                    </Heading>

                                    <Stack spacing={3}>
                                        {bonusProductsForThisProduct.map(
                                            (bonusProduct, bonusIdx) => {
                                                const isLast =
                                                    bonusIdx ===
                                                    bonusProductsForThisProduct.length - 1

                                                return (
                                                    <Box
                                                        key={bonusProduct.itemId}
                                                        data-testid={`bonus-product-${bonusProduct.productId}`}
                                                        bg="white"
                                                        borderRadius="lg"
                                                        border={`1px solid ${BORDER}`}
                                                        px={3}
                                                        py={3}
                                                        sx={imageWrapperSx}
                                                    >
                                                        {renderProductItem(
                                                            bonusProduct,
                                                            bonusIdx,
                                                            {
                                                                showQuantitySelector: false,
                                                                hideBorder: true,
                                                                hideBottomBorder: isLast
                                                            }
                                                        )}
                                                    </Box>
                                                )
                                            }
                                        )}
                                    </Stack>
                                </Box>
                            )}

                            {/* DIVIDER */}
                            {hasBonusProductsInCart && hasRemainingCapacity && (
                                <Divider borderColor={BORDER} />
                            )}

                            {/* BONUS CTA (THIS IS THE FIXED PART) */}
                            {hasRemainingCapacity && (
                                <Box px={4} py={4}>
                                    <Box
                                        /* Nike-style CTA wrapper */
                                        bg="#111"
                                        color="white"
                                        borderRadius="full"
                                        px={5}
                                        py={3}
                                        textAlign="center"
                                        fontWeight="700"
                                        fontSize="sm"
                                        letterSpacing="0.08em"
                                        textTransform="uppercase"
                                        cursor="pointer"
                                        transition="all 0.2s ease"
                                        _hover={{
                                            bg: '#000',
                                            transform: 'translateY(-1px)'
                                        }}
                                        onClick={() =>
                                            onSelectBonusProducts(qualifyingProduct)
                                        }
                                    >
                                        {getPromotionCalloutText(
                                            qualifyingProduct
                                        ) || 'Select Bonus Product'}
                                    </Box>
                                </Box>
                            )}
                        </Box>
                    )
                } catch (error) {
                    console.error('Error in enhanced rendering:', error)

                    return (
                        <Box key={qualifyingProduct.itemId}>
                            {renderProductItem(qualifyingProduct, qualifyingIdx)}
                        </Box>
                    )
                }
            })}
        </Stack>
    )
}

CartProductListWithGroupedBonusProducts.propTypes = {
    nonBonusProducts: PropTypes.array.isRequired,
    basket: PropTypes.object.isRequired,
    productsWithPromotions: PropTypes.object,
    isPromotionDataLoading: PropTypes.bool.isRequired,
    renderProductItem: PropTypes.func.isRequired,
    getPromotionCalloutText: PropTypes.func.isRequired,
    onSelectBonusProducts: PropTypes.func.isRequired,
    hideBorder: PropTypes.bool
}

export default CartProductListWithGroupedBonusProducts