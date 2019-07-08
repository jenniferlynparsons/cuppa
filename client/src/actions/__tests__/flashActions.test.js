import { makeMockStore } from "../../test/testUtils";
import { editTeaFlash } from "../flashActions";

const store = makeMockStore({});
const mockStatus = "on";

beforeEach(() => {
	store.clearActions();
});

describe("editTeaFlash", () => {
	test("returns an object", () => {
		expect(editTeaFlash(mockStatus)).toBeInstanceOf(Object);
	});
	test("it returns the EDIT_TEA_FLASH action type and payload", () => {
		store.dispatch(editTeaFlash(mockStatus));
		expect(store.getActions()[0].payload).toEqual(mockStatus);
		expect(store.getActions()[0].type).toEqual("EDIT_TEA_FLASH");
	});
});
