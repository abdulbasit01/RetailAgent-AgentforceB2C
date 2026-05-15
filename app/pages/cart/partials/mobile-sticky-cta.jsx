/*
 * Copyright (c) 2025, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 */

import React from 'react'
import {FormattedMessage} from 'react-intl'

import {Box, Flex, Button, Text} from '@salesforce/retail-react-app/app/components/shared/ui'

import {Slide} from '@chakra-ui/react'
import {LockIcon} from '@chakra-ui/icons'

import {useCurrency} from '@salesforce/retail-react-app/app/hooks'
import Link from '@salesforce/retail-react-app/app/components/link'

const MobileStickyCta = ({basket}) => {
    const {currency} = useCurrency()

    const orderTotal = basket?.orderTotal || basket?.productTotal || 0

    return (
        <Slide direction="bottom" in={true} style={{zIndex: 1400}}>
            <Box
                position="fixed"
                bottom={0}
                left={0}
                right={0}
                bg="#ffffff"
                borderTop="1px solid"
                borderColor="#E5E5E5"
                boxShadow="0 -6px 30px rgba(0,0,0,0.08)"
                display={{base: 'block', lg: 'none'}}
                zIndex={1400}
                backdropFilter="blur(12px)"
            >
                <Flex
                    align="center"
                    justify="space-between"
                    gap={4}
                    px={4}
                    py={4}
                    maxW="container.xl"
                    mx="auto"
                >
                    {/* TOTAL */}
                    <Box flex={1} minW={0}>
                        <Text
                            fontSize="10px"
                            fontWeight="700"
                            textTransform="uppercase"
                            letterSpacing="0.08em"
                            color="#757575"
                            mb={1}
                        >
                            <FormattedMessage
                                defaultMessage="Total"
                                id="mobile_cta.label.total"
                            />
                        </Text>

                        <Text
                            fontSize="2xl"
                            fontWeight="900"
                            lineHeight={1}
                            letterSpacing="-0.03em"
                            color="#111111"
                        >
                            {new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: basket?.currency || currency || 'USD'
                            }).format(orderTotal)}
                        </Text>
                    </Box>

                    {/* CTA */}
                    <Button
                        as={Link}
                        to="/checkout"
                        height="56px"
                        minW="170px"
                        px={8}
                        bg="#111111"
                        color="#ffffff"
                        borderRadius="9999px"
                        fontSize="sm"
                        fontWeight="800"
                        letterSpacing="0.02em"
                        transition="all 0.2s ease"
                        rightIcon={<LockIcon boxSize={4} />}
                        _hover={{
                            bg: '#2B2B2B',
                            transform: 'translateY(-1px)'
                        }}
                        _active={{
                            bg: '#000000',
                            transform: 'translateY(0)'
                        }}
                        _focus={{
                            boxShadow: 'none'
                        }}
                    >
                        <FormattedMessage
                            defaultMessage="Secure Checkout"
                            id="mobile_cta.button.checkout"
                        />
                    </Button>
                </Flex>
            </Box>
        </Slide>
    )
}

export default MobileStickyCta