/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React from 'react'
import PropTypes from 'prop-types'
import {FormattedMessage} from 'react-intl'

// Project Components
import {
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Stack,
    Text,
    Heading
} from '@salesforce/retail-react-app/app/components/shared/ui'
import Link from '@salesforce/retail-react-app/app/components/link'

// Others
import {noop} from '@salesforce/retail-react-app/app/utils/utils'

const CategoryLinks = ({category = {}, onSelect = noop}) => {
    const {categories = []} = category

    return (
        <AccordionItem paddingBottom={6} borderTop="none" key="show-all">
            {({ isExpanded }) => (
                <>
                    <AccordionButton
                        paddingBottom={isExpanded ? 2 : 0}
                        padding="12px"
                        borderRadius="4px"
                        border="1px solid #111111"
                        background={isExpanded ? '#111111' : 'white'}
                        borderBottom={isExpanded ? 'none' : '1px solid #111111'}
                        _hover={{
                            background: isExpanded ? '#111111' : '#ebebeb'
                        }}
                    >
                        <Heading
                            as="h2"
                            flex="1"
                            textAlign="left"
                            fontSize="md"
                            fontWeight={600}
                            marginBottom="0px"
                            color={isExpanded ? 'white' : '#111111'}
                        >
                            <FormattedMessage
                                defaultMessage="Categories"
                                id="category_links.button_text"
                            />
                        </Heading>

                        <AccordionIcon color={isExpanded ? 'white' : '#111111'} />
                    </AccordionButton>

                    <AccordionPanel
                        paddingLeft={0}
                        border="1px solid #111111"
                        borderTop="none"
                        mt="-6px"
                        padding="12px 8px"
                    >
                        <Stack spacing={1}>
                            {categories.map(({ id, name }) => (
                                <Link
                                    key={id}
                                    display="flex"
                                    alignItems="center"
                                    lineHeight={{ base: '44px', lg: '24px' }}
                                    href={`/category/${id}`}
                                    onClick={onSelect}
                                    useNavLink
                                >
                                    <Text fontSize="sm">{name}</Text>
                                </Link>
                            ))}
                        </Stack>
                    </AccordionPanel>
                </>
            )}
        </AccordionItem>
    )
}

CategoryLinks.propTypes = {
    category: PropTypes.object,
    onSelect: PropTypes.func
}

export default CategoryLinks
