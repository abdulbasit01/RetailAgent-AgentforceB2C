/*
 * Copyright (c) 2025, Salesforce, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */

import React, {Fragment} from 'react'
import {FormattedMessage} from 'react-intl'

import {
    Flex,
    Button,
    Stack,
    Box,
    Text
} from '@salesforce/retail-react-app/app/components/shared/ui'

import {
    AmexIcon,
    DiscoverIcon,
    LockIcon,
    MastercardIcon,
    VisaIcon,
    LocationIcon,
    CheckIcon
} from '@salesforce/retail-react-app/app/components/icons'

import Link from '@salesforce/retail-react-app/app/components/link'

const NIKE_ORANGE = '#FF6A00' // closer to Nike tone than #ff9900

const CartCtaEnhanced = () => {
    return (
        <Fragment>
            {/* MAIN CTA */}
            <Button
                as={Link}
                to="/checkout"
                width="100%"
                h="58px"
                bg={NIKE_ORANGE}
                color="white"
                fontWeight="800"
                fontSize="sm"
                borderRadius="full"
                textTransform="uppercase"
                letterSpacing="0.08em"
                rightIcon={<LockIcon />}
                boxShadow="0 10px 25px rgba(255, 106, 0, 0.25)"
                _hover={{
                    bg: '#e85f00',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 14px 30px rgba(255, 106, 0, 0.3)'
                }}
                _active={{
                    transform: 'translateY(0)',
                    boxShadow: '0 8px 20px rgba(255, 106, 0, 0.2)'
                }}
                transition="all 0.2s ease"
            >
                <FormattedMessage
                    defaultMessage="Proceed to Checkout"
                    id="cart_cta_enhanced.link.checkout"
                />
            </Button>

            {/* BENEFITS STRIP */}
            <Stack spacing={4} mt={5}>
                <Flex
                    justify="center"
                    gap={5}
                    py={3}
                    px={4}
                    bg="#FAFAFA"
                    borderRadius="xl"
                    flexWrap="wrap"
                    border="1px solid"
                    borderColor="#F0F0F0"
                >
                    <Flex align="center" gap={1}>
                        <LocationIcon boxSize={4} color="#666" />
                        <Text fontSize="xs" color="#666" fontWeight="500">
                            Free shipping over $100
                        </Text>
                    </Flex>

                    <Flex align="center" gap={1}>
                        <CheckIcon boxSize={4} color="#666" />
                        <Text fontSize="xs" color="#666" fontWeight="500">
                            Easy returns
                        </Text>
                    </Flex>

                    <Flex align="center" gap={1}>
                        <LockIcon boxSize={4} color="#666" />
                        <Text fontSize="xs" color="#666" fontWeight="500">
                            Secure checkout
                        </Text>
                    </Flex>
                </Flex>

                {/* PAYMENT METHODS */}
                <Box>
                    <Text
                        fontSize="xs"
                        color="#999"
                        textAlign="center"
                        mb={2}
                        textTransform="uppercase"
                        letterSpacing="0.1em"
                    >
                        <FormattedMessage
                            defaultMessage="We accept"
                            id="cart_cta_enhanced.payment.we_accept"
                        />
                    </Text>

                    <Flex justify="center" align="center" gap={4}>
                        <VisaIcon height={6} width={10} />
                        <MastercardIcon height={6} width={10} />
                        <AmexIcon height={6} width={10} />
                        <DiscoverIcon height={6} width={10} />
                    </Flex>
                </Box>

                {/* HELP TEXT */}
                <Text fontSize="xs" color="#999" textAlign="center">
                    <FormattedMessage
                        defaultMessage="Need help? Contact us at "
                        id="cart_cta_enhanced.help.contact"
                    />
                    <Link to="/contact" color={NIKE_ORANGE} fontWeight="600">
                        support
                    </Link>
                </Text>
            </Stack>
        </Fragment>
    )
}

export default CartCtaEnhanced