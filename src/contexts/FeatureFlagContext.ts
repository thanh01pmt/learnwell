import { createContext, useContext } from "react";
import { FeatureFlagContextType } from "../types/features";

export const FeatureFlagContext = createContext<
	FeatureFlagContextType | undefined
>(undefined);

export const useFeatureFlag = () => {
	const context = useContext(FeatureFlagContext);
	if (context === undefined) {
		throw new Error(
			"useFeatureFlag must be used within a FeatureFlagProvider",
		);
	}
	return context;
};
