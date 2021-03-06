import { Text as ChakraText, TextProps } from "@chakra-ui/layout"

interface Compound {
	Subtitle: React.ComponentType<Omit<TextProps, 'variant'>>
	Body: React.ComponentType<Omit<TextProps, 'variant'>>
	Body2: React.ComponentType<Omit<TextProps, 'variant'>>
	Caption: React.ComponentType<Omit<TextProps, 'variant'>>
	Naked: React.ComponentType<Omit<TextProps, 'variant'>>
}

export const Text = Object.assign(ChakraText, {
	Subtitle: props => <ChakraText variant="subtitle" {...props} />,
	Body: props => <ChakraText {...props} />,
	Body2: props => <ChakraText variant="body2" {...props} />,
	Caption: props => <ChakraText variant="caption" {...props} />,
	Naked: props => <ChakraText variant="naked" {...props} />,
} as Compound)
