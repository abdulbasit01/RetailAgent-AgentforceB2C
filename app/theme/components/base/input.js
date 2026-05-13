/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
const mdSize = {height: 11, borderRadius: 'full'}

export default {
    sizes: {
        md: {
            field: {...mdSize, px: 4},
            addon: mdSize
        }
    },
    baseStyle: {
        field: {
            _focus: {
                borderColor: '#111111'
            }
        }
    },
    variants: {
        outline: {
            field: {
                borderRadius: 'full',
                borderColor: '#E5E5E5',
                _focus: {
                    borderColor: '#111111',
                    boxShadow: '0 0 0 1px #111111'
                },
                _hover: {
                    borderColor: '#A3A3A3'
                }
            }
        },
        filled: {
            // used for search input
            field: {
                borderRadius: 'full',
                borderColor: 'transparent',
                backgroundColor: '#F0F0F0',
                _focus: {
                    backgroundColor: 'white',
                    borderColor: '#111111',
                    boxShadow: '0 0 0 1px #111111'
                },
                _hover: {
                    backgroundColor: '#E8E8E8',
                    _focus: {
                        backgroundColor: 'white'
                    }
                },
                _placeholder: {
                    color: '#737373'
                }
            }
        }
    }
}
