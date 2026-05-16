/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React, {useRef, useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {useIntl} from 'react-intl'
import {
    useMultiStyleConfig,
    Box,
    Flex,
    IconButton,
    Badge,
    Button,
    Popover,
    PopoverHeader,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    Stack,
    Text,
    Divider,
    useDisclosure,
    useMediaQuery
} from '@salesforce/retail-react-app/app/components/shared/ui'
import {AuthHelpers, useAuthHelper, useCustomerType} from '@salesforce/commerce-sdk-react'

import {useCurrentBasket} from '@salesforce/retail-react-app/app/hooks/use-current-basket'

import Link from '@salesforce/retail-react-app/app/components/link'
import Search from '@salesforce/retail-react-app/app/components/search'
import withRegistration from '@salesforce/retail-react-app/app/components/with-registration'
import {
    AccountIcon,
    BasketIcon,
    HamburgerIcon,
    ChevronDownIcon,
    HeartIcon,
    SignoutIcon,
    StoreIcon
} from '@salesforce/retail-react-app/app/components/icons'

import {navLinks, messages} from '@salesforce/retail-react-app/app/pages/account/constant'
import useNavigation from '@salesforce/retail-react-app/app/hooks/use-navigation'
import LoadingSpinner from '@salesforce/retail-react-app/app/components/loading-spinner'
import {HideOnDesktop, HideOnMobile} from '@salesforce/retail-react-app/app/components/responsive'
import {isHydrated, noop} from '@salesforce/retail-react-app/app/utils/utils'
import {STORE_LOCATOR_IS_ENABLED} from '@salesforce/retail-react-app/app/constants'
import {getConfig} from '@salesforce/pwa-kit-runtime/utils/ssr-config'
const IconButtonWithRegistration = withRegistration(IconButton)

/**
 * Search bar for the header.
 *
 * The search bar is a simple input field with a search icon.
 * It can be used to search for products or navigate to a
 * specific page.
 *
 * @param props {object} the component props
 * @returns {Element} the search bar element
 */
const SearchBar = (props) => {
    const styles = useMultiStyleConfig('Header')
    const intl = useIntl()
    const placeholder = intl.formatMessage({
        id: 'header.field.placeholder.search_for_products',
        defaultMessage: 'Search for products...'
    })
    return (
        <Box {...styles.searchContainer}>
            <Search
                aria-label={placeholder}
                placeholder={placeholder}
                {...styles.search}
                {...props}
            />
        </Box>
    )
}
/**
 * The header is the main source for accessing
 * navigation, search, basket, and other
 * important information and actions. It persists
 * on the top of your application and will
 * respond to changes in device size.
 *
 * To customize the styles, update the themes
 * in theme/components/project/header.js
 * @param  props
 * @param   {func} props.onMenuClick click event handler for menu button
 * @param   {func} props.onLogoClick click event handler for menu button
 * @param   {object} props.searchInputRef reference of the search input
 * @param   {func} props.onMyAccountClick click event handler for my account button
 * @param   {func} props.onMyCartClick click event handler for my cart button
 * @return  {React.ReactElement} - Header component
 */
const Header = ({
    children,
    onMenuClick = noop,
    onMyAccountClick = noop,
    onLogoClick = noop,
    onMyCartClick = noop,
    onWishlistClick = noop,
    onStoreLocatorClick = noop,
    isHomePage = false,
    ...props
}) => {
    const intl = useIntl()
    const popoverTriggerRef = useRef(null)
    const {
        derivedData: {totalItems},
        data: basket
    } = useCurrentBasket()
    const {isRegistered} = useCustomerType()
    const logout = useAuthHelper(AuthHelpers.Logout)
    const navigate = useNavigation()
    const storeLocatorEnabled = getConfig()?.app?.storeLocatorEnabled ?? STORE_LOCATOR_IS_ENABLED
    const {
        getButtonProps: getAccountMenuButtonProps,
        getDisclosureProps: getAccountMenuDisclosureProps,
        isOpen: isAccountMenuOpen,
        onClose: onAccountMenuClose,
        onOpen: onAccountMenuOpen
    } = useDisclosure()
    const [isDesktop] = useMediaQuery('(min-width: 992px)')

    const [showLoading, setShowLoading] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (isHomePage) {
                setScrolled(window.scrollY > 64)
            } else {
                setScrolled(true)
            }
        }

        window.addEventListener('scroll', handleScroll, {passive: true})
        handleScroll()

        return () => window.removeEventListener('scroll', handleScroll)
    }, [isHomePage])

    const isTransparent = isHomePage && !scrolled
    console.log('🚀 ~ Header isTransparent:', isTransparent, 'isHomePage:', isHomePage, 'scrolled:', scrolled, 'iconColor:', isTransparent ? 'white' : '#111111')

    // tracking if users enter the popover Content,
    const hasEnterPopoverContent = useRef()

    const styles = useMultiStyleConfig('Header')

    const iconColor = isTransparent ? 'white' : '#111111'
    const logoColor = isTransparent ? 'white' : '#111111'

    const onSignoutClick = async () => {
        setShowLoading(true)
        await logout.mutateAsync()
        navigate('/login')
        setShowLoading(false)
    }

    const handleIconsMouseLeave = () => {
        // don't close the menu if users enter the popover content
        setTimeout(() => {
            if (!hasEnterPopoverContent.current) onAccountMenuClose()
        }, 100)
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Tab' && event.shiftKey && isAccountMenuOpen) {
            // Prevent default behavior to keep focus on the popup trigger
            event.preventDefault()
            popoverTriggerRef.current.focus()
        }
    }

    return (
        <Box
            as="header"
            role="banner"
            {...styles.container}
            {...props}
            position="fixed"
            bg={isTransparent ? 'rgba(255,255,255,0.15)' : 'white'}
            boxShadow={isTransparent ? 'none' : '0 2px 10px rgba(0,0,0,0.08)'}
            borderBottom={isTransparent ? 'none' : '1px solid'}
            borderColor={isTransparent ? 'transparent' : '#E5E5E5'}
            transition="background-color 0.3s ease, box-shadow 0.3s ease"
            // sx={
            //     isTransparent
            //         ? {
            //               '& > div > nav a': {color: 'white !important'},
            //               '& > div > nav button': {color: 'white !important'}
            //           }
            //         : {}
            // }
        >
            <Box {...styles.content}>
                {showLoading && <LoadingSpinner wrapperStyles={{height: '100vh'}} />}
                <Flex wrap="wrap" alignItems={['baseline', 'baseline', 'baseline', 'center']}>
                    <IconButton
                        aria-label={intl.formatMessage({
                            id: 'header.button.assistive_msg.menu',
                            defaultMessage: 'Menu'
                        })}
                        title={intl.formatMessage({
                            id: 'header.button.assistive_msg.menu.open_dialog',
                            defaultMessage: 'Opens a dialog'
                        })}
                        icon={<HamburgerIcon />}
                        variant="unstyled"
                        display={{lg: 'none'}}
                        color={iconColor}
                        onClick={onMenuClick}
                    />
                    <Box
                        as="button"
                        onClick={onLogoClick}
                        cursor="pointer"
                        border="none"
                        bg="transparent"
                        p={0}
                        mr={[2, 2, 4]}
                        _focusVisible={{
                            outline: '2px solid #111111',
                            outlineOffset: '2px',
                            borderRadius: '4px'
                        }}
                        aria-label={intl.formatMessage({
                            id: 'header.button.assistive_msg.logo',
                            defaultMessage: 'Logo'
                        })}
                    >
                        <Text
                            fontFamily="Geomanist-bold"
                            fontWeight={900}
                            fontSize={['md', 'md', 'md', 'lg']}
                            letterSpacing="-0.05em"
                            textTransform="uppercase"
                            color={logoColor}
                            lineHeight={1}
                            userSelect="none"
                        >
                            Agent/
                            <Text as="span"  color="#FA5400">
                                Force
                            </Text>
                        </Text>
                    </Box>
                    <Box {...styles.bodyContainer}>
                        {React.Children.map(children, (child) =>
                            React.isValidElement(child)
                                ? React.cloneElement(child, {isHeaderTransparent: isTransparent})
                                : child
                        )}
                    </Box>
                    <HideOnMobile>
                        <SearchBar />
                    </HideOnMobile>
                    <IconButtonWithRegistration
                        icon={<AccountIcon />}
                        aria-label={intl.formatMessage({
                            id: 'header.button.assistive_msg.my_account',
                            defaultMessage: 'My Account'
                        })}
                        variant="unstyled"
                        color={iconColor}
                        {...styles.accountIcon}
                        onClick={onMyAccountClick}
                        onMouseOver={isDesktop ? onAccountMenuOpen : noop}
                    />

                    {isRegistered && isHydrated() && (
                        <Popover
                            isLazy
                            arrowSize={15}
                            isOpen={isAccountMenuOpen}
                            placement="bottom-end"
                            onClose={onAccountMenuClose}
                            onOpen={onAccountMenuOpen}
                        >
                            <PopoverTrigger>
                                <IconButton
                                    aria-label={intl.formatMessage({
                                        id: 'header.button.assistive_msg.my_account_menu',
                                        defaultMessage: 'Open account menu'
                                    })}
                                    icon={<ChevronDownIcon />}
                                    variant="unstyled"
                                    color={iconColor}
                                    {...styles.arrowDown}
                                    {...getAccountMenuButtonProps()}
                                    onMouseOver={onAccountMenuOpen}
                                    onMouseLeave={handleIconsMouseLeave}
                                    ref={popoverTriggerRef}
                                    onKeyDown={handleKeyDown}
                                />
                            </PopoverTrigger>

                            <PopoverContent
                                {...styles.popoverContent}
                                onMouseLeave={() => {
                                    hasEnterPopoverContent.current = false
                                    onAccountMenuClose()
                                }}
                                onMouseOver={() => {
                                    hasEnterPopoverContent.current = true
                                }}
                                {...getAccountMenuDisclosureProps()}
                            >
                                <PopoverArrow />
                                <PopoverHeader>
                                    <Text as="h2" fontSize="l" fontFamily="body" fontWeight="700">
                                        {intl.formatMessage({
                                            defaultMessage: 'My Account',
                                            id: 'header.popover.title.my_account'
                                        })}
                                    </Text>
                                </PopoverHeader>
                                <PopoverBody>
                                    <Box as="nav">
                                        <Stack spacing={0} as="ul" data-testid="account-detail-nav">
                                            {navLinks.map((link) => {
                                                const LinkIcon = link.icon
                                                return (
                                                    <Box
                                                        key={link.name}
                                                        position="relative"
                                                        as="li"
                                                        listStyleType="none"
                                                    >
                                                        <Button
                                                            as={Link}
                                                            to={`/account${link.path}`}
                                                            useNavLink={true}
                                                            variant="menu-link"
                                                            leftIcon={<LinkIcon boxSize={5} />}
                                                            width="100%"
                                                        >
                                                            {intl.formatMessage(
                                                                messages[link.name]
                                                            )}
                                                        </Button>
                                                    </Box>
                                                )
                                            })}
                                        </Stack>
                                    </Box>
                                </PopoverBody>
                                <PopoverFooter onClick={onSignoutClick} cursor="pointer">
                                    <Divider colorScheme="gray" />
                                    <Button variant="unstyled" {...styles.signout}>
                                        <Flex>
                                            <SignoutIcon
                                                aria-hidden={true}
                                                boxSize={5}
                                                {...styles.signoutIcon}
                                            />
                                            <Text as="span" {...styles.signoutText}>
                                                {intl.formatMessage({
                                                    defaultMessage: 'Log out',
                                                    id: 'header.popover.action.log_out'
                                                })}
                                            </Text>
                                        </Flex>
                                    </Button>
                                </PopoverFooter>
                            </PopoverContent>
                        </Popover>
                    )}
                    <IconButtonWithRegistration
                        aria-label={intl.formatMessage({
                            defaultMessage: 'Wishlist',
                            id: 'header.button.assistive_msg.wishlist'
                        })}
                        icon={<HeartIcon />}
                        variant="unstyled"
                        color={iconColor}
                        {...styles.wishlistIcon}
                        onClick={onWishlistClick}
                    />
                    {storeLocatorEnabled && (
                        <IconButton
                            aria-label={intl.formatMessage({
                                defaultMessage: 'Store Locator',
                                id: 'header.button.assistive_msg.store_locator'
                            })}
                            icon={<StoreIcon color={iconColor} fill={iconColor} />}
                            color={iconColor}
                            variant="unstyled"
                            onClick={onStoreLocatorClick}
                        />
                    )}
                    <IconButton
                        aria-label={intl.formatMessage(
                            {
                                id: 'header.button.assistive_msg.my_cart_with_num_items',
                                defaultMessage: 'My cart, number of items: {numItems}'
                            },
                            {numItems: totalItems}
                        )}
                        icon={
                            <>
                                <BasketIcon />
                                {basket && totalItems > 0 && (
                                    <Badge variant="notification">{totalItems}</Badge>
                                )}
                            </>
                        }
                        variant="unstyled"
                        color={iconColor}
                        onClick={onMyCartClick}
                    />
                    <HideOnDesktop display={{base: 'contents', lg: 'none'}}>
                        <SearchBar />
                    </HideOnDesktop>
                </Flex>
            </Box>
        </Box>
    )
}

Header.propTypes = {
    children: PropTypes.node,
    onMenuClick: PropTypes.func,
    onLogoClick: PropTypes.func,
    onMyAccountClick: PropTypes.func,
    onWishlistClick: PropTypes.func,
    onMyCartClick: PropTypes.func,
    onStoreLocatorClick: PropTypes.func,
    isHomePage: PropTypes.bool,
    searchInputRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({current: PropTypes.elementType})
    ])
}

export default Header
