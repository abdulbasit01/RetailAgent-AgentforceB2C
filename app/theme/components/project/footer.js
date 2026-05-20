/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
export default {
    parts: [
        'container',
        'content',
        'subscribe',
        'subscribeField',
        'subscribeButtonContainer',
        'subscribeHeading',
        'subscribeMessage',
        'localeSelector',
        'bottomHalf',
        'horizontalRule',
        'copyright',
        'socialIcons'
    ],
    baseStyle: {
        container: {
            width: 'full',
            background: '#111111'
        },
        content: {
            maxWidth: 'container.xxl',
            marginLeft: 'auto',
            marginRight: 'auto',
            color: 'white',
            paddingTop: {base: 10, lg: 16},
            paddingBottom: 10,
            paddingLeft: [4, 4, 6, 8],
            paddingRight: [4, 4, 6, 8]
        },
        subscribe: {
            maxWidth: {base: '21.5rem', lg: 'none'}
        },
        subscribeField: {
            background: 'white',
            color: '#111111',
            borderRadius: 'full'
        },
        subscribeButtonContainer: {
            width: 'auto'
        },
        subscribeHeading: {
            fontSize: 'lg',
            marginBottom: 2,
            color: 'white',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
        },
        subscribeMessage: {
            fontSize: 'sm',
            marginBottom: 4,
            color: '#A3A3A3'
        },
        localeSelector: {
            display: 'inline-block',
            marginTop: 8
        },
        localeDropdown: {
            background: '#2E2E2E',
            color: 'white',
            _hover: {
                background: '#404040'
            }
        },
        localeDropdownOption: {
            color: 'black'
        },
        bottomHalf: {
            maxWidth: {base: '34.5rem', lg: '100%'}
        },
        horizontalRule: {
            marginTop: 8,
            marginBottom: 8,
            borderColor: '#2E2E2E'
        },
        copyright: {
            fontSize: 'sm',
            marginBottom: 6,
            color: '#A3A3A3'
        },
        socialIcons: {
            marginTop: 6
        }
    }
}
