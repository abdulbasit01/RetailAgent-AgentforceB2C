import React, {useEffect, useRef} from 'react'
import {useIntl} from 'react-intl'
import {useLocation} from 'react-router-dom'

import {
    Badge,
    Box,
    Button,
    HStack,
    Flex,
    Container,
    AspectRatio,
    Heading,
    SimpleGrid,
    Text,
    VStack
} from '@salesforce/retail-react-app/app/components/shared/ui'

import Seo from '@salesforce/retail-react-app/app/components/seo'
import Island from '@salesforce/retail-react-app/app/components/island'
import ProductTile from '@salesforce/retail-react-app/app/components/product-tile'

import useEinstein from '@salesforce/retail-react-app/app/hooks/use-einstein'
import useDataCloud from '@salesforce/retail-react-app/app/hooks/use-datacloud'
import {useServerContext} from '@salesforce/pwa-kit-react-sdk/ssr/universal/hooks'
import {useProductSearch} from '@salesforce/commerce-sdk-react'

import {
    HOME_SHOP_PRODUCTS_CATEGORY_ID,
    HOME_SHOP_PRODUCTS_LIMIT,
    MAX_CACHE_AGE,
    STALE_WHILE_REVALIDATE
} from '@salesforce/retail-react-app/app/constants'
import ProductTileHome from '../../components/product-tile/product-tile-home'
import ProductSlideHome from '../../components/product-tile/product-slide-home'
import {Tile} from '../../components/shared/ui/Tile'
import HeroSlider from './partials/hero-slider'
import Link from '../../components/link'
import Slider from 'react-slick'

// Pexels CDN helper — verified clothing/athletic photo IDs
const PX = (id, w = 1920, h = 1080) =>
    `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}&h=${h}&fit=crop`

// Hero: runner, athletic woman, sneakers
const HERO_SLIDES = [
    {
        id: 'slide-1',
        bg: '#0d0d0d',
        image: PX(2294361, 1920, 900),
        eyebrow: 'New Season — Spring 2025',

        headline: {
            primary: 'Just',
            rest: 'Do It.'
        },

        sub: 'Gear built for every rep, every run, every day.',
        ctaPrimary: {label: "Shop Men's", href: '/'},
        ctaSecondary: {label: "Shop Women's", href: '/'}
    },
    {
        id: 'slide-2',
        bg: '#111827',
        image: PX(1545590, 1920, 900),
        eyebrow: "Women's Collection",

        headline: {
            primary: 'Made',
            rest: 'to Move.'
        },

        sub: 'Performance meets style for every athlete.',
        ctaPrimary: {label: 'Shop Now', href: '/'},
        ctaSecondary: null
    },
    {
        id: 'slide-3',
        bg: '#1a0a00',
        image: PX(1598505, 1920, 900),
        eyebrow: 'Iconic Footwear',

        headline: {
            primary: 'Fresh',
            rest: 'Kicks.'
        },

        sub: 'The most iconic silhouettes, updated for today.',
        ctaPrimary: {label: 'Shop Footwear', href: '/'},
        ctaSecondary: {label: 'View Sale', href: '/'}
    }
]

// Category tiles — clothing-appropriate images matched to category
const CATEGORY_TILES = [
    {label: "Men's", subLabel: 'New Arrivals', image: PX(1043474, 600, 800), bg: '#1A1A1A'}, // athletic man
    {label: "Women's", subLabel: 'Best Sellers', image: PX(34263759, 600, 800), bg: '#C8B8A2'}, // women workout
    {label: "Kids'", subLabel: 'Fresh Styles', image: PX(6261908, 600, 800), bg: '#BDD7EE'}, // kids sport
    {label: 'Sale', subLabel: 'Up to 50% Off', image: PX(1598505, 600, 800), bg: '#FA5400'} // sneakers
]

// Product slider — no built-in arrows (we add custom ones in the header row)
const productSlickSx = {
    '.slick-list': {overflow: 'visible'},
    '.slick-track': {display: 'flex', alignItems: 'stretch'},
    '.slick-slide': {height: 'inherit', '& > div': {height: '100%'}}
}

// ─── Component ───────────────────────────────────────────────────────────────
const Home = () => {
    const intl = useIntl()
    const einstein = useEinstein()
    const dataCloud = useDataCloud()
    const {pathname} = useLocation()
    const {res} = useServerContext()
    const popularSliderRef = useRef(null)

    if (res) {
        res.set(
            'Cache-Control',
            `s-maxage=${MAX_CACHE_AGE}, stale-while-revalidate=${STALE_WHILE_REVALIDATE}`
        )
    }

    const {data: productSearchResult, isLoading} = useProductSearch({
        parameters: {
            allImages: true,
            allVariationProperties: true,
            expand: ['promotions', 'variations', 'prices', 'images', 'custom_properties'],
            limit: HOME_SHOP_PRODUCTS_LIMIT,
            perPricebook: true,
            refine: [`cgid=${HOME_SHOP_PRODUCTS_CATEGORY_ID}`, 'htype=master']
        }
    })

    useEffect(() => {
        einstein.sendViewPage(pathname)
        dataCloud.sendViewPage(pathname)
    }, [])

    const featuredProducts = productSearchResult?.hits?.slice(0, 4) ?? []
    const popularProducts = productSearchResult?.hits ?? []

    return (
        <Box data-testid="home-page" bg="white">
            <Seo
                title="Home Page"
                description="Agent Force — Your AI-Powered Store"
                keywords="Agent Force, Commerce, Retail"
            />

            {/* ── 1. HERO SLIDER ───────────────────────────────────────── */}
            <Island hydrateOn="visible">
                <HeroSlider slides={HERO_SLIDES} />
            </Island>

            {/* ── 2. SHOP BY CATEGORY ─────────────────────────────────── */}
            <Island hydrateOn="visible">
                <Box py={[10, 12, 16]} px={[4, 6, 8]} bg="white">
                    <Container maxW="container.xl" mx="auto">
                        <Heading
                            as="h2"
                            fontSize={['xl', '2xl', '3xl']}
                            fontWeight={900}
                            textTransform="uppercase"
                            letterSpacing="-0.02em"
                            color="#111111"
                            mb={8}
                        >
                            Shop by Category
                        </Heading>
                        <SimpleGrid columns={[2, 2, 4]} spacing={[3, 4]}>
                            {CATEGORY_TILES.map((tile, i) => (
                                <Tile
                                    key={tile.id}
                                    href={tile.href}
                                    image={tile.image}
                                    label={tile.label}
                                    subLabel={tile.subLabel}
                                    bg={tile.bg}
                                />
                            ))}
                        </SimpleGrid>
                    </Container>
                </Box>
            </Island>

            {/* ── 3. NEW ARRIVALS — 4-col product grid ─────────────────── */}
            {featuredProducts.length > 0 && (
                <Island hydrateOn="visible">
                    <Box py={[10, 12, 16]} bg="#F5F5F5">
                        <Container maxW="container.xl" mx="auto" px={[4, 6, 8]}>
                            <HStack justify="space-between" align="center" mb={[6, 8]}>
                                <HStack spacing={3} align="center">
                                    <Badge
                                        bg="#111111"
                                        color="white"
                                        borderRadius="full"
                                        px={3}
                                        py={1}
                                        fontSize="xs"
                                        fontWeight={700}
                                        textTransform="uppercase"
                                        letterSpacing="0.1em"
                                    >
                                        New
                                    </Badge>
                                    <Heading
                                        as="h2"
                                        fontSize={['xl', '2xl', '3xl']}
                                        fontWeight={900}
                                        textTransform="uppercase"
                                        letterSpacing="-0.02em"
                                        color="#111111"
                                        marginBottom={0}
                                    >
                                        Arrivals
                                    </Heading>
                                </HStack>
                                <Link
                                    href="/"
                                    fontSize="sm"
                                    fontWeight={700}
                                    textTransform="uppercase"
                                    letterSpacing="0.05em"
                                    color="#111111"
                                    textDecoration="underline"
                                    _hover={{color: '#737373'}}
                                >
                                    View All
                                </Link>
                            </HStack>
                            <SimpleGrid columns={[1, 2, 4]} spacing={[3, 4, 5]}>
                                {featuredProducts.map((product) => (
                                    <Box
                                        bg="white"
                                        borderRadius="xl"
                                        overflow="hidden"
                                        border="1px solid"
                                        borderColor="#EBEBEB"
                                        height="100%"
                                    >
                                        <ProductTileHome product={product} />
                                    </Box>
                                ))}
                            </SimpleGrid>
                        </Container>
                    </Box>
                </Island>
            )}

            {/* ── 4. EDITORIAL SPLIT BANNER ────────────────────────────── */}
            <Island hydrateOn="visible">
                <SimpleGrid columns={[1, 1, 2]} spacing={0}>
                    <Flex
                        bg="#111111"
                        align="center"
                        justify="center"
                        py={[16, 20, 24]}
                        px={[8, 12, 16]}
                        minH={['auto', 'auto', '60vh']}
                        order={[2, 2, 1]}
                    >
                        <VStack align="flex-start" spacing={6} maxW="420px">
                            <Text
                                fontSize="xs"
                                fontWeight={700}
                                color="#A3A3A3"
                                textTransform="uppercase"
                                letterSpacing="0.2em"
                            >
                                Member Exclusive
                            </Text>
                            <Heading
                                as="h2"
                                fontSize={['3xl', '4xl', '5xl']}
                                fontWeight={900}
                                color="white"
                                textTransform="uppercase"
                                letterSpacing="-0.03em"
                                lineHeight={0.92}
                            >
                                Run the World in Style.
                            </Heading>
                            <Text fontSize="md" color="#A3A3A3" lineHeight={1.7}>
                                Our most advanced running gear — engineered for speed, designed for
                                the streets.
                            </Text>
                            <Button
                                as={Link}
                                href="/"
                                size="lg"
                                bg="white"
                                color="#111111"
                                borderRadius="full"
                                fontWeight={700}
                                textTransform="uppercase"
                                letterSpacing="0.05em"
                                px={8}
                                _hover={{bg: '#F0F0F0', textDecoration: 'none'}}
                            >
                                Explore Running
                            </Button>
                        </VStack>
                    </Flex>
                    <Box
                        bg="#2A2A2A"
                        position="relative"
                        minH={['55vw', '50vh', '60vh']}
                        overflow="hidden"
                        order={[1, 1, 2]}
                    >
                        <Box
                            position="absolute"
                            top={0}
                            right={0}
                            bottom={0}
                            left={0}
                            bgImage={`url(${PX(2897532, 960, 720)})`}
                            bgSize="cover"
                            bgPosition="center"
                        />
                    </Box>
                </SimpleGrid>
            </Island>

            {/* ── 5. POPULAR RIGHT NOW — product slider with Nike-style top-right arrows */}
            {popularProducts.length > 0 && (
                <Island hydrateOn="visible">
                    <Box py={[10, 12, 16]} bg="white">
                        <Container maxW="container.xxl" mx="auto" px={[4, 6, 8]}>
                            <HStack justify="space-between" align="center" mb={[6, 8]}>
                                <Heading
                                    as="h2"
                                    fontSize={['xl', '2xl', '3xl']}
                                    fontWeight={900}
                                    textTransform="uppercase"
                                    letterSpacing="-0.02em"
                                    color="#111111"
                                >
                                    Popular Right Now
                                </Heading>
                                {/* Nike-style top-right controls */}
                                <HStack spacing={3}>
                                    <HStack spacing={2}>
                                        <Box
                                            as="button"
                                            onClick={() => popularSliderRef.current?.slickPrev()}
                                            w="40px"
                                            h="40px"
                                            borderRadius="full"
                                            border="1.5px solid"
                                            borderColor="#E5E5E5"
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                            bg="white"
                                            cursor="pointer"
                                            fontSize="18px"
                                            lineHeight={1}
                                            color="#111111"
                                            transition="border-color 0.15s"
                                            _hover={{borderColor: '#111111'}}
                                        >
                                            ‹
                                        </Box>
                                        <Box
                                            as="button"
                                            onClick={() => popularSliderRef.current?.slickNext()}
                                            w="40px"
                                            h="40px"
                                            borderRadius="full"
                                            border="1.5px solid"
                                            borderColor="#E5E5E5"
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                            bg="white"
                                            cursor="pointer"
                                            fontSize="18px"
                                            lineHeight={1}
                                            color="#111111"
                                            transition="border-color 0.15s"
                                            _hover={{borderColor: '#111111'}}
                                        >
                                            ›
                                        </Box>
                                    </HStack>
                                    <Link
                                        href="/"
                                        fontSize="sm"
                                        fontWeight={700}
                                        textTransform="uppercase"
                                        letterSpacing="0.05em"
                                        color="#111111"
                                        textDecoration="underline"
                                        _hover={{color: '#737373'}}
                                    >
                                        View All
                                    </Link>
                                </HStack>
                            </HStack>
                            {typeof window !== 'undefined' && (
                                <Box sx={productSlickSx} overflow="hidden" height="100%">
                                    <Slider
                                        ref={popularSliderRef}
                                        dots={false}
                                        arrows={false}
                                        infinite={popularProducts.length > 4}
                                        speed={400}
                                        slidesToShow={4}
                                        slidesToScroll={2}
                                        responsive={[
                                            {
                                                breakpoint: 1280,
                                                settings: {slidesToShow: 3, slidesToScroll: 1}
                                            },
                                            {
                                                breakpoint: 768,
                                                settings: {slidesToShow: 2, slidesToScroll: 1}
                                            },
                                            {
                                                breakpoint: 480,
                                                settings: {slidesToShow: 1, slidesToScroll: 1}
                                            }
                                        ]}
                                    >
                                        {popularProducts.map((product) => (
                                            <Box key={product.productId} px={2} height="100%">
                                                <Box
                                                    bg="white"
                                                    borderRadius="xl"
                                                    overflow="hidden"
                                                    border="1px solid"
                                                    borderColor="#EBEBEB"
                                                    height="100%"
                                                    minH="420px"
                                                >
                                                    <ProductSlideHome product={product} />
                                                </Box>
                                            </Box>
                                        ))}
                                    </Slider>
                                </Box>
                            )}
                        </Container>
                    </Box>
                </Island>
            )}

            {/* ── 6. PROMO STRIP — 3-col editorial with clothing images ── */}
            <Island hydrateOn="visible">
                <Box py={[8, 10, 12]} px={[4, 6, 8]} bg="#F5F5F5">
                    <Container maxW="container.xl" mx="auto">
                        <SimpleGrid columns={[1, 1, 3]} spacing={[4, 4, 5]}>
                            {[
                                {id: 2294361, label: 'Running', badge: 'Trending'},
                                {id: 1552242, label: 'Training', badge: 'Staff Pick'},
                                {id: 1043474, label: 'Lifestyle', badge: 'New'}
                            ].map((promo, i) => (
                                <Link key={i} href="/" _hover={{textDecoration: 'none'}}>
                                    <Box
                                        borderRadius="xl"
                                        overflow="hidden"
                                        position="relative"
                                        bg="#2a2a2a"
                                        cursor="pointer"
                                        transition="transform 0.25s ease"
                                        _hover={{transform: 'translateY(-3px)'}}
                                    >
                                        <AspectRatio ratio={16 / 9}>
                                            <Box position="relative" w="full" h="full">
                                                <Box
                                                    position="absolute"
                                                    top={0}
                                                    right={0}
                                                    bottom={0}
                                                    left={0}
                                                    bgImage={`url(${PX(promo.id, 640, 360)})`}
                                                    bgSize="cover"
                                                    bgPosition="center"
                                                    opacity={0.85}
                                                />
                                                <Box
                                                    position="absolute"
                                                    top={0}
                                                    right={0}
                                                    bottom={0}
                                                    left={0}
                                                    bgGradient="linear(to-t, rgba(0,0,0,0.7) 0%, transparent 60%)"
                                                />
                                                <Flex
                                                    position="absolute"
                                                    bottom={0}
                                                    left={0}
                                                    right={0}
                                                    p={4}
                                                    direction="column"
                                                    align="flex-start"
                                                >
                                                    <Badge
                                                        bg="white"
                                                        color="#111111"
                                                        borderRadius="full"
                                                        px={2}
                                                        py="3px"
                                                        fontSize="2xs"
                                                        fontWeight={700}
                                                        textTransform="uppercase"
                                                        letterSpacing="0.1em"
                                                        mb={1}
                                                    >
                                                        {promo.badge}
                                                    </Badge>
                                                    <Text
                                                        fontSize={['md', 'lg']}
                                                        fontWeight={800}
                                                        color="white"
                                                        textTransform="uppercase"
                                                        letterSpacing="-0.01em"
                                                    >
                                                        {promo.label}
                                                    </Text>
                                                </Flex>
                                            </Box>
                                        </AspectRatio>
                                    </Box>
                                </Link>
                            ))}
                        </SimpleGrid>
                    </Container>
                </Box>
            </Island>

            {/* ── 7. MEMBERS CTA ──────────────────────────────────────── */}
            <Island hydrateOn="visible">
                <Box
                    position="relative"
                    bg="#0d0d0d"
                    py={[20, 24, 28]}
                    px={[6, 8, 12]}
                    textAlign="center"
                    overflow="hidden"
                >
                    <Box
                        position="absolute"
                        top={0}
                        right={0}
                        bottom={0}
                        left={0}
                        bgImage={`url(${PX(2897532, 1920, 700)})`}
                        bgSize="cover"
                        bgPosition="center"
                        opacity={0.12}
                    />
                    <Container maxW="container.md" mx="auto" position="relative" zIndex={1}>
                        <VStack spacing={[5, 6]}>
                            <Text
                                fontSize={['xs', 'sm']}
                                fontWeight={700}
                                color="#737373"
                                textTransform="uppercase"
                                letterSpacing="0.2em"
                            >
                                Membership
                            </Text>
                            <Heading
                                as="h2"
                                fontSize={['3xl', '4xl', '5xl', '6xl']}
                                fontWeight={900}
                                color="white"
                                textTransform="uppercase"
                                letterSpacing="-0.04em"
                                lineHeight={0.92}
                            >
                                The Best of Agent Force,
                                <br />
                                For Members.
                            </Heading>
                            <Text
                                fontSize={['md', 'lg']}
                                color="#737373"
                                maxW="460px"
                                lineHeight={1.7}
                            >
                                Join free — exclusive access to the latest products, member-only
                                events and free standard shipping.
                            </Text>
                            <HStack spacing={4} flexWrap="wrap" justify="center" pt={2}>
                                <Button
                                    as={Link}
                                    href="/registration"
                                    size="lg"
                                    bg="white"
                                    color="#111111"
                                    borderRadius="full"
                                    fontWeight={700}
                                    textTransform="uppercase"
                                    letterSpacing="0.05em"
                                    px={10}
                                    _hover={{bg: '#F0F0F0', textDecoration: 'none'}}
                                >
                                    Join Us Free
                                </Button>
                                <Button
                                    as={Link}
                                    href="/login"
                                    size="lg"
                                    variant="ghost"
                                    color="white"
                                    borderRadius="full"
                                    fontWeight={700}
                                    textTransform="uppercase"
                                    letterSpacing="0.05em"
                                    px={10}
                                    _hover={{
                                        bg: 'rgba(255,255,255,0.08)',
                                        textDecoration: 'none'
                                    }}
                                >
                                    Sign In
                                </Button>
                            </HStack>
                        </VStack>
                    </Container>
                </Box>
            </Island>

            {/* ── 8. HELP STRIP ───────────────────────────────────────── */}
            <Island hydrateOn="visible">
                <Box bg="#F5F5F5" py={[8, 10]} textAlign="center">
                    <Container maxW="container.sm" mx="auto" px={6}>
                        <VStack spacing={3}>
                            <Heading
                                as="h3"
                                fontSize={['lg', 'xl']}
                                fontWeight={800}
                                textTransform="uppercase"
                                letterSpacing="-0.01em"
                                color="#111111"
                            >
                                We&apos;re Here to Help
                            </Heading>
                            <Text fontSize="sm" color="#737373">
                                Contact our support staff — we will get you to the right place.
                            </Text>
                            <Button
                                as={Link}
                                href="https://help.salesforce.com/s/?language=en_US"
                                target="_blank"
                                size="md"
                                px={7}
                                mt={1}
                                _hover={{textDecoration: 'none'}}
                            >
                                Contact Us
                            </Button>
                        </VStack>
                    </Container>
                </Box>
            </Island>
        </Box>
    )
}

Home.getTemplateName = () => 'home'

export default Home
