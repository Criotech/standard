import { useToggle } from "react-use";
import { useEffect } from "react";

type Controlee = {
	checked: boolean;
	toggle: (nextValue: boolean) => void;
};

export type IUseToggleAll = [boolean, (nextValue: boolean) => void];

export const useToggleAll = (controlees: Controlee[]): IUseToggleAll => {
	const [all, toggleAllCheckbox] = useToggle(false);

	const toggleAll = (checked: boolean) => {
		controlees.forEach((controlee) => {
			controlee.toggle(checked);
		});
	};

	useEffect(() => {
		const isEveryControleeChecked = controlees.every((controlee) => {
			return controlee.checked;
		});

		if (isEveryControleeChecked) {
			toggleAllCheckbox(true);
		} else {
			toggleAllCheckbox(false);
		}
	}, [controlees, toggleAllCheckbox]);

	return [all, toggleAll];
};
