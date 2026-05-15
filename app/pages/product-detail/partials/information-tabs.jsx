/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React from 'react'
import PropTypes from 'prop-types'

import {
    Box,
    Stack
} from '@salesforce/retail-react-app/app/components/shared/ui'

import {
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel
} from '@chakra-ui/react'

import {useIntl} from 'react-intl'

const InformationTabs = ({product}) => {
    const {formatMessage} = useIntl()

    return (
        <Stack direction="row" spacing={[0, 0, 0, 16]} width="100%">
            <Box
                width="100%"
                maxWidth="896px"
                flex={[1, 1, 1, 5]}
            >
                <Tabs variant="unstyled" isFitted>
                    {/* Tab Headers */}
                    <TabList
                        borderBottom="1px solid"
                        borderColor="gray.200"
                        overflowX="auto"
                        whiteSpace="nowrap"
                    >
                        <Tab
                            py={4}
                            px={6}
                            fontWeight="600"
                            fontSize="md"
                            color="gray.600"
                            borderBottom="2px solid transparent"
                            _selected={{
                                color: 'black',
                                borderColor: 'black'
                            }}
                        >
                            {formatMessage({
                                defaultMessage: 'Product Detail',
                                id: 'product_detail.tabs.button.product_detail'
                            })}
                        </Tab>

                        <Tab
                            py={4}
                            px={6}
                            fontWeight="600"
                            fontSize="md"
                            color="gray.600"
                            borderBottom="2px solid transparent"
                            _selected={{
                                color: 'black',
                                borderColor: 'black'
                            }}
                        >
                            {formatMessage({
                                defaultMessage: 'Size & Fit',
                                id: 'product_detail.tabs.button.size_fit'
                            })}
                        </Tab>

                        <Tab
                            py={4}
                            px={6}
                            fontWeight="600"
                            fontSize="md"
                            color="gray.600"
                            borderBottom="2px solid transparent"
                            _selected={{
                                color: 'black',
                                borderColor: 'black'
                            }}
                        >
                            {formatMessage({
                                defaultMessage: 'Reviews',
                                id: 'product_detail.tabs.button.reviews'
                            })}
                        </Tab>

                        <Tab
                            py={4}
                            px={6}
                            fontWeight="600"
                            fontSize="md"
                            color="gray.600"
                            borderBottom="2px solid transparent"
                            _selected={{
                                color: 'black',
                                borderColor: 'black'
                            }}
                        >
                            {formatMessage({
                                defaultMessage: 'Questions',
                                id: 'product_detail.tabs.button.questions'
                            })}
                        </Tab>
                    </TabList>

                    {/* Tab Content */}
                    <TabPanels pt={6}>
                        {/* Product Detail */}
                        <TabPanel px={0}>
                            <Box
                                fontSize="sm"
                                lineHeight="1.8"
                                color="gray.700"
                            >
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: product?.longDescription
                                    }}
                                />
                            </Box>
                        </TabPanel>

                        {/* Size & Fit */}
                        <TabPanel px={0}>
                            <Box fontSize="sm" color="gray.700">
                                {formatMessage({
                                    defaultMessage: 'Coming Soon',
                                    id: 'product_detail.tabs.message.coming_soon'
                                })}
                            </Box>
                        </TabPanel>

                        {/* Reviews */}
                        <TabPanel px={0}>
                            <Box fontSize="sm" color="gray.700">
                                {formatMessage({
                                    defaultMessage: 'Coming Soon',
                                    id: 'product_detail.tabs.message.coming_soon'
                                })}
                            </Box>
                        </TabPanel>

                        {/* Questions */}
                        <TabPanel px={0}>
                            <Box fontSize="sm" color="gray.700">
                                {formatMessage({
                                    defaultMessage: 'Coming Soon',
                                    id: 'product_detail.tabs.message.coming_soon'
                                })}
                            </Box>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>

            <Box display={['none', 'none', 'none', 'block']} flex={4}></Box>
        </Stack>
    )
}

InformationTabs.propTypes = {
    product: PropTypes.object
}

export default InformationTabs