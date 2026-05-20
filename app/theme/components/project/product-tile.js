/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
export default {
    baseStyle: () => ({
        container: {
            position: 'relative',
            bg: 'white'
        },
        favIcon: {
            position: 'absolute',
            variant: 'unstyled',
            top: 2,
            right: 2
        },
        imageWrapper: {
            position: 'relative',
            marginBottom: 0,
            bg: '#F5F5F5',
            overflow: 'hidden'
        },
        image: {
            ratio: 1,
            paddingBottom: 0
        },
        link: {
            display: 'block',
            padding: 0
        },
        price: {
            fontSize: 'sm',
            color: '#737373',
            mt: 1
        },
        title: {
            fontWeight: 600,
            fontSize: 'sm',
            color: '#111111',
            noOfLines: 2,
            lineHeight: 'tall'
        },
        rating: {},
        variations: {},
        badgeGroup: {
            position: 'absolute',
            top: 2,
            left: 2
        }
    }),
    parts: [
        'container',
        'imageWrapper',
        'image',
        'price',
        'title',
        'rating',
        'variations',
        'badgeGroup'
    ]
}
