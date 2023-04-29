import type { ElementType, ComponentPropsWithoutRef, PropsWithChildren } from "react";

type PolymorphicAsProp<E extends ElementType> = {
  as?: E;
};

type PolymorphicProps<E extends ElementType> = PropsWithChildren<
  ComponentPropsWithoutRef<E>
  & PolymorphicAsProp<E>
>;

declare global {
	interface String {
		toCapitalize: () => string
	}
}

declare global {
  interface ENV {
    SANITY_PUBLIC_PROJECT_ID: string
    SANITY_PUBLIC_DATASET: string
    SANITY_PUBLIC_API_VERSION: string
    
    FORMSPREE_KEY: string
  }
  namespace NodeJS {
    interface ProcessEnv extends ENV { }
  }

  interface Window {
    ENV: ENV
  }
}