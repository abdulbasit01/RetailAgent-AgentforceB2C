import React from 'react'
import {
    Box,
    Button,
    Flex,
    Heading,
    Container,
    VStack,
    Text
} from '@chakra-ui/react'

const PX = (id, w = 1920, h = 1080) =>
    `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}&h=${h}&fit=crop`


const HERO_IMAGE = PX(36730440, 1920, 700)

const PlpHeroBanner = ({category}) => {
    const categoryName =
        category?.name || category?.pageTitle || 'New Arrivals'

    return (
        <Box
            position="relative"
            bg="#111111"
            minH={['320px', '420px', '520px']}
            display="flex"
            alignItems="center"
            overflow="hidden"
        >
            <Box
                position="absolute"
                top={0}
                right={0}
                bottom={0}
                left={0}
                bgImage={`url(${HERO_IMAGE})`}
                bgSize="cover"
                bgPosition="center"
                opacity={0.65}
            />

            <Box
                position="absolute"
                top={0}
                right={0}
                bottom={0}
                left={0}
                bgGradient="linear(to-r, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.35) 55%, transparent 100%)"
            />

            <Container
                maxW="container.xl"
                position="relative"
                zIndex={1}
                px={[6, 10, 16]}
            >
                <VStack
                    align="flex-start"
                    spacing={[3, 4, 5]}
                    maxW="520px"
                >
                    <Text
                        fontSize={['xs', 'sm']}
                        fontWeight={700}
                        color="rgba(255,255,255,0.7)"
                        textTransform="uppercase"
                        letterSpacing="0.2em"
                    >
                        Retail Agent
                    </Text>

                    <Heading
                        fontSize={['4xl', '6xl', '7xl']}
                        fontWeight={900}
                        color="white"
                        lineHeight={0.9}
                        textTransform="uppercase"
                        letterSpacing="-0.04em"
                    >
                        {categoryName}
                    </Heading>

                    <Text
                        fontSize={['sm', 'md', 'lg']}
                        color="rgba(255,255,255,0.75)"
                        lineHeight={1.6}
                        maxW="360px"
                    >
                        Discover premium collections, trending styles and
                        everyday essentials.
                    </Text>

                    <Button
                        size="lg"
                        bg="white"
                        color="#111111"
                        borderRadius="full"
                        fontWeight={700}
                        textTransform="uppercase"
                        px={8}
                        _hover={{
                            bg: '#F0F0F0'
                        }}
                    >
                        Shop Now
                    </Button>
                </VStack>
            </Container>
        </Box>
    )
}

export default PlpHeroBanner


