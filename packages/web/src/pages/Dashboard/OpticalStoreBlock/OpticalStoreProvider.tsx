import { undefinedContext } from "../../../contexts/undefinedContext";
import {
	FC,
	createContext,
	useContext,
	PropsWithChildren,
	useState,
	useMemo,
	useCallback,
	useEffect,
	Dispatch,
	SetStateAction,
} from "react";
import { useService } from "../../../hooks/useService";
import { useConfiguration } from "../../../hooks/useConfiguration";
import { useAuthentication } from "../../../hooks/useAuthentication";
import { useStore } from "../../../hooks/useStore";
import { useGeolocation } from "../../../hooks/useGeolocation";
import { computeDistanceInKmBeetween } from "../../../hooks/useGeometry";
import {
	ConfigService,
	DisplayAllMapPinsInSameColorStatus,
	IStoreWithCoordinates,
	SortAlphabeticallyStoresZonesStatus,
} from "@myacuvue_thailand_web/services";
import { useAsync, useBoolean } from "react-use";
import { useSelectStore } from "../../../hooks/useTracking";
import { useFeatureSwitch } from "../../../hooks/useFeatureSwitch";

export interface IStoreCard {
	number: number;
	storeName: string;
	storeAddress: string;
	telephone: string;
	storeId: string;
	latitude: number;
	longitude: number;
	distanceInKm?: number;
}

interface OpticalStoreContextType {
	isStoresLoading: boolean;
	opticalStores: IStoreWithCoordinates[] | undefined;
	storeCards: IStoreCard[];
	numberOfResults: number;
	mapCenterCoordinates: ConfigService.Coordinates;
	zone: string;
	state: string;
	setState: Dispatch<SetStateAction<string>>;
	setZone: Dispatch<SetStateAction<string>>;
	stateOptions: string[];
	zoneOptions: string[];
	setFindValue: Dispatch<SetStateAction<string>>;
	findValue: string;
	isFindEnabled: boolean;
	onFilterSubmit: () => Promise<void>;
	shouldForceDisplayRegisterView: boolean;
	onChangeStoreClick: () => Promise<void>;
	isChangeStoreDialogOpen: boolean;
	setChangeStoreDialogOpen: Dispatch<SetStateAction<boolean>>;
	setShouldForceDisplayRegisterView: Dispatch<SetStateAction<boolean>>;
	onGoToHome: () => void;
	highlightedStoreId?: string;
	setHighlightedStoreId: (storeId?: string) => void;
	selectedStore?: IStoreCard;
	isRegisterConfirmationDialogOpen: boolean;
	setRegisterConfirmationDialogOpen: (state: boolean) => void;
	handleStoreSelection: (store: IStoreCard) => void;
	displayAllMapPinsInSameColorStatus:
		| DisplayAllMapPinsInSameColorStatus
		| undefined;
	sortAlphabeticallyStoresZonesStatus:
		| SortAlphabeticallyStoresZonesStatus
		| undefined;
}

const OpticalStoreContext =
	createContext<OpticalStoreContextType>(undefinedContext);

const calculateStateAndZones = (storesFromApi: IStoreWithCoordinates[]) => {
	return storesFromApi.reduce((total, item) => {
		total[item.district] = total[item.district] || {};
		total[item.district][item.zone] = total[item.district][item.zone] || [];
		total[item.district][item.zone].push(item);
		return total;
	}, {} as Record<string, Record<string, IStoreWithCoordinates[]>>);
};

const filterNameAndAddress = (
	stores: IStoreWithCoordinates[],
	findValue: string
) => {
	const findValueLowerCase = findValue.toLowerCase();
	return stores.filter((store) => {
		return (
			store.name.toLowerCase().includes(findValueLowerCase) ||
			store.address.toLowerCase().includes(findValueLowerCase)
		);
	});
};

const getStoresSortedByName = (storeCards: IStoreCard[]): IStoreCard[] => {
	const clonedStoreCards = [...storeCards];

	const sortedStores = clonedStoreCards.sort((a, b) => {
		const storeNameA = a.storeName;
		const storeNameB = b.storeName;
		return storeNameA.localeCompare(storeNameB);
	});

	sortedStores.forEach((store, storeIndex) => {
		store.number = storeIndex + 1;
	});
	return sortedStores;
};

const getStoresSortedByDistance = (storeCards: IStoreCard[]): IStoreCard[] => {
	const clonedStoreCards = [...storeCards];

	const sortedStores = clonedStoreCards.sort((a, b) => {
		const distanceA = a.distanceInKm ?? 0;
		const distanceB = b.distanceInKm ?? 0;
		return distanceA - distanceB;
	});

	sortedStores.forEach((store, storeIndex) => {
		store.number = storeIndex + 1;
	});
	return sortedStores;
};

const OpticalStoreProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
	const { WindowService } = useService();
	const { canvasPageUrl, mapDefaultCenter } = useConfiguration();
	const { resetAuth } = useAuthentication();
	const [shouldForceDisplayRegisterView, setShouldForceDisplayRegisterView] =
		useState(false);
	const [state, setState] = useState("");
	const [zone, setZone] = useState("");
	const [findValue, setFindValue] = useState("");
	const [isChangeStoreDialogOpen, setChangeStoreDialogOpen] = useState(false);

	const { getStores, isEligibleToChangeStore } = useStore();
	const { userCoordinates } = useGeolocation();
	const sendSelectStore = useSelectStore();
	const [filteredStores, setFilteredStores] = useState<
		IStoreWithCoordinates[]
	>([]);

	const [displayAllMapPinsInSameColorStatus] = useFeatureSwitch(
		"displayAllMapPinsInSameColor"
	);
	const [sortAlphabeticallyStoresZonesStatus] = useFeatureSwitch(
		"sortAlphabeticallyStoresZones"
	);

	const [preCalculatedData, setPreCalculatedData] = useState<{
		stateAndZones: Record<string, Record<string, IStoreWithCoordinates[]>>;
		storesFromApi?: IStoreWithCoordinates[];
	}>({ stateAndZones: {} });

	const { loading: isStoresLoading } = useAsync(async () => {
		const storesFromApi = await getStores();
		const stateAndZones = calculateStateAndZones(storesFromApi || []);
		setPreCalculatedData({
			stateAndZones,
			storesFromApi,
		});
	}, [getStores]);

	const stateOptions = useMemo(() => {
		return Object.keys(preCalculatedData.stateAndZones);
	}, [preCalculatedData]);

	const zoneOptions = useMemo(() => {
		return Object.keys(preCalculatedData.stateAndZones[state] || {});
	}, [preCalculatedData, state]);

	const isFindEnabled = useMemo(() => {
		return zone === "" && state === "" && findValue === "";
	}, [zone, state, findValue]);

	const filterByStateAndZone = useCallback(() => {
		let updatedStores;
		if (state && zone) {
			updatedStores = preCalculatedData.stateAndZones[state][zone];
		} else if (state) {
			updatedStores = Object.values(
				preCalculatedData.stateAndZones[state]
			).flat();
		} else if (zone) {
			updatedStores = Object.values(
				preCalculatedData.stateAndZones
			).reduce((total, zones) => {
				const storesPerZone = Object.entries(zones)
					.filter(([zoneName]) => zoneName === zone)
					.map(([zoneName, storesPerZone]) => storesPerZone)
					.flat();
				return total.concat(storesPerZone);
			}, [] as IStoreWithCoordinates[]);
		} else {
			updatedStores = preCalculatedData.storesFromApi;
		}
		return updatedStores || [];
	}, [preCalculatedData, zone, state]);

	const onChangeStoreClick = useCallback(async () => {
		const isEligibleToChange = await isEligibleToChangeStore();

		if (isEligibleToChange) {
			setShouldForceDisplayRegisterView(isEligibleToChange);
		} else {
			setChangeStoreDialogOpen(true);
		}
	}, [isEligibleToChangeStore]);

	useEffect(() => {
		if (!isStoresLoading && preCalculatedData.storesFromApi) {
			setFilteredStores(preCalculatedData.storesFromApi);
		}
	}, [isStoresLoading, preCalculatedData]);

	useEffect(() => {
		if (
			!zone &&
			!state &&
			!findValue &&
			!isStoresLoading &&
			preCalculatedData.storesFromApi
		) {
			setFilteredStores(preCalculatedData.storesFromApi);
		}
	}, [zone, state, findValue, isStoresLoading, preCalculatedData]);

	const onFilterSubmit = useCallback(async () => {
		if (preCalculatedData.storesFromApi) {
			const filteredByStateAndZone = filterByStateAndZone();
			const updatedStores = filterNameAndAddress(
				filteredByStateAndZone,
				findValue
			);
			setFilteredStores(updatedStores);
		}
	}, [filterByStateAndZone, findValue, preCalculatedData]);

	const storeCards = useMemo(() => {
		const storesWithDistance = filteredStores.map((store, index) => {
			let distanceInKm: number | undefined;
			if (!userCoordinates?.longitude || !userCoordinates?.latitude) {
				distanceInKm = undefined;
			} else {
				distanceInKm = computeDistanceInKmBeetween(
					{
						longitude: store.longitude,
						latitude: store.latitude,
					},
					{
						longitude: userCoordinates.longitude,
						latitude: userCoordinates.latitude,
					}
				);
			}

			return {
				number: index + 1,
				storeName: store.name,
				storeAddress: store.address,
				telephone: store.phone,
				storeId: store.id,
				latitude: store.latitude,
				longitude: store.longitude,
				distanceInKm,
			};
		});

		if (userCoordinates?.longitude && userCoordinates?.latitude) {
			return getStoresSortedByDistance(storesWithDistance);
		}
		return getStoresSortedByName(storesWithDistance);
	}, [filteredStores, userCoordinates?.longitude, userCoordinates?.latitude]);

	const numberOfResults = useMemo(() => {
		return filteredStores?.length || 0;
	}, [filteredStores?.length]);

	const onGoToHome = async (): Promise<void> => {
		await resetAuth();
		WindowService.redirect(canvasPageUrl);
	};

	const [highlightedStoreId, setHighlightedStoreId] = useState<string>();

	const [selectedStore, setSelectedStore] = useState<IStoreCard>();
	const [
		isRegisterConfirmationDialogOpen,
		setRegisterConfirmationDialogOpen,
	] = useBoolean(false);
	const handleStoreSelection = useCallback(
		(store: IStoreCard) => {
			setRegisterConfirmationDialogOpen(true);
			setSelectedStore(store);
			sendSelectStore({
				store_name: store.storeName,
				store_address: store.storeAddress,
			});
		},
		[sendSelectStore, setRegisterConfirmationDialogOpen]
	);

	return (
		<OpticalStoreContext.Provider
			value={{
				opticalStores: preCalculatedData.storesFromApi,
				storeCards,
				isStoresLoading,
				numberOfResults,
				mapCenterCoordinates: userCoordinates ?? mapDefaultCenter,
				zone,
				state,
				setState,
				setZone,
				stateOptions,
				zoneOptions,
				setFindValue,
				findValue,
				isFindEnabled,
				onFilterSubmit,
				onChangeStoreClick,
				shouldForceDisplayRegisterView,
				isChangeStoreDialogOpen,
				setChangeStoreDialogOpen,
				setShouldForceDisplayRegisterView,
				onGoToHome,
				highlightedStoreId,
				setHighlightedStoreId,
				selectedStore,
				isRegisterConfirmationDialogOpen,
				setRegisterConfirmationDialogOpen,
				handleStoreSelection,
				displayAllMapPinsInSameColorStatus,
				sortAlphabeticallyStoresZonesStatus,
			}}
		>
			{children}
		</OpticalStoreContext.Provider>
	);
};

const useOpticalStoreContext = () => useContext(OpticalStoreContext);

export { useOpticalStoreContext, OpticalStoreProvider };
