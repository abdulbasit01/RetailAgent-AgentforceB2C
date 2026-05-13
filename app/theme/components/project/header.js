/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 */

export default {
    parts: [
        'container',
        'content',
        'searchContainer',
        'bodyContainer',
        'logo',
        'icons',
        'accountIcon',
        'arrowDown',
        'wishlistIcon',
        'popoverContent',
        'signout',
        'signoutIcon',
        'signoutText'
    ],

    baseStyle: {
        container: {
            width: 'full',
            bg: 'white',
            borderBottom: '1px solid',
            borderColor: '#E5E5E5',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            boxShadow: 'none'
        },

        content: {
            maxWidth: 'container.xxxl',
            mx: 'auto',
            px: [4, 4, 6, 8],
            py: [3, 3, 3, 3]
        },

        searchContainer: {
            order: [2, 2, 2, 'inherit'],
            width: ['full', 'full', 'full', 64],
            mr: [0, 0, 0, 4],
            mb: [2, 2, 2, 0]
        },

        bodyContainer: {
            flex: 1
        },

        logo: {
            width: [8, 8, 10, 12],
            height: [6, 6, 7, 8],
            color: '#111111'
        },

        icons: {
            color: '#111111',
            mb: [1, 1, 2, 0],
            transition: 'color 0.15s ease',
            _hover: {
                color: '#737373'
            },
            _focusVisible: {
                outline: 'none'
            }
        },

        accountIcon: {
            height: 11,
            minWidth: 'auto',
            cursor: 'pointer',
            alignSelf: ['self-start', 'self-start', 'self-start', 'auto']
        },

        arrowDown: {
            height: 11,
            minWidth: 'auto',
            display: ['none', 'none', 'none', 'block'],
            color: '#111111'
        },

        wishlistIcon: {
            ml: 2
        },

        popoverContent: {
            borderRadius: 'md',
            border: '1px solid',
            borderColor: '#E5E5E5',
            boxShadow: 'md'
        },

        signout: {
            width: '100%',
            height: 11,
            px: 4,
            py: 3,
            mt: 1,
            borderRadius: 'md',
            _hover: {
                bg: '#F5F5F5'
            }
        },

        signoutIcon: {
            mr: 2,
            color: '#737373'
        },

        signoutText: {
            fontSize: 'sm',
            fontWeight: 500,
            color: '#404040'
        }
    }
}
