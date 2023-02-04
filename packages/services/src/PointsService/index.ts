import { HTTPService } from "../index";
import { IPoints } from "./IPoints";

export const getPoints = async (sessionToken: string): Promise<IPoints> => {
	const { data } = await HTTPService.get<IPoints>("points", sessionToken);
	return data;
};
